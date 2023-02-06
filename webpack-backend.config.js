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




/*
the following delete command is because, when trying to run node bundle-backend.js (in the terminal), i kept getting errors on a particular line:

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete {"NVM_INC":"/Users/aaron/.nvm/versions/node/v16.16.0/include/node", [...lots more stuff here...]}.DEBUG;
    } else {
      {"NVM_INC":"/Users/aaron/.nvm/versions/node/v16.16.0/include/node", [...lots more stuff here -- the same stuff...]}.DEBUG = namespaces;
    }
  }

namely, it was getting hung up on the "else" line (and weirdly, not the prior line). see the above comments inside of the function definition. and this was the one property on process.env that was set to undefined. so i deleted it.

however, sadly this doesn't seem to fix the error... so just to be safe, i'm back to not deleting it.
*/

// console.log('process.env is:', process.env);
delete process.env.ORIGINAL_XDG_CURRENT_DESKTOP;
// console.log('and now process.env is:', process.env);



// this is to try and fix the error with colons. but it doesn't do it; even just these give the same error.
// const newProcessEnv = {
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET,
//   REDIRECT_URI: process.env.REDIRECT_URI,
//   PG_URI: process.env.PG_URI,
//   PORT: process.env.PORT,
//   NODE_ENV: process.env.NODE_ENV,
// }



// the following code is copied from this file:
  // https://github.com/jlongster/backend-with-webpack/blob/part1/webpack.config.js
// based on this article:
  // https://archive.jlongster.com/Backend-Apps-with-Webpack--Part-I
// it also dictates the line:
  // externals: nodeModules,

var fs = require('fs');
  var nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

  

module.exports = {
    target: "node",
    mode: process.env.NODE_ENV,
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