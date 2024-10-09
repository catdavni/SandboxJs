// const HtmlWebpackPlugin = require('html-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compiler } from 'webpack';
import { WebpackConfiguration } from 'webpack-cli';

class MyPlugin {
  private count = 0;

  apply(compiler: Compiler) {
    const logger = compiler.getInfrastructureLogger('MyPlugin');
    compiler.hooks.normalModuleFactory.tap('first', (factory) => {
      factory.hooks.beforeResolve.tap('second', (data) => {
        if (data.context.includes('node_modules') || data.request.includes('node_modules')) {
          console.log('');
        }
        console.log('beforeResolve', ++this.count, data.request);
        //logger.warn('beforeResolve', ++this.count, data.request);
      });
    });
  }
}

const config: WebpackConfiguration = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.ts',
  output: { filename: 'app.js' },
  plugins: [new MyPlugin(), new HtmlWebpackPlugin({ template: './template.html' })],
  resolve: { extensions: ['.ts', '.tsx', '.js'] }, // need to resolve imports with different extensions
  module: {
    // need to use transpiler for specific file types
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    client: {
      overlay: true,
    },
  },
};

export default config;
