const path = require('path');
const { WebpackCustomPlugin } = require('./src/plugins/customPlugin.js');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'main'),
  },
  plugins: [new WebpackCustomPlugin()],
};
