import path from 'path';
import {
  createModuleConfig,
  createPluginsConfig,
  createResolveConfig,
  type OptionsType,
} from 'pobpack-utils/src';
import hotLoaderBabelPlugin from 'react-hot-loader/babel';

type BrowserTargetType = 'modern' | 'all';

export const MODERN = 'modern';
export const ALL = 'all';
export const TARGETS = [ALL, MODERN];

export default (target: BrowserTargetType) => (options: OptionsType) => ({
  // Target web
  target: 'web',

  // get right stack traces
  devtool: options.env === 'production' ? 'nosources-source-map' : 'source-map',

  // use cache
  cache: options.hmr,

  // don't watch node_modules (improve cpu and memory usage)
  watchOptions: {
    ignored: /node_modules/,
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

  resolve: createResolveConfig([target === MODERN && 'modern-browsers', 'browser'].filter(Boolean), {
    ...options,
    babel: {
      presets: [require.resolve('./babel')],
      ...options.babel,
      plugins: [
        options.hmr && hotLoaderBabelPlugin,
        ...(options.babel.plugins || []),
      ].filter(Boolean),
    },
  }),

  entry: options.entries.reduce(
    (entries, entry) => {
      if (typeof entry === 'string') entry = { key: entry, path: entry };
      entries[entry.key] = [
        target !== MODERN && require.resolve('babel-regenerator-runtime'),
        // options.env !== 'production' && require.resolve('./source-map-support'),
        options.hmr && require.resolve('react-hot-loader/patch'),
        options.hmr && require.resolve('react-dev-utils/webpackHotDevClient'),
        path.join(path.resolve(options.paths.src), entry.path),
      ].filter(Boolean);
      return entries;
    },
    {},
  ),

  output: {
    path: path.resolve(options.paths.build),
    devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
  },

  module: createModuleConfig(options),

  plugins: createPluginsConfig(options),
});
