var path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/dist');
require('babel-polyfill')

module.exports = {
    entry: ['babel-polyfill', `${SRC_DIR}/index.jsx`],
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    module: {
        rules: [
            {
              type: 'javascript/auto',
              test: /\.js[x]?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              type: "javascript/auto",
              test: /\.mjs$/,
              include: /node_modules/
            }
          ]
    }
}