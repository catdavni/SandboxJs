import path from 'path';
import { webpackLoaderRules } from './webpackLoaderRules';

const preloadConfig = {
  mode: 'development',
  entry: './src/preload.ts',
  target: 'electron-preload',
  devtool: 'source-map',
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, 'dist', 'preload'),
  },
  module: { rules: webpackLoaderRules },
};

export default preloadConfig;
