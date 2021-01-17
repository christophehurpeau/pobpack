// const fs = require('fs');
import fs from 'fs';
import path from 'path';
import type {
  ConfigEntry,
  Options,
  FilledWebpackConfiguration,
} from 'pobpack-types';
import {
  webpack,
  createModuleConfig,
  createPluginsConfig,
  createResolveConfig,
} from 'pobpack-utils';
import type { ExternalsFunctionElement } from 'webpack';
import type { Options as NodeExternalsOptions } from 'webpack-node-externals';
import nodeExternals from 'webpack-node-externals';

const ExcludesFalsy = (Boolean as any) as <T>(
  x: T | false | null | undefined,
) => x is T;

const createExternals = (options: Options): ExternalsFunctionElement[] => {
  const baseOptions: NodeExternalsOptions = {
    importType: 'commonjs',
    modulesFromFile: false,
    allowlist: [
      require.resolve('../hot'),
      ...options.includeModules.map(
        (module: string) => new RegExp(`^${module}(/|$)`),
      ),
    ].concat(
      options.allowlistExternalExtensions
        ? [new RegExp(`(${options.allowlistExternalExtensions.join('|')})$`)]
        : [],
    ),
  };

  const nodeModulesPaths = [];
  let p = process.cwd();
  do {
    const nodeModulesCurrentPath = path.join(p, 'node_modules');
    if (fs.existsSync(nodeModulesCurrentPath)) {
      nodeModulesPaths.push(nodeModulesCurrentPath);
    }
    p = path.dirname(p);
  } while (p !== '/');

  return nodeModulesPaths.map((nodeModulesPath) =>
    nodeExternals({ ...baseOptions, modulesDir: nodeModulesPath }),
  );
};

export default function createNodeWebpackConfig(
  options: Options,
): FilledWebpackConfiguration {
  return {
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
      ...options.optimization,
    },

    // don't bundle node_modules dependencies
    externals: createExternals(options),

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

    entry: options.entries.reduce(
      (entries: { [key: string]: string[] }, entry: ConfigEntry) => {
        if (typeof entry === 'string') entry = { key: entry, path: entry };
        entries[entry.key] = [
          options.hmr ? require.resolve('../hot') : undefined,
          path.join(path.resolve(options.paths.src as string), entry.path),
        ].filter(ExcludesFalsy);
        return entries;
      },
      {},
    ),

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
  };
}
