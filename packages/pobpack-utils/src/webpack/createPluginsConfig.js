import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { type OptionsType } from '../createOptions';

export default (options: OptionsType) => [
  ...options.prependPlugins,

  // enforces the entire path of all required modules match the exact case
  // of the actual path on disk. Using this plugin helps alleviate cases
  // for developers working on case insensitive systems like OSX.
  options.env !== 'production' && new CaseSensitivePathsPlugin(),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(options.env),
    ...options.defines,
  }),

  new webpack.NoEmitOnErrorsPlugin(),

  options.hmr && new webpack.HotModuleReplacementPlugin(),
  options.hmr && new webpack.NamedModulesPlugin(),
  ...options.plugins,
].filter(Boolean);
