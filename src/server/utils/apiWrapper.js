const SpotifyWebApi = require('spotify-web-api-node');

let baseForRedirectUri;
// we assume development mode unless this string is precisely equal to "production".
if (process.env.NODE_ENV === "production") {
    baseForRedirectUri = process.env.REDIRECT_URI_BASE_PRODUCTION
} else {
    baseForRedirectUri = process.env.REDIRECT_URI_BASE_DEVELOPMENT
}

// create a new instance of the SpotifyWebApi class, to be exported.
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: baseForRedirectUri + "/api/getMusicianInfo",
});

module.exports = spotifyApi;