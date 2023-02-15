// this webpack backend config file was created using the tutorial:
  // https://medium.com/code-oil/webpack-javascript-bundling-for-both-front-end-and-back-end-b95f1b429810
// however, it does _not_ make sense for me to use webpack-node-externals package here (and its result, the function invocation nodeExternals()) because i'm not writing a node modules (see the docs thereof).

// this import is for the plugin for environment variables.
const webpack = require('webpack');

const path = require('path');

// pull the info from the .env file in the root directory and add it to the process.env object
// this seems to be a *separate* environment from that of server.ts
const dotenv = require('dotenv');
dotenv.config();

// reset the node environment.
process.env.NODE_ENV = "production";
console.log('inside of webpack-backend.config.js, and process.env.NODE_ENV is:', process.env.NODE_ENV);

// the following code is copied from this file:
  // https://github.com/jlongster/backend-with-webpack/blob/part1/webpack.config.js
// based on this article:
  // https://archive.jlongster.com/Backend-Apps-with-Webpack--Part-I
// it also dictates the line below:
  // externals: nodeModules,
// the essential point of the article is that one should _not_ try to bundle node modules into a backend js file, because they're not written for that (e.g. "require" statements get screwed up). so, one must still install node packages on the server.

var fs = require('fs');
  var nodeModules = {};
  // this synchronously reads the contents of the directory, and returns an array with all the file names in it.
  fs.readdirSync('node_modules')
    .filter(function(x) {
      // this seems to be a weird way of checking whether x is _not_ equal to the string '.bin', i.e. filtering out the '.bin' folder.
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {
  // this tells webpack not to bother with built-in node modules like 'fs' or 'path'.
    target: 'node',
    mode: 'none',
    entry: path.join(__dirname, "src/server", "server.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: 'bundle-backend.js',
    },
    externals: nodeModules,
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: ['@babel/preset-env', '@babel/preset-react']
                  }
              }
            },
            {
              test: /\.(ts|tsx)$/,
              use: ['ts-loader'],
              exclude: /node_modules/,
            },
        ]
    },
    resolve: {
      extensions: ['.tsx','.jsx', '.js','.ts'],
    },
    plugins: [
      // the following plugin is so that webpack knows to pull the environment variables.
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
      // the following is to (successfully) remove four warnings that are coming up during build from the "formidable" package.
        // the original suggestion was here: https://github.com/auth0/node-auth0/issues/493#issuecomment-668949147
      new webpack.DefinePlugin({
        "global.GENTLY": false
      }),
    ],
  devtool: 'inline-source-map',
}