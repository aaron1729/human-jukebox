const express = require('express');
const querystring = require('node:querystring');

const query = require('../models/models');

const spotifyApi = require('../utils/apiWrapper');
const authController = require('../controllers/authController');
const songsController = require('../controllers/songsController');


const router = express.Router();


// redirect the musician to the Spotify auth page.
// after the musician finishes there, they are redirected to localhost:8080/api/getMusicianInfo (handled just below).
    // if their Spotify login was successful, that redirect comes with a 'code' (a long string) stored as req.query.code .
    // if the Spotify login was unsuccessful, that redirect comes with an error message.
router.get(
    '/auth',
    (req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
            client_id: process.env.CLIENT_ID,
            response_type: 'code',
            redirect_uri: process.env.REDIRECT_URI
        }))
    }
)




// THE ROUTE BELOW SHOULD BE RENAMED! (this will need to get changed in a few places, and also whitelisted in Spotify dev dashboard too.) no longer 'getMusicianInfo', but more like 'go to musician private page'. easiest would be for this *not* to depend on whether the musician has ever logged in before, but just have some default values.


// this endpoint receives redirects from the Spotify auth page, which come equipped with a 'code' (a long string) stored as req.query.code . given that, this route handler says:
    // using the code, go back to the Spotify API to get access and refresh tokens. save them as cookies and also on res.locals .
    // using the access token, go back to the Spotify API again and get the musician's spotify id.
    // then, go to the SQL database and get the musician info corresponding to that spotify id (if it exists).
    // for now, it just responds with a string containing the musician info. see just above.
router.get(
    '/getMusicianInfo',
    authController.getTokens,
    authController.getSpotifyId,
    authController.getMusicianInfoFromDb,
    (req, res) => {
        const infoString = 'the musicianInfo is: ' + JSON.stringify(res.locals.musicianInfo);
        const myString = infoString || 'musician not found in database';
        return res.status(200).send(myString);
    }
)

// this endpoint receives a musician's handle, and then:
    // looks up the handle in the SQL database, retrieves the corresponding _id, and stores it as res.locals.id as well as as the unique entry .
    // stores res.locals.id as _id , and then uses it to query the database for the song info associated to that musician id .
// end the /getToken req/res cycle with a RES.REDIRECT to another route, say api/getSpotifyId
router.get(
    '/musician/:name',
    songsController.getMusicianId,
    songsController.getSongs,
    (req, res) => {
    return res.status(200).json(res.locals.songs);
})

module.exports = router;