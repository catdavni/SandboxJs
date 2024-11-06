import WebpackPlugin from '@electron-forge/plugin-webpack';
import { webpackLoaderRules } from './webpackLoaderRules';
import { WebpackConfiguration, WebpackPluginRendererConfig } from '@electron-forge/plugin-webpack/src/Config';

const mainConfig: WebpackConfiguration = {
  entry: './src/index.ts',
  module: {
    rules: webpackLoaderRules,
  },
};

const rendererConfig: WebpackConfiguration = {
  resolve: { extensions: ['.ts', '.tsx', '.js', '.css'] },
  module: {
    rules: [
      ...webpackLoaderRules,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const forgeConfig = {
  packagerConfig: {
    name: 'Sandbox Electron',
  },
  plugins:
    process.env.RUN_CONFIG === 'bare_webpack'
      ? []
      : [
          new WebpackPlugin({
            mainConfig,
            renderer: {
              config: rendererConfig,
              entryPoints: [
                {
                  name: 'fucking_magic',
                  html: './src/index.html',
                  js: './src/renderer.ts',
                  preload: {
                    js: './src/preload.ts',
                  },
                  nodeIntegration: false,
                },
              ],
            },
          }),
        ],
  makers: [],
};

export default forgeConfig;
