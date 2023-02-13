const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// pull the info from the .env file in the root directory and add it to the process.env object
// this seems to be a *separate* environment from that of server.ts
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
console.log('webpack port:', port)

module.exports = {
    target: 'web',
    mode: 'none',
    entry: path.join(__dirname, "src/client", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: 'bundle-frontend.js',
    },
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
            {
              test: /\.css$/i,
              include: path.resolve(__dirname, 'src'),
              use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ]
    },
    resolve: {
      extensions: ['.tsx','.jsx', '.js','.ts'],
    },
    plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/client", "index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    proxy: {
      '/api': 'http://localhost:' + port,
      secure: false
    },
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
}