# human-jukebox

to run the app:

1. clone the repo.
1. run `npm i` .
1. make a `.env` file containing a `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI` (the first two obtained from spotify dev dashboard). this could also contain a `PORT` (likely 3000), as well as a `PG_URI` for the database.
1. run `npm run start-dev` to serve at `localhost:8080` .


for local hosting, in the `.env` file set the `REDIRECT_URI` as:
`REDIRECT_URI=http://localhost:8080/api/getMusicianInfo`
but if you are hosting it at e.g. `https://human-jukebox.mycoolwebsite.com`, then before creating bundle-backend.js you should change this to `REDIRECT_URI=https://human-jukebox.mycoolwebsite.com/api/getMusicianInfo`.