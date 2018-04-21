import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { type OptionsType } from '../createOptions';

export default (options: OptionsType) =>
  [
    ...options.prependPlugins,

    // ignore files when watching
    new webpack.WatchIgnorePlugin([
      // typescript definitions
      /\.d\.ts$/,
    ]),

    // enforces the entire path of all required modules match the exact case
    // of the actual path on disk. Using this plugin helps alleviate cases
    // for developers working on case insensitive systems like OSX.
    options.env !== 'production' && new CaseSensitivePathsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(options.env),
      ...options.defines,
    }),

    options.hmr && new webpack.HotModuleReplacementPlugin(),

    /* replace object-assign ponyfill to use native implementation */

    // Object.assign
    new webpack.NormalModuleReplacementPlugin(
      /.*\/node_modules\/object-assign\/index.js/,
      require.resolve('../replacements/object-assign.js'),
    ),

    // Promise
    new webpack.NormalModuleReplacementPlugin(
      /.*\/node_modules\/any-promise\/index.js/,
      require.resolve('../replacements/Promise.js'),
    ),

    new webpack.IgnorePlugin(/.*/, /node_modules\/any-promise$/),

    ...options.plugins,
  ].filter(Boolean);
