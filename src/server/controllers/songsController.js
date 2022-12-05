const db = require('../models/models.js');

const songsController = {};


songsController.getSpotifyId = (req, res, next) => {
    const {handle} = req.params;
    console.log('inside of songsController.getSpotifyId, and the handle coming from the URL parameter is:', handle);
    const values = [handle];
    const queryString = 'SELECT spotify_id FROM public.musicians WHERE handle = $1';
    db.query(queryString, values).then(data => {
        console.log('inside of singsController.getSpotifyId, and the data.rows returned from the database are:', data.rows);
        res.locals.spotifyId = data.rows[0].spotify_id;
        return next();
    })
}




// TO BE DELETED -- replaced by the above
songsController.getMusicianId = (req, res, next) => {
    const {handle} = req.params;
    console.log('inside of songsController.getMusicianId, and the handle coming from the URL parameter is', handle);
    const values = [handle];
    const queryString = 'SELECT spotify_id FROM public.musicians WHERE handle = $1';
    db.query(queryString,values).then((data) => {
        console.log('inside of songsController.getMusicianId, and the data.rows returned from the database are:', data.rows);
        res.locals.id = data.rows[0];
        return next();
    }).catch((err) => {
        console.log(err)
    });
}


songsController.getSongs = (req, res, next) => {
    const spotifyId = res.locals.spotifyId;
    console.log('inside of songsController.getSongs, and spotifyId is', spotifyId)
    const queryString = `SELECT name, artist, genre, preview_url FROM public.songs INNER JOIN public.musicians_songs ON public.songs.spotify_id = public.musicians_songs.song WHERE public.musicians_songs.musician = '${spotifyId}'` // WHERE public.musicians_songs.musician = ${spotifyId}`;
    db.query(queryString).then(data => {
        console.log('data.rows is', data.rows)
        res.locals.songs = data.rows;
        return next()
    }).catch(err => {
        console.log(err)
    })
    
    
    
    // const {_id} = res.locals.id;
    // console.log('inside songsController.getSongs, and the _id is: ', _id);
    // const values = [_id];
    // const queryString = `SELECT title, artist, genre FROM public.songs INNER JOIN public.musician_songs ON public.songs._id = public.musician_songs.song_id WHERE public.musician_songs.musician_id = $1;`
    // db.query(queryString,values).then((data) => {
    //     console.log(data.rows);
    //     res.locals.songs = data.rows;
    //     return next();
    // }).catch((err) => {
    //     console.log(err)
    // });


}


module.exports = songsController;