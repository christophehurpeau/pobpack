import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import type { Options } from 'pobpack-types';
import type { Configuration } from 'webpack';
import webpack from 'webpack';

const ExcludesFalsy = (Boolean as unknown) as <T>(
  x: T | boolean | null | undefined,
) => x is T;

export default function createPluginsConfig(
  options: Options,
): NonNullable<Configuration['plugins']> {
  const plugins: unknown[] = [
    ...(options.prependPlugins || []),

    // enforces the entire path of all required modules match the exact case
    // of the actual path on disk. Using this plugin helps alleviate cases
    // for developers working on case insensitive systems like OSX.
    options.env !== 'production' && new CaseSensitivePathsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(options.env),
      ...options.defines,
    }),

    /* replace object-assign ponyfill to use native implementation */

    // Array.isArray
    new webpack.NormalModuleReplacementPlugin(
      /.*\/node_modules\/isarray\/index.js$/,
      require.resolve('../replacements/Array.isArray.js'),
    ),

    // Object.assign
    new webpack.NormalModuleReplacementPlugin(
      /.*\/node_modules\/(object-assign|extend-shallow)\/index.js$/,
      require.resolve('../replacements/Object.assign.js'),
    ),

    // Object.setPrototypeOf
    new webpack.NormalModuleReplacementPlugin(
      /.*\/node_modules\/setprototypeof\/index.js$/,
      require.resolve('../replacements/Object.setPrototypeOf.js'),
    ),

    // Promise
    new webpack.NormalModuleReplacementPlugin(
      /.*\/node_modules\/any-promise\/index.js$/,
      require.resolve('../replacements/Promise.js'),
    ),

    // String.prototype.repeat
    new webpack.NormalModuleReplacementPlugin(
      /.*\/node_modules\/repeat-string\/index.js$/,
      require.resolve('../replacements/String.prototype.repeat.js'),
    ),

    // Symbol.observable
    // https://github.com/tc39/proposal-observable
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/observable
    // new webpack.NormalModuleReplacementPlugin(
    //   /.*\/node_modules\/symbol-observable\/es\/ponyfill.js$/,
    //   require.resolve('../replacements/Symbol.observable.js'),
    // ),

    ...options.plugins,
  ];

  return plugins.filter(ExcludesFalsy) as NonNullable<Configuration['plugins']>;
}
