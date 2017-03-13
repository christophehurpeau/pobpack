// const fs = require('fs');
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import {
  webpack,
  createModuleConfig,
  createPluginsConfig,
  createResolveConfig,
  type OptionsType,
} from 'pobpack-utils/src';

export default (options: OptionsType) => ({
  // Target node
  target: 'node',

  // don't bundle node_modules dependencies
  externals: nodeExternals({
    whitelist: [
      require.resolve('../hot'),
      ...options.includeModules.map(module => new RegExp(`^${module}(/|$)`)),
    ],
  }),

  // __dirname and __filename
  node: {
    __filename: true,
    __dirname: true,
  },

  // use cache
  cache: options.hmr,

  // bundle size is not relevant for node
  performance: {
    hints: false,
  },

  resolveLoader: {
    modules: options.resolveLoaderModules || ['node_modules'],
  },

  resolve: createResolveConfig(['node'], {
    ...options,
    babel: {
      presets: [require.resolve('./babel')],
      ...options.babel,
    },
  }),

  entry: options.entries.reduce(
    (entries, entry) => {
      if (typeof entry === 'string') entry = { key: entry, path: entry };
      entries[entry.key] = [
        options.hmr && require.resolve('../hot'),
        path.join(path.resolve(options.paths.src), entry.path),
      ].filter(Boolean);
      return entries;
    },
    {},
  ),

  output: {
    path: path.resolve(options.paths.build),
    libraryTarget: 'commonjs2',
  },

  module: createModuleConfig(options),

  plugins: createPluginsConfig({
    ...options,
    plugins: [
      options.hmr && new webpack.BannerPlugin({
        banner: `require("${require.resolve('source-map-support')}").install({ environment: "node" });`,
        raw: true,
        entryOnly: false,
        include: /\.js$/,
      }),
      ...options.plugins,
    ],
  }),
});
