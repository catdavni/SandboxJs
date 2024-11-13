import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { webpackLoaderRules } from './webpackLoaderRules';

webpackLoaderRules.push({
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
});

const rendererConfig = {
  mode: 'development',
  entry: {
    productMain: './src/renderer/window/ProductMainWindow.ts',
    productEdit: './src/renderer/window/ProductEditWindow.ts',
  },
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist', 'renderer') },
  devtool: 'source-map',
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({ chunks: ['productMain'], filename: 'productMain.html', template: './src/index.html' }),
    new HtmlWebpackPlugin({ chunks: ['productEdit'], filename: 'productEdit.html', template: './src/index.html' }),
    // Host template to make webpack start script agnostic to specific pages if they are changed
    new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.html' }),
  ],
  resolve: { extensions: ['.ts', '.tsx', '.js', '.css'] },
  module: { rules: webpackLoaderRules },
  devServer: {
    port: 3333,
  },
};

export default rendererConfig;
