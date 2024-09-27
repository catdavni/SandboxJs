const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/catManager.js',
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist', 'cats') },
};
