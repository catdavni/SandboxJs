const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/preload.js',
  target: 'electron-preload',
  devtool: 'source-map',
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, 'dist', 'preload'),
  },
};
