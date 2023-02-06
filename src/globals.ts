type Globals = {
    longConsoleLogs: Boolean,
    hardCutoffForPlaylistLength: Number,
}

const globals: Globals = {

    // toggle whether to execute (potentially very) long console logs.
    longConsoleLogs: false,

    // this should be a multiple of the limit number of songs spotify is willing to return in each API call (50 at time of writing), since we're getting songs in batches of that size anyways.
    hardCutoffForPlaylistLength: 500,

};

module.exports = globals;