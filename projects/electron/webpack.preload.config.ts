import path from 'path';
import { webpackLoaderRules } from './webpackLoaderRules';

const preloadConfig = {
  mode: 'development',
  entry: {
    productMain: './src/preload/window/ProductMainWindow.ts',
    productEdit: './src/preload/window/ProductEditWindow.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'preload'),
  },
  target: 'electron-preload',
  devtool: 'source-map',
  module: { rules: webpackLoaderRules },
  resolve: { extensions: ['.ts', '.js'] },
};

export default preloadConfig;
