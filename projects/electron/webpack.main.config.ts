import path from 'path';
import { webpackLoaderRules } from './webpackLoaderRules';

const mainConfig = {
  mode: 'development',
  entry: './src/index.ts',
  target: 'electron-main',
  devtool: 'source-map',
  output: { filename: 'index.js', path: path.resolve(__dirname, 'dist', 'main') },
  module: { rules: webpackLoaderRules },
  resolve: { extensions: ['.ts', '.js'] },
};

export default mainConfig;
