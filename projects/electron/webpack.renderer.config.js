const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/renderer.js',
  devtool: 'source-map',
  target: 'web',
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
  devServer: {
    port: 3333,
  },
};
