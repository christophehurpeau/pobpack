import path from 'path';
import {
  createModuleConfig,
  createPluginsConfig,
  createResolveConfig,
  type OptionsType,
} from 'pobpack-utils';
import hotLoaderBabelPlugin from 'react-hot-loader/babel';

type BrowserTargetType = 'modern' | 'all';

export const MODERN = 'modern';
export const ALL = 'all';
export const TARGETS = [ALL, MODERN];

export default (target: BrowserTargetType) => (options: OptionsType) => ({
  // production or development
  mode: options.env === 'production' ? 'production' : 'development',

  // Don't attempt to continue if there are any errors.
  bail: options.env === 'production',

  // Target web
  target: 'web',

  // get right stack traces
  devtool: options.env === 'production' ? 'nosources-source-map' : 'source-map',

  optimization: {
    noEmitOnErrors: true,
    minimize: options.env === 'production',
  },

  // use cache
  cache: options.hmr,

  devServer: {
    // don't watch node_modules (improve cpu and memory usage)
    watchOptions: {
      ignored: /node_modules/,
    },
  },

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // fs and module are used by source-map-support
  node: {
    fs: 'empty',
    module: 'empty',
  },

  resolveLoader: {
    modules: options.resolveLoaderModules || ['node_modules'],
  },

  resolve: createResolveConfig(
    [target === MODERN && 'modern-browsers', 'browser'].filter(Boolean),
    {
      ...options,
      babel: {
        presets: [require.resolve('../babel')],
        ...options.babel,
        plugins: [options.hmr && hotLoaderBabelPlugin, ...(options.babel.plugins || [])].filter(
          Boolean,
        ),
      },
    },
  ),

  entry: options.entries.reduce((entries, entry) => {
    if (typeof entry === 'string') entry = { key: entry, path: entry };
    entries[entry.key] = [
      // options.env !== 'production' && require.resolve('../source-map-support'),
      target !== MODERN && require.resolve('regenerator-runtime/runtime'),
      options.hmr && require.resolve('react-hot-loader/patch'),
      options.hmr && require.resolve('react-dev-utils/webpackHotDevClient'),
      path.join(path.resolve(options.paths.src), entry.path),
    ].filter(Boolean);
    return entries;
  }, {}),

  output: {
    path: path.resolve(options.paths.build),
    // devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
  },

  module: createModuleConfig(options),

  plugins: createPluginsConfig(options),
});
