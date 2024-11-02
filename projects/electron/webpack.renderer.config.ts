import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { webpackLoaderRules } from './webpackLoaderRules';

webpackLoaderRules.push({
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
});

const rendererConfig = {
  mode: 'development',
  entry: './src/renderer.ts',
  devtool: 'source-map',
  target: 'web',
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist', 'renderer') },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  resolve: { extensions: ['.ts', '.js', '.css'] },
  module: { rules: webpackLoaderRules },
  devServer: {
    port: 3333,
  },
};

export default rendererConfig;
