const db = require('../models/models');
const spotifyApi = require('../utils/apiWrapper');
const globals = require('../../globals');

const songController = {};

// this middleware function is fed a musician's spotify id (saved as res.locals.spotifyId), retrieves their array of songs from the database, and saves it as res.locals.songs .
songController.getSongs = (req, res, next) => {
    const spotifyId = res.locals.info.spotify_id;
    if (!spotifyId) {
        return next();
    }
    console.log('inside of songController.getSongs, and spotifyId is:', spotifyId);

    const getMusicianSongsQueryString = `SELECT songs.*, musicians_songs.displayed, musicians_songs.familiarity, musicians_songs.repertoire_index
    FROM songs JOIN musicians_songs ON songs.spotify_id = musicians_songs.song_spotify_id
    WHERE musicians_songs.musician_spotify_id = '${spotifyId.replace(/'/g, "''")}'`; // this was ${spotifyId.replaceAll("'", "''")} -- but this doesn't work on the server for some reason!!!
    
    db.query(getMusicianSongsQueryString).then(data => {
        if (globals.longConsoleLogs) console.log('inside of songController.getSongs, and data.rows is:', data.rows)
        res.locals.songs = data.rows;
        return next();
    }).catch(err => {
        console.log(err)
    })
}


// this middleware function takes a playlist-array (saved as res.locals.playlist by songController.getSpotifyPlaylist), and:
    // upserts its entries into the songs table;
    // upserts its intries into the musicians_songs join table;
    // in the musicians_songs join table, deletes any old songs that aren't in it.
songController.setPlaylistInDb = (req, res, next) => {

    try {

        const spotifyId = req.cookies.spotifyId;

        const upsertPlaylistSongsIntoSongTableQueryString = res.locals.playlist.map(songObj => {
            const existsPreviewUrl = !!songObj.preview_url;
            let previewUrlColumnNameText = "";
            let previewUrlColumnEntryText = "";
            if (existsPreviewUrl) {
                previewUrlColumnNameText = ", preview_url";
                previewUrlColumnEntryText = `, '${songObj.preview_url.replace(/'/g, "''")}'`;
            }
            return `INSERT INTO songs
            (name, artist, album_name, spotify_id, popularity` + previewUrlColumnNameText + `)
            VALUES
            ('${songObj.name.replace(/'/g, "''")}', '${songObj.artist.replace(/'/g, "''")}', '${songObj.album_name.replace(/'/g, "''")}', '${songObj.spotify_id.replace(/'/g, "''")}', ${songObj.popularity}` + previewUrlColumnEntryText + `)
            ON CONFLICT DO NOTHING;`}).join("\n");
            
        if (globals.longConsoleLogs) console.log('inside of songController.setPlaylistInDb, and upsertPlaylistSongsIntoSongTableQueryString is:\n', upsertPlaylistSongsIntoSongTableQueryString);

        db.query(upsertPlaylistSongsIntoSongTableQueryString).then(data => {

            if (globals.longConsoleLogs) console.log('just executed upsertPlaylistSongsIntoSongTableQueryString, and the returned data is:', data);

            const upsertPlaylistSongsIntoMusiciansSongsJoinTableQueryString = res.locals.playlist.map((songObj, index) => `INSERT INTO musicians_songs
                (musician_spotify_id, song_spotify_id, repertoire_index)
            VALUES
                ('${spotifyId.replace(/'/g, "''")}', '${songObj.spotify_id.replace(/'/g, "''")}', ${index})
            ON CONFLICT (musician_spotify_id, song_spotify_id) DO UPDATE SET
                repertoire_index = ${index};`).join("\n");
            
            db.query(upsertPlaylistSongsIntoMusiciansSongsJoinTableQueryString).then(data => {

                if (globals.longConsoleLogs) console.log('just executed upsertPlaylistSongsIntoMusiciansSongsJoinTableQueryString, and the returned data is:', data);

                const getAllSongsForThisMusicianFromMusiciansSongsJoinTableQueryString = `SELECT * FROM musicians_songs WHERE musician_spotify_id = '${spotifyId.replace(/'/g, "''")}';`;

                db.query(getAllSongsForThisMusicianFromMusiciansSongsJoinTableQueryString).then(data => {

                    const rowsInDb = data.rows;

                    if (globals.longConsoleLogs) console.log('just executed getAllSongsForThisMusicianFromMusiciansSongsJoinTableQueryString, and rowsInDb (the returned data) is:', rowsInDb);

                    const songSpotifyIdsToDrop = [];
                    const songSpotifyIdsToKeep = res.locals.playlist.map(songObj => songObj.spotify_id);
                    rowsInDb.forEach(row => {
                        if (!songSpotifyIdsToKeep.includes(row.song_spotify_id)) {
                            songSpotifyIdsToDrop.push(row.song_spotify_id);
                        };
                    })

                    if (!songSpotifyIdsToDrop.length) {
                        return next();
                    }

                    const dropSongsRemovedFromPlaylistFromMusiciansSongsJoinTableQueryString = songSpotifyIdsToDrop.map(songSpotifyId => `DELETE FROM musicians_songs
                    WHERE (musician_spotify_id = '${spotifyId.replace(/'/g, "''")}' AND song_spotify_id = '${songSpotifyId.replace(/'/g, "''")}');`).join("\n");

                    db.query(dropSongsRemovedFromPlaylistFromMusiciansSongsJoinTableQueryString).then(data => {
                        if (globals.longConsoleLogs) console.log('just executed dropSongsRemovedFromPlaylistFromMusiciansSongsJoinTableQueryString, and the returned data is:', data);

                        return next();

                    })

                })
            })
        })
    }

    catch(err) {
        return next({
            log: 'error upserting playlist songs to songs table and/or musicians_songs table',
            status: err.statusCode || 418,
            message: {error: 'failed to upsert playlist songs to songs table and/or musicians_songs table'}
        });
    }

}


// this middleware function gets a playlist id (to which a musician has access), retrieves it from the spotify API, and saves as res.locals.playlist an array containing the pieces of data that are relevant for our db.
songController.getSpotifyPlaylist = async (req, res, next) => {
    console.log('inside of songController.getSpotifyPlaylist, and cookies are', req.cookies);
    const {playlistId} = req.params;
    console.log('and playlistId is', playlistId);

    // the present middleware function should always come after authController.getNewAccessToken, in case the access token in the cookie has expired. (that function gets a new access token and saves it as res.locals.access .)
    const access = res.locals.access;
    // by contrast, this should be fine regardless (and isn't getting reset anyways).
    const refresh = req.cookies.refresh;

    const transformSpotifyTrackObj = trackObj => {
        const songObj = trackObj.track;
        const spotify_id = songObj.id;
        const name = songObj.name;
        const artist = songObj.artists.map(artistObj => artistObj.name).join(", ");
        const album_name = songObj.album.name;
        const popularity = songObj.popularity;
        const preview_url = songObj.preview_url;
        return {
            spotify_id,
            name,
            artist,
            album_name,
            popularity,
            preview_url,
        }
    }

    try {
        spotifyApi.setAccessToken(access);
        spotifyApi.setRefreshToken(refresh);
        console.log('inside of songController.getSpotifyPlaylist, and just set access and refresh tokens on spotifyApi object');
        
        const data = await spotifyApi.getPlaylist(playlistId);

        if (globals.longConsoleLogs) console.log('the await tracks data is:', data);

        const limit = data.body.tracks.limit;
        const total = data.body.tracks.total;

        console.log('total and limit are respectively', total, 'and', limit);
        
        res.locals.playlist = data.body.tracks.items.map(trackObj => transformSpotifyTrackObj(trackObj));

        if (total > limit) {

            // put a hard cap on how many songs are allowed to be stored in the database by any one musician. (this can be modified by whitelisting users who ask for a limit increase.)
            const hardTotal = Math.min(total, globals.hardCutoffForPlaylistLength);
            console.log('globals.hardCutoffForPlaylistLength is:', globals.hardCutoffForPlaylistLength);
            console.log('total>limit, and hardTotal is:', hardTotal);
            if (total > hardTotal) {
                res.locals.hardCutoffReached = true;
                console.log('hard cutoff for playlist length reached; globals.hardCutoffForPlaylistLength is', globals.hardCutoffForPlaylistLength, 'and length is', total);
            }
            for (let i = 1; i < Math.ceil(hardTotal/limit); i++) {
                const untransformedTracksToAdd = await spotifyApi.getPlaylistTracks(playlistId, {offset: limit * i});
                untransformedTracksToAdd.body.items.forEach(trackObj => {res.locals.playlist.push(transformSpotifyTrackObj(trackObj))});
                console.log('after adding [up to limit many] more tracks, now the length of res.locals.playlist is:', res.locals.playlist.length);
            }
        }

        if (globals.longConsoleLogs) console.log('after assembling the whole playlist in songController.getSpotifyPlaylist, res.locals.playlist is:', res.locals.playlist);

        return next();

    } catch(err) {
        return next({
            log: 'error getting spotify playlist',
            status: err.statusCode || 418,
            message: {error: 'failed to get spotify playlist.'}
        })
    }
}


// this middleware function gets the musician's list of spotify playlists (or at least the first N or so of them) from the spotify API.
songController.getAllSpotifyPlaylists = async (req, res, next) => {
    console.log('inside of songController.getAllSpotifyPlaylists, and cookies are', req.cookies);
    // as of 12/20/2022, this middleware function is only called after previous authentication stuff, so these variables ought to have been stored on res.locals. in particular, the access token will have changed! so it's *not* the same one that came on req.cookies .
    const spotifyId = res.locals.spotifyId;
    const access = res.locals.access;
    const refresh = res.locals.refresh;

    const transformSpotifyPlaylistObj = playlistObj => ({
        playlistName: playlistObj.name,
        playlistSpotifyId: playlistObj.id,
        playlistSpotifyUrl: playlistObj.external_urls.spotify,
    })

    try {
        spotifyApi.setAccessToken(access);
        spotifyApi.setRefreshToken(refresh);
        console.log('inside of songController.getAllSpotifyPlaylists, and just set access and refresh tokens on spotifyApi object');

        const data = await spotifyApi.getUserPlaylists(spotifyId, {limit: 50});

        if (globals.longConsoleLogs) console.log('the await playlists data is:', data);

        const limit = data.body.limit;
        const total = data.body.total;

        res.locals.playlistArr = data.body.items.map(playlistObj => transformSpotifyPlaylistObj(playlistObj));

        if (total > limit) {
            for (let i = 1; i < Math.ceil(total/limit); i++) {
                const untransformedPlaylistsToAdd = await spotifyApi.getUserPlaylists(spotifyId, {limit: 50, offset: limit * i});
                untransformedPlaylistsToAdd.body.items.forEach(playlistObj => {
                    res.locals.playlistArr.push(transformSpotifyPlaylistObj(playlistObj));})
                console.log('after adding [up to limit many] more playlists, now the length of res.locals.playlistArr is:', res.locals.playlistArr.length);
            }
        }

        if (globals.longConsoleLogs) console.log('after assembling the whole list of playlists in songController.getAllSpotifyPlaylists, res.locals.playlistArr is:', res.locals.playlistArr);

        return next();

        }
    catch(err) {
        return next({
            log: 'error getting spotify playlists',
            status: err.statusCode || 418,
            message: {error: 'failed to get spotify playlists.'}
        })
    }
}


module.exports = songController;