import path from 'path';
import {
  createModuleConfig,
  createPluginsConfig,
  createResolveConfig,
  type OptionsType,
} from 'pobpack-utils/src';

type BrowserTargetType = 'modern' | 'all';

export const MODERN = 'modern';
export const ALL = 'all';
export const TARGETS = [ALL, MODERN];

export default (target: BrowserTargetType) => (options: OptionsType) => ({
  // Target web
  target: 'web',

  // use cache
  cache: options.hmr,

  resolveLoader: {
    modules: options.resolveLoaderModules || ['node_modules'],
  },

  resolve: createResolveConfig([target === MODERN && 'modern-browsers', 'browser'].filter(Boolean), {
    ...options,
    babel: {
      presets: [require.resolve('./babel')],
      ...options.babel,
    },
  }),

  entry: options.entries.reduce(
    (entries, entry) => {
      if (typeof entry === 'string') entry = { key: entry, path: entry };
      entries[`${target}/${entry.key}`] = [
        target !== MODERN && 'babel-regenerator-runtime',
        // options.hmr && 'react-hot-loader/patch',
        path.join(path.resolve(options.paths.src), entry.path),
      ].filter(Boolean);
      return entries;
    },
    {},
  ),

  output: {
    path: path.resolve(options.paths.build),
  },

  module: createModuleConfig(options),

  plugins: createPluginsConfig(options),
});
