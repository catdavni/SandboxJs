import WebpackPlugin from '@electron-forge/plugin-webpack';
import { webpackLoaderRules } from './webpackLoaderRules';
import { WebpackConfiguration, WebpackPluginRendererConfig } from '@electron-forge/plugin-webpack/src/Config';

const mainConfig: WebpackConfiguration = {
  entry: './src/index.ts',
  resolve: { extensions: ['.ts', '.js'] },
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
                  js: './src/renderer/window/ProductMainWindow.ts',
                  preload: {
                    js: './src/preload/window/ProductMainWindow.ts',
                  },
                  nodeIntegration: false,
                },
                {
                  name: 'product_edit',
                  html: './src/index.html',
                  js: './src/renderer/window/ProductEditWindow.ts',
                  preload: {
                    js: './src/preload/window/ProductEditWindow.ts',
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
