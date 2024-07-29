const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: { filename: "index.js" },
  plugins: [new HtmlWebpackPlugin({ template: './template.html' })],
  resolve: { extensions: ['.ts', '.js'] }, // need to resolve imports with different extensions
  module: {
    // need to use transpiler for specific file types
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
