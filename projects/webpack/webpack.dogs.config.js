const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/dogManager.js',
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist', 'dogs') },
};
