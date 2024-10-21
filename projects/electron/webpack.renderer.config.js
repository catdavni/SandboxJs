const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  entry: './src/renderer.js',
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist', 'renderer') },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  target: 'web',
};
