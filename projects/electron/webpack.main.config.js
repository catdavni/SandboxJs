const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'electron-main',
  devtool: 'source-map',
  output: { filename: 'index.js', path: path.resolve(__dirname, 'dist', 'main') },
};
