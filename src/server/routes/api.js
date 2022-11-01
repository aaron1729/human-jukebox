const express = require('express');
const querystring = require('node:querystring');

const query = require('../models/models');

const spotifyApi = require('../utils/apiWrapper');
const authController = require('../controllers/authController');
const songsController = require('../controllers/songsController');




const router = express.Router();


// test: handle GET request in new tab
router.get('/abc', (req, res) => {
    res.status(200).send('hello -- testing api/abc route');
});



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

// this endpoint receives redirects from the Spotify auth page, which come equipped with a 'code' (a long string) stored as req.query.code . given that, this route handler says:
    // using the code, go back to the Spotify API to get access and refresh tokens. save them as cookies and also on res.locals .
    // using the access token, go back to the Spotify API again and get the musician's spotify id.
    // then, go to the SQL database and get the musician info corresponding to that spotify id (if it exists).
router.get(
    '/getMusicianInfo',
    authController.getTokens,
    authController.getSpotifyId,
    authController.getMusicianInfoFromDb,
    (req, res) => {
        const myString = JSON.stringify(res.locals.musicianInfo) || 'musician not found in database';
        return res.status(200).send(myString);
    }
)


// this endpoint receives a musician's handle, and then:
    // looks up the handle in the SQL database, retrieves the corresponding _id, and stores it as res.locals.id .
    // stores res.locals.id as _id , and then 
// end the /getToken req/res cycle with a RES.REDIRECT to another route, say api/getSpotifyId
router.get(
    '/musician/:name',
    songsController.getMusicianId,
    songsController.getSongs,
    (req, res) => {
    return res.status(200).json(res.locals.songs);
})



module.exports = router;