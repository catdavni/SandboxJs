const path = require('path');
const { WebpackCustomPlugin } = require('./src/plugins/customPlugin');

module.exports = {
  mode: 'development',
  entry: './src/catManager.js',
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist', 'cats') },
  plugins: [new WebpackCustomPlugin()],
};
