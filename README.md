# Human Jukebox

[Human Jukebox](https://human-jukebox.etale.site/) is a web app for musicians (and bands) to connect with their audience members, sharing information such as their repertoire, their biography, and links to their social media and Venmo accounts. Musicians are authenticated via Spotify, and their repertoires are imported from playlists attached to their Spotify accounts.

**This is a public repo for the Human Jukebox app.** Pull requests are very welcome. For questions, comments, and bug reports, please write to [human.jukebox.app@gmail.com](mailto:human.jukebox.app@gmail.com).

## Running an instance of Human Jukebox

You will need to create an app at the [Spotify developer dashboard](https://developer.spotify.com/dashboard/). Record your "Client ID" and "Client Secret", and whitelist any Spotify accounts that you would like to be able to access your app in development mode.

You will also need to create a PostgreSQL database. Record its URI. The database structure will vary as more features are added, but it can be readily inferred from the database queries embedded in the codebase.

### Running a local instance of Human Jukebox

1. Clone this repo.

1. In the root folder, run `npm install`.

1. In the root folder, create a new text file called `.env`, and populate it as follows.

        CLIENT_ID=[your client id]
        CLIENT_SECRET=[your client secret]
        REDIRECT_URI=http://localhost:8080/api/getMusicianInfo
        PG_URI=[your postgresql URI]
        PORT=4000

1. In the root folder, run `npm start`.

The app should now be accessible at `localhost:8080`.

### Hosting an instance of Human Jukebox

Instructions for hosting the app will depend on the hosting service, but here are the essential points.

1. In the `.env` file of your cloned repo, change the line `REDIRECT_URI=http://localhost:8080/api/getMusicianInfo` to `REDIRECT_URI=[your root URL]/api/getMusicianInfo`. (Or you can write both lines and toggle between them as desired, commenting-out a line by prepending it with the `#` symbol.)

1. In the root folder of your cloned repo, run `npm run bundle-frontend`. Inside of `dist`, the former will create the files `bundle-frontend.js` and `index.html` while the latter will create the file `bundle-backend.js` (all via Webpack).

1. On your server, create a dedicated root folder for Human Jukebox. Within it, create directories called `client` and `server`.

1. Navigate to `/client`. Copy into here the above two frontend files (`bundle-frontend.js` and `index.html`) as well as the files `auth.html` and `auth.js` living in `/src/client`. 

1. Navigate to `/server`. Copy into here the file `package.json`, and run `npm install`.

1. Inside of `/server`, make a subfolder also called `server` and copy into it the file `bundle-backend.js`.

1. Proxy requests past `/api` to `[your root URL]:4000/api`.

Your app should now be live.

### General notes

Note the file `/src/globals.ts`. In it you can toggle `longConsoleLogs` (depending on what you are working on), and you can also set `hardCutoffForPlaylistLength` (depending on your database needs).

If you would like to allow your app to be accessible beyond the explicitly whitelisted users, you must submit a quota extension request in your Spotify developer dashboard.