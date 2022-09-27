const express = require('express');
const querystring = require('node:querystring');
const spotifyApi = require('../utils/apiWrapper');
const dotenv = require('dotenv');
dotenv.config();


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
        spotifyApi.authorizationCodeGrant(req.query.code)
        .then(data => {
            res.cookie('access', data.body.access_token).cookie('refresh', data.body.refresh_token);
        });
        res.status(200).send("ended the api/getToken route!");
    }
)

module.exports = router;