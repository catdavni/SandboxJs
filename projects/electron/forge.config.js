const { WebpackPlugin } = require('@electron-forge/plugin-webpack');

module.exports = {
  packagerConfig: {
    name: 'Sandbox Electron',
  },
  plugins:
    process.env.RUN_CONFIG === 'bare_webpack'
      ? []
      : [
          new WebpackPlugin({
            mode: 'development',
            mainConfig: {
              entry: './src/index.js',
            },
            renderer: {
              config: {
                module: {
                  rules: [
                    {
                      test: /\.css$/,
                      use: ['style-loader', 'css-loader'],
                    },
                  ],
                },
              },
              resolve: {
                extensions: ['.js', '.css'],
              },
              entryPoints: [
                {
                  name: 'fucking_magic',
                  html: './src/index.html',
                  js: './src/renderer.js',
                  preload: {
                    js: './src/preload.js',
                  },
                  nodeIntegration: false,
                },
              ],
            },
          }),
        ],
  makers: [],
};
