const express = require('express');
const querystring = require('node:querystring');

const path = require('path');

const query = require('../models/models');

const authController = require('../controllers/authController');
const songsController = require('../controllers/songsController');


const router = express.Router();


// this endpoint checks if the user has valid cookies, i.e. "spotifyId" and "access" cookies that match ones in the database
router.get(
    '/checkCookies',
    authController.checkCookies,
    (req, res) => {
        return res.status(200).json({cookieMatch: res.locals.cookieMatch, handle: res.locals.handle});
    }
)






////////////////////////////////////////////////////////////////////////////



// this endpoint redirects the musician to the Spotify auth page.
// after the musician finishes there, they are redirected to localhost:8080/api/getMusicianInfo (handled just below).
    // if their Spotify login was successful, that redirect comes with a 'code' (a long string) stored as req.query.code .
    // if the Spotify login was unsuccessful, that redirect comes with an error message.
router.get(
    '/auth',
    (req, res) => {
        res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
            client_id: process.env.CLIENT_ID,
            response_type: 'code',
            redirect_uri: process.env.REDIRECT_URI,
            scope: 'playlist-read-private'
        }))
    }
)


// THIS WILL REPLACE THE ENDPOINT BELOW -- REMEMBER TO UPDATE THE REDIRECT URL:
    // ABOVE,
    // IN THE SPOTIFY DEV DASHBOARD, AND
    // IN THE ENV FILE.
// this endpoint receives redirects from the Spotify auth page, which come equipped with a 'code' (a long string) stored as req.query.code . given that, this route handler says:
    // using the code, go back to the Spotify API to get access and refresh tokens. save them as cookies and also on res.locals .
    // using the access token, go back to the Spotify API again and get the musician's spotify id.
    // in the "musicians" database table, check if the spotify id exists:
        // if so, update its access token.
        // if not, add the musician and put in some default values for other columns.
    // send the auth.html page:
        // its body just says "redirecting..."
        // it loads the auth.js file, which triggers the function window.login back in the LandingPageContainer
router.get(
    '/codeToLogin',
    authController.getTokens,
    authController.getSpotifyId,



    (req, res) => {
        return res.sendFile(path.join(__dirname, '../../client/auth.html'));
    }
)

// this serves the javascript file attached to auth.html
router.get(
    '*/auth.js',
    (req, res) => {
        return res.sendFile(path.join(__dirname, '../../client/auth.js'));
    }
)


// FINISH HERE!!! /////





////////////////////////////////////////////////////////////////////////////


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
        console.log('in the getMusicianInfo route handler, the JSON-stringified musicianInfo is: ' + JSON.stringify(res.locals.musicianInfo));
        return res.sendFile(path.join(__dirname, '../../client/auth.html'));
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


// this endpoint receives a proposed musician handle and access code, and checks that they agree in the database
router.get(
    '/dbAuth/:handle/:access',
    authController.checkHandleAccessInDb,
    (req, res) => {
        console.log('inside of the dbAuth route handler');
        return res.status(200).json({success: 'success: handle and access token are a match!'});
    }
)


// this endpoint receives a request based on the musician clicking the "logout" button on their private page
router.get(
    '/logout',
    authController.deleteCookies,
    (req, res) => {
        return res.status(200).send('cookies deleted');
    }

)



module.exports = router;