const express = require('express');
const app = express();


// pull the info from the .env file in the root directory and add it to the process.env object
// this seems to be a *separate* environment from that of webpack.config.js
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;

// import the api router
const router = require('./routes/api');


const cookieParser = require('cookie-parser');
// every time cookieParser() is run, the existing cookies are stored to the request object.
app.use(cookieParser());


// /// for testing production mode
// app.use(express.static('dist'));
// app.use('/musician', express.static('dist'));


// handle API calls using the imported router
app.use('/api', router);


// // handle requests to the root endpoint
// // this is for production mode
// app.get('/*', (req: any, res: any) => {
//     console.log('the original URL request is: ', req.originalUrl);
//     console.log('inside the server route handler for root endpoint');
//     // // test the server connection (via localhost:${port}) at the root endpoint
//     // res.status(200).send("Are You There, God? It's Me, Server.");
//     res.sendFile('/Users/aaron/git/human-jukebox/dist/index.html')
// });



// // handle requests past api route
// app.get('/api/*', (req: any, res: any) => {
//     res.status(200).send('reached the /api/* route handler');
// })



////////////////////
// error handlers //
////////////////////


// global error handler
app.use((req: any, res: any) => res.status(404).send('The global error handler has been triggered. Just for you, here\'s Cage 4\'33":'));


// local error handler
app.use((err: any, req: any, res: any, next: any) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error.',
        status: 500,
        message: {err: 'An error has occurred: you have reached the local error handler.'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
})


// start the server
app.listen(port, () => {
    console.log(`your server has been started at http://localhost:${port}`);
});