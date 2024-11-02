import type { ModuleOptions } from 'webpack';

const webpackLoaderRules: Required<ModuleOptions>['rules'] = [
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
];
export { webpackLoaderRules };
