const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv');

// pull the info from the .env file in the root directory and add it to the process.env object
dotenv.config();

// create a new instance of the SpotifyWebApi class, to be exported
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

module.exports = spotifyApi;