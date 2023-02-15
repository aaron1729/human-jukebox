const spotifyApi = require('../utils/apiWrapper');
const db = require('../models/models');


const authController = {};

// save the cookies spotifyId, access, and refresh on res.locals, possibly for later use (e.g. in authController.spotifyIdAndAccessToDb).
// store a boolean as res.locals.cookieMatch based on whether the cookies "spotifyId" and "access" exist and are a match in our db
authController.checkCookies = (req, res, next) => {
    try {
        console.log('inside of authController.checkCookies')
        res.locals.spotifyId = req.cookies.spotifyId;
        res.locals.access = req.cookies.access;
        res.locals.refresh = req.cookies.refresh;
        
        const spotifyId = res.locals.spotifyId;
        const access = res.locals.access;

        if (!spotifyId || !access) {
            console.log('missing a spotifyId cookie or access cookie');
            res.locals.cookieMatch = false;
            return next();
        }
        const getHandleAndAccessFromDbQueryString = `SELECT handle, access FROM public.musicians WHERE spotify_id = '${spotifyId.replace(/'/g, "''")}'`;
        db.query(getHandleAndAccessFromDbQueryString).then(data => {
            console.log('after db query inside of authController.checkCookies, the data is:', data.rows)
            if (!data.rows.length) {
                console.log('no corresponding musician found in db');
                res.locals.cookieMatch = false;
                return next();
            }
            const accessFromDb = data.rows[0].access;
            const handleFromDb = data.rows[0].handle;
            if (accessFromDb && access === accessFromDb) {
                res.locals.cookieMatch = true;
                res.locals.handle = handleFromDb;
            } else {
                res.locals.cookieMatch = false;
            }
            return next();
        });
    } catch(err) {
        return next({
            log: 'error checking cookies',
            status: err.statusCode || 418,
            message: {error: 'failed to check cookies'}
        });
    }
}


// when this is used, it follows the above middleware. if cookies don't match, it ends the request/response cycle.
authController.endCycleIfCookiesUnmatched = (req, res, next) => {
    console.log('inside of authController.endCycleIfCookiesUnmatched');
    if (!res.locals.cookieMatch) {
        return res.status(200).json({error: 'sorry, cookies did not match'})
    } else {
        console.log('...and cookies matched');
        return next();
    }
}


// get two tokens (long strings)
    // set them as cookies called 'access' and 'refresh'
    // also save them on res.locals
    // also invoke the spotifyApi methods setAccessToken and setRefreshToken with these arguments [added 12/13/2022... is this helpful / needed / doesn't break anything?]
// when this function is triggered, req.query.code has been set to equal a massive string (sent by the spotify redirect).
authController.getTokens = (req, res, next) => {
    console.log('inside of authController.getTokens middleware, and req.query.code is:', req.query.code);
    try {
        spotifyApi.authorizationCodeGrant(req.query.code)
            .then(data => {
                console.log('inside of the .then of authController.getTokens');
                // can additionally set an expiration on the cookie (say N minutes) e.g. using res.cookie('cookieName', cookieValue, {maxAge: 1000 * 60 * N})
                res.cookie('access', data.body.access_token).cookie('refresh', data.body.refresh_token);
                res.locals.access = data.body.access_token;
                res.locals.refresh = data.body.refresh_token;
                spotifyApi.setAccessToken(res.locals.access);
                spotifyApi.setRefreshToken(res.locals.refresh);
                return next();
            })
    } catch(err) {
        return next({
            log: 'error getting access and refresh tokens',
            status: err.statusCode || 418,
            message: {error: 'failed to get access and refresh tokens'}
        });
    }
}


// given a refresh token, get a new access token and save it:
    // on res.locals
    // on the response object, to be set as a new cookie on the browser
    // in the Spotify API wrapper
authController.getNewAccessToken = (req, res, next) => {
    console.log('inside of authController.getNewAccessToken middleware, and cookies are', req.cookies);
    const refresh = req.cookies.refresh;
    try {
        spotifyApi.setRefreshToken(refresh);
        spotifyApi.refreshAccessToken()
        .then(data => {
            console.log('the returned data from spotifyApi.refreshAccessToken is', data.body.access_token);
            const access = data.body.access_token
            res.locals.access = access;
            res.cookie('access', access);
            spotifyApi.setAccessToken(access);
            return next();
        })
    } catch(err) {
        return next({
            log: 'error refreshing access token',
            status: err.statusCode || 418,
            message: {error: 'failed to refresh access token.'}
        })
    }
}


// using a musician's spotify access token (saved as res.locals.access), get their spotify id and set it as res.locals.spotifyId .
authController.getSpotifyId = (req, res, next) => {
    console.log('inside of authController.getSpotifyId');
    try {
        spotifyApi.setAccessToken(res.locals.access);
        spotifyApi.getMe().then(userData => {
                res.locals.spotifyId = userData.body.id;
                res.cookie('spotifyId', res.locals.spotifyId);
                return next();
            }
        ).catch(err => {
            console.log('inside of .catch of authController.getSpotifyId, and error object is:', err);
            return res.status(200).send('Human Jukebox is still in development. If you are a musician and would like early access, please let us know! To do this, send an email human.jukebox.app@gmail.com that includes your full name as well as the email address associated with your Spotify account. (Your Spotify account is only used to manage your Human Jukebox account, and will never be available on your Human Jukebox musician profile page.)');
        }
        )
    } catch(err) {
        return next({
            log: 'error getting spotify id',
            status: err.statusCode || 418,
            message: {error: 'failed to get spotify id. (perhaps you\'re in dev mode and the user isn\'t whitelisted in your spotify developer dashboard?)'}
        });
    }
}










// TO DO: change the temp-handle stuff, once i've sorted out the first-time-login flow.

// upsert the spotify id and access token (saved as res.locals.spotifyId and res.locals.access) to the database. more specifically, check if the spotify id is in the database, and:
    // if so, update its access token there;
    // if not, create a new row in the database with some default values. in particular, the new handle is a 
authController.spotifyIdAndAccessToDb = (req, res, next) => {
    try {
        const spotifyId = res.locals.spotifyId;
        const access = res.locals.access;
        console.log('inside of authController.spotifyIdAndAccessToDb');

        const upsertMusicianInfoQueryString = `INSERT INTO musicians
            (spotify_id, access)
        VALUES
            ('${spotifyId.replace(/'/g, "''")}', '${access.replace(/'/g, "''")}')
        ON CONFLICT (spotify_id) DO UPDATE SET
            access = '${access.replace(/'/g, "''")}';`

        db.query(upsertMusicianInfoQueryString).then(data => {
            console.log('just executed upsertMusicianInfoQueryString, and the returned data is:', data);

            return next();
        })

    } catch(err) {
        return next({
            log: 'error adding/syncing spotify id and access token in db',
            status: err.statusCode || 418,
            message: {error: 'failed to sync spotify id and access token with db'}
        });
    }
}


// delete the cookies containing a musician's access and refresh tokens
authController.deleteCookies = (req, res, next) => {
    res.clearCookie('access').clearCookie('refresh').clearCookie('spotifyId');
    return next();
}


module.exports = authController;