const SpotifyWebApi = require('spotify-web-api-node');
const globals = require('../../globals.ts');

let baseForRedirectUri;
// we assume development mode unless this string is precisely equal to "production".
if (process.env.NODE_ENV === "production") {
    baseForRedirectUri = globals.REDIRECT_URI_BASE_PRODUCTION
} else {
    baseForRedirectUri = globals.REDIRECT_URI_BASE_DEVELOPMENT
}

// create a new instance of the SpotifyWebApi class, to be exported.
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // for some reason, using path.join here (from the path module) turns this into e.g. http:/localhost:8080 (deleting one of the slashes!).
    redirectUri: baseForRedirectUri + "/api/getMusicianInfo",
});

console.log(spotifyApi)

module.exports = spotifyApi;