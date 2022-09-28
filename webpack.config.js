const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src/client", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
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
      '/api': 'http://localhost:3000',
      secure: false
    }
  },
}