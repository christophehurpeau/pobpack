// const fs = require('fs');
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { FilledWebpackConfiguration } from 'pobpack-types';
import {
  webpack,
  createModuleConfig,
  createPluginsConfig,
  createResolveConfig,
} from 'pobpack-utils';
import { ConfigEntry, Options } from 'pobpack-types';

const ExcludesFalsy = (Boolean as any) as <T>(x: T | false | null | undefined) => x is T;

export default (options: Options): FilledWebpackConfiguration => ({
  // production or development
  mode: options.env === 'production' ? 'production' : 'development',

  // Don't attempt to continue if there are any errors.
  bail: options.env === 'production',

  // Target node
  target: 'node',

  // get right stack traces
  devtool: 'source-map',

  optimization: {
    noEmitOnErrors: true,
    minimize: false,
  },

  // don't bundle node_modules dependencies
  externals: nodeExternals({
    importType: 'commonjs',
    modulesFromFile: false,
    whitelist: [
      require.resolve('../hot'),
      ...options.includeModules.map((module: string) => new RegExp(`^${module}(/|$)`)),
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
      presets: [require.resolve('../babel')],
      ...options.babel,
    },
  }),

  entry: options.entries.reduce((entries: { [key: string]: Array<string> }, entry: ConfigEntry) => {
    if (typeof entry === 'string') entry = { key: entry, path: entry };
    entries[entry.key] = [
      options.hmr ? require.resolve('../hot') : undefined,
      path.join(path.resolve(options.paths.src as string), entry.path),
    ].filter(ExcludesFalsy);
    return entries;
  }, {}),

  output: {
    path: path.resolve(options.paths.build as string),
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },

  module: createModuleConfig(options),

  plugins: createPluginsConfig({
    ...options,
    plugins: [
      options.hmr &&
        new webpack.BannerPlugin({
          banner: `require("${require.resolve('../source-map-support')}");`,
          raw: true,
          entryOnly: false,
          include: /\.js$/,
        }),
      ...options.plugins,
    ],
  }),
});
