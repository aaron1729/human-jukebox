type Globals = {
    longConsoleLogs: Boolean,
    hardCutoffForPlaylistLength: Number,
    REDIRECT_URI_BASE_DEVELOPMENT: String,
    REDIRECT_URI_BASE_PRODUCTION: String,
}

const globals: Globals = {

    // toggle whether to execute (potentially very) long console logs.
    longConsoleLogs: true,

    // this should be a multiple of the limit number of songs spotify is willing to return in each API call (50 at time of writing), since we're getting songs in batches of that size anyways.
    hardCutoffForPlaylistLength: 500,

    REDIRECT_URI_BASE_DEVELOPMENT: 'http://localhost:8080',
    REDIRECT_URI_BASE_PRODUCTION: 'https://human-jukebox.etale.site',
};

module.exports = globals;