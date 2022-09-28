const express = require('express');
const querystring = require('node:querystring');

const query = require('../models/models');

const spotifyApi = require('../utils/apiWrapper');
const authController = require('../controllers/authController');
const { nextTick } = require('node:process');




const router = express.Router();


// redirect to the Spotify authorization form for user authentication (i.e. sign-in)
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

router.get(
    '/getToken',
    (req, res) => {
        // console.log('the request is: ', req);
        spotifyApi.authorizationCodeGrant(req.query.code)
        .then(data => {
            res.cookie('access', data.body.access_token).cookie('refresh', data.body.refresh_token);
            res.status(200).send("ended the api/getToken route!");
        })
    }
)

router.get(
    '/getSpotifyId',
    authController.getSpotifyId,
    (req, res) => {
        res.cookie('spotifyId', res.locals.spotifyId);
        return res.status(200).send("ended the api/getSpotifyId route! beware that the musician's spotifyId is currently saved as a cookie, and probably shouldn't be. (rather, just chain some middlewares and save it on req.params .)");
    }
)

router.get(
    '/getMusicianInfo',
    authController.getMusicianInfo,
    (req, res) => {
        console.log('at the end of the api/getMusicianInfo, res.locals.musicianInfo is: ', res.locals.musicianInfo);
        return res.status(200).send("finished api/getMusicianInfo route!");
    }
)

module.exports = router;