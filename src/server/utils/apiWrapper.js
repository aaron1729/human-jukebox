const SpotifyWebApi = require('spotify-web-api-node');

// create a new instance of the SpotifyWebApi class, to be exported
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
});

module.exports = spotifyApi;