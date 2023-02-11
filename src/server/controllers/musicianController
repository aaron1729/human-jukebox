const db = require('../models/models');

const musicianController = {};

musicianController.getHandleFromDb = (req, res, next) => {
    try {
        const {spotifyId} = req.params;
        const getHandleQueryString = `SELECT handle FROM musicians WHERE spotify_id = '${spotifyId}'`;
        db.query(getHandleQueryString).then(data => {
            console.log('inside of musicianController.getHandleFromDb, and the data.rows are:', data.rows);
            if (!data.rows[0]) {
                res.locals.success = false;
                return next();
            } else {
                res.locals.success = true;
                res.locals.handle = data.rows[0].handle;
                return next();
            }
        })
    } catch(err) {
        return next({
            log: 'error getting handle from db',
            status: err.statusCode || 418,
            message: {error: 'failed to get handle from db'}
        })
    }
}


// this middleware function is fed a musician's handle (saved as req.params.handle), retrieves their info from the musicians table in the database, and saves it as res.locals.musicianInfo .
musicianController.getMusicianInfoFromDb = (req, res, next) => {
    try {
        const {handle} = req.params;
        const getMusicianInfoQueryString = `SELECT * FROM musicians WHERE handle = '${handle}'`;
        db.query(getMusicianInfoQueryString).then(data => {
            console.log('inside of musicianController.getMusicianInfoFromDb, and data.rows.length (which should be either 0 or 1) is:', data.rows.length);
            if (!data.rows[0]) {
                return next()
            }
            res.locals.info = data.rows[0]
            console.log('inside of musicianController.getMusicianInfoFromDb, and the info is:', res.locals.info)
            return next();
        })
    } catch(err) {
        return next({
            log: 'error getting public musician info from database',
            status: err.statusCode || 418,
            message: {error: 'failed to get public musician info from database'}
        })
    }
}


// this middleware function is given all of a musician's info (saved as res.locals.info) and removes the private stuff.
musicianController.removePrivateInfo = (req, res, next) => {
    if (!res.locals.info) {
        return res.status(200).json({error: 'sorry, handle not found in database'})
    }
    delete res.locals.info.access;
    delete res.locals.info.spotify_id;
    delete res.locals.info.spotify_playlist_id;
    delete res.locals.info.spotify_playlist_name;
    delete res.locals.info.spotify_playlist_url;
    delete res.locals.info.email;
    if (!res.locals.info.instagram_show) {
        delete res.locals.info.instagram;
    }
    delete res.locals.info.instagram_show;
    if (!res.locals.info.venmo_show) {
        delete res.locals.info.venmo;
    }
    delete res.locals.info.venmo_show;
    
    console.log('after running musicianController.removePrivateInfo, the info is:', res.locals.info);
    return next();
}


// this middleware function is given an object of updates to the musician info (living on req.body) and tries to make them in the database.
musicianController.updateMusicianInfoInDb = (req, res, next) => {

    try {

        const spotifyId = req.params.spotify_id;
        const update = req.body;

        console.log('inside of musicianController.updateMusicianInfoInDb, and the update object is:', update);
        console.log('and the spotifyId is:', spotifyId);

        // handle handle updates separately, as they require uniqueness. and in this case, _only_ update the handle.
        if (update.handle) {
            console.log('inside of musicianController.updateMusicianInfoInDb, and specifically updating the _handle_ in db.');
            const updateHandleInDbQueryString = `UPDATE public.musicians SET handle = '${update.handle.toLowerCase()}' WHERE spotify_id = '${spotifyId.replace(/'/g, "''")}' RETURNING (handle, spotify_id);`;
            db.query(updateHandleInDbQueryString).then(data => {
                console.log('after executing updateHandleInDbQueryString, the returned data is:', data);
                if (data.rowCount === 1) {
                    res.locals.success = true;
                } else {
                    res.locals.success = false;
                }
                return next();
            }).catch(err => {
                console.log('inside of the promise-catch (not the try/catch) and the error object is:', err);

                res.locals.success = false;

                return next();

            }
            )
        } else {

            // we only reach this point when we're updating columns that aren't required to be unique (i.e. not the handle).

            let kvpStringArray = [];
            for (const key in update) {
                let value = update[key];            
                console.log('the key is:', key);
                console.log('the value is:', value);
                // if the value is a string, prepare it for the SQL query: escape its single-quote-marks (i.e. double them) and then wrap the whole thing in single-quote-marks. (but if it's a boolean, we _don't_ want to have quote marks around it.)
                if (typeof value === "string") {
                    value = value.replace(/'/g, "''");
                    value = `'${value}'`
                    console.log('and now the updated value is:', value);
                }
                kvpStringArray.push(key + " = " + value);
            }

            const kvpsString = kvpStringArray.join(", ");

            console.log('kvpString is:', kvpsString)

            if (!kvpsString) {
                return next();
            }

            const updateKVPInDbQueryString = `UPDATE public.musicians SET ${kvpsString} WHERE spotify_id = '${spotifyId.replace(/'/g, "''")}'`;
            db.query(updateKVPInDbQueryString).then(data => {
                console.log('after executing updateKVPInDbQueryString, the returned data is:', data);
                if (data.rowCount === 1) {
                    res.locals.success = true;
                } else {
                    res.locals.success = false;
                }
                return next();
            })

        }

    } catch(err) {
        return next({
            log: 'error updating musician info in db',
            status: err.statusCode || 418,
            message: {error: 'failed to update musician info in db'}
        })
    }
}


// this middleware function deletes a musician from the database: first all of their rows in the musicians_songs table, and then their row from the musicians table.
musicianController.deleteMusicianFromDb = (req, res, next) => {
    console.log('inside of musicianController.deleteMusicianFromDb');
    try {
        const spotifyId = req.cookies.spotifyId;
        const deleteSongsFromMusiciansSongsJoinTableQueryString = `DELETE FROM musicians_songs
        WHERE musician_spotify_id = '${spotifyId}'`;
        db.query(deleteSongsFromMusiciansSongsJoinTableQueryString).then(data => {
            console.log('just executed deleteSongsFromMusiciansSongsJoinTableQueryString, and the returned data is:', data);
            const deleteMusicianFromMusiciansTableQueryString = `DELETE FROM musicians
            WHERE spotify_id = '${spotifyId}'`;
            db.query(deleteMusicianFromMusiciansTableQueryString).then(data => {
                console.log('just executed deleteMusicianFromMusiciansTableQueryString, and the returned data is:', data);
                return next();
            })
        })
    } catch(err) {
        return next({
            log: 'error deleting musician from db',
            status: err.statusCode || 418,
            message: {error: 'failed to delete musician from db'}
        })
    }
}


module.exports = musicianController;