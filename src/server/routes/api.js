const express = require('express');

const path = require('path');

const spotifyApi = require('../utils/apiWrapper');

const authController = require('../controllers/authController');
const musicianController = require('../controllers/musicianController');
const songController = require('../controllers/songController');



const router = express.Router();


// this endpoint checks if the user has valid cookies, i.e. "spotifyId" and "access" cookies that match ones in the database
router.get(
    '/checkCookies',
    (req, res, next) => {
        console.log('at the beginning of the /api/checkCookies route handler');
        return next();
    },
    authController.checkCookies,
    (req, res) => {
        console.log('at the end of the /api/checkCookies route handler');
        return res.status(200).json({cookieMatch: res.locals.cookieMatch, handle: res.locals.handle});
    }
)


// this endpoint redirects the musician to the Spotify auth page.
// after the musician finishes there, they are redirected to /api/getMusicianInfo (handled just below).
    // if their Spotify login was successful, that redirect comes with a 'code' (a long string) stored as req.query.code .
    // if the Spotify login was unsuccessful, that redirect comes with an error message.
router.get(
    '/auth',
    (req, res, next) => {
        console.log('at the beginning of the /api/auth route handler');
        return next();
    },
    (req, res) => {
        const scopes = [
            'playlist-read-private',
            'playlist-read-collaborative',
        ];
        const authUrl = spotifyApi.createAuthorizeURL(scopes);
        console.log('at the end of the /api/auth route handler, and authUrl is:', authUrl);
        return res.redirect(authUrl);
    }
)


// this endpoint receives redirects from the Spotify auth page, which come equipped with a 'code' (a long string) stored as req.query.code . given that, this route handler says:
    // using the code, go back to the Spotify API to get access and refresh tokens. save them as cookies and also on res.locals .
    // using the access token, go back to the Spotify API again and get the musician's spotify id.
    // in the "musicians" database table, check if the spotify id exists:
        // if so, update its access token.
        // if not, add the musician and put in some default values for other columns.
    // send the auth.html page:
        // its body just says "redirecting..."
        // it loads the auth.js file, which triggers the function window.login2 back in the LandingPageContainer
router.get(
    '/getMusicianInfo',
    (req, res, next) => {
        console.log('at the beginning of the /api/getMusicianInfo route handler');
        return next();
    },
    (req, res, next) => {
        if (!req.query.code) {
            return res.status(200).json({message: 'Human Jukebox is currently in development mode, which means that all musicians must be individually whitelisted in order to use this app. Please write to human.jukebox.app@gmail.com if you would like to be whitelisted! In your message, include your full name and the email address attached to your Spotify account.'});
        } else {
            return next();
        }
    },
    authController.getTokens,
    authController.getSpotifyId,
    authController.spotifyIdAndAccessToDb,
    (req, res) => {
        console.log('at the end of the /api/getMusicianInfo route handler, and res.locals.newMusician is:', res.locals.newMusician);
        res.sendFile(path.join(__dirname, '../../client/auth.html'));
        // res.redirect(path.join(__dirname, '../../client/auth.html?id=123'));
        return;
    }
)


// this serves the javascript file attached to auth.html
router.get(
    '*/auth.js',
    (req, res, next) => {
        console.log('at the beginning of the /api/*/auth.js route handler');
        return next();
    },
    (req, res) => {
        return res.sendFile(path.join(__dirname, '../../client/auth.js'));
    }
)


// this endpoint receives a possible spotifyId and, if it corresponds to a musician in the db, returns the corresponding handle.
router.get(
    '/getHandle/:spotifyId',
    (req, res, next) => {
        console.log('at the beginning of the /api/getHandle route handler');
        return next();
    },
    musicianController.getHandleFromDb,
    (req, res) => {
        return res.status(200).json({success: res.locals.success, handle: res.locals.handle});
    }
)


// this endpoint receives a musician's handle, retrieves their public info from the database, and sends it back.
router.get(
    '/info_public/:handle',
    (req, res, next) => {
        console.log('at the beginning of the /api/info_public route handler');
        return next();
    },
    musicianController.getMusicianInfoFromDb,
    musicianController.removePrivateInfo,
    (req, res) => {
        return res.status(200).json(res.locals.info);
    }
)


// this endpoint receives a musician's handle, checks their cookies (so a random person can't just send a request to this endpoint), and if they're valid gets all info.
router.get(
    '/info_private/:handle',
    (req, res, next) => {
        console.log('at the beginning of the /api/info_private route handler');
        return next();
    },
    authController.checkCookies,
    authController.endCycleIfCookiesUnmatched,
    musicianController.getMusicianInfoFromDb,
    (req, res) => {
        console.log('at the end of the /api/info_private route handler');
        return res.status(200).json(res.locals.info);
    }
)


// this endpoint receives a musician's handle, and then:
    // looks up the musician info in the SQL database and saves it as res.locals.info ;
    // using the spotify id, gets the musician's array of songs and stores it as res.locals.songs ;
    // sends that back.
router.get(
    '/songs/:handle',
    (req, res, next) => {
        console.log('at the beginning of the /api/songs route handler');
        return next();
    },
    musicianController.getMusicianInfoFromDb,
    songController.getSongs,
    (req, res) => {
    console.log('at the end of the /api/songs route handler');
    return res.status(200).json(res.locals.songs);
})


// this endpoint is accessed by a musician from their private page, and fetches all (or really the first N) playlists attached to their spotify account.
router.get(
    '/getAllPlaylists',
    (req, res, next) => {
        console.log('at the beginning of the /api/getAllPlaylists route handler');
        return next();
    },
    authController.checkCookies,
    authController.endCycleIfCookiesUnmatched,
    authController.getNewAccessToken,
    authController.spotifyIdAndAccessToDb,
    songController.getAllSpotifyPlaylists,
    (req, res) => {
        console.log('at the end of the /api/getAllPlaylists route handler');
        return res.status(200).json(res.locals.playlistArr);
    }
)


// this endpoint is triggered when a musician clicks the "sync" button; it takes their spotify_playlist_id and syncs the corresponding playlist to the database.
router.put(
    '/setPlaylist/:playlistId',
    (req, res, next) => {
        console.log('at the beginning of the /api/setPlaylist route handler');
        return next();
    },
    authController.checkCookies,
    authController.endCycleIfCookiesUnmatched,
    authController.getNewAccessToken,
    authController.spotifyIdAndAccessToDb,
    songController.getSpotifyPlaylist,
    songController.setPlaylistInDb,
    (req, res) => {
        console.log('at the end of the /api/setPlaylist route handler');
        return res.status(200).json({message: 'we are at the end of the /api/setPlaylist router handler', hardCutoffReached: res.locals.hardCutoffReached});
    }
)


// this endpoint is triggered when the musician attempts to update their private info from their private page. the request body should be a JSON-stringified "update object".
router.put(
    '/updateMusicianInfo/:spotify_id',
    (req, res, next) => {
        console.log('at the beginning of the /api/updateMusicianInfo route handler');
        return next();
    },
    authController.checkCookies,
    authController.endCycleIfCookiesUnmatched,
    musicianController.updateMusicianInfoInDb,
    (req, res) => {
        console.log('at the end of the /api/updateMusicianInfo route handler');
        return res.status(200).json({success: res.locals.success});
    }
)


// this endpoint is triggered when the musician chooses to delete their account.
router.delete(
    '/deleteMusician',
    (req, res, next) => {
        console.log('at the beginning of the /api/deleteMusician route handler');
        return next();
    },
    authController.checkCookies,
    authController.endCycleIfCookiesUnmatched,
    musicianController.deleteMusicianFromDb,
    (req, res) => {
        console.log('at the end of the /api/deleteMusician route handler');
        return res.status(200).json({message: 'musician deleted'});
    }
)


// this endpoint receives a request based on the musician clicking the "logout" button on their private page
router.get(
    '/logout',
    (req, res, next) => {
        console.log('at the beginning of the /api/logout route handler');
        return next();
    },
    authController.deleteCookies,
    (req, res) => {
        return res.status(200).json({message: 'cookies deleted'});
    }
)


module.exports = router;