/* eslint-disable complexity */
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import type {
  Options,
  ConfigEntry,
  FilledWebpackConfiguration,
} from 'pobpack-types';
import {
  createModuleConfig,
  createPluginsConfig,
  createResolveConfig,
} from 'pobpack-utils';
import webpack from 'webpack';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

export type BrowserTargetType = 'modern' | 'all';

export const MODERN = 'modern';
export const ALL = 'all';
export const TARGETS: BrowserTargetType[] = [ALL, MODERN];

const ExcludesFalsy = (Boolean as unknown) as <T>(
  x: T | boolean | null | undefined,
) => x is T;

const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient',
);

export default function createBrowserWebpackConfig(target: BrowserTargetType) {
  return (options: Options): FilledWebpackConfiguration => ({
    // production or development
    mode: options.env === 'production' ? 'production' : 'development',

    // Don't attempt to continue if there are any errors.
    bail: options.env === 'production',

    // Target web
    target: target === MODERN ? 'web' : ['web', 'es5'],

    // get right stack traces
    devtool:
      options.env === 'production' ? 'nosources-source-map' : 'source-map',

    optimization: {
      emitOnErrors: false,
      minimize: options.env === 'production',
      ...options.optimization,
    },

    // use cache
    cache: options.hmr,

    resolveLoader: {
      modules: options.resolveLoaderModules || ['node_modules'],
    },

    resolve: createResolveConfig(
      [target === MODERN ? 'modern-browsers' : undefined, 'browser'].filter(
        ExcludesFalsy,
      ),
      {
        ...options,
        babel: {
          presets: [require.resolve('../babel')],
          ...options.babel,
          plugins: [
            ...(options.babel.plugins || []),
            options.hmr && require.resolve('react-refresh/babel'),
          ].filter(ExcludesFalsy),
        },
      },
    ),

    entry: options.entries.reduce(
      (entries: { [key: string]: string[] }, entry: ConfigEntry) => {
        if (typeof entry === 'string') entry = { key: entry, path: entry };
        entries[entry.key] = [
          // options.env !== 'production' && require.resolve('../source-map-support'),
          target !== MODERN && require.resolve('regenerator-runtime/runtime'),
          options.hmr && webpackDevClientEntry,
          path.join(path.resolve(options.paths.src as string), entry.path),
        ].filter(ExcludesFalsy);
        return entries;
      },
      {},
    ),

    output: {
      path: path.resolve(options.paths.build as string),
      // Point sourcemap entries to original disk location

      // devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
      devtoolModuleFilenameTemplate:
        options.env === 'production'
          ? (info: any) =>
              path
                .relative(
                  options.paths.src as string,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  info.absoluteResourcePath,
                )
                .replace(/\\/g, '/')
          : // eslint-disable-next-line unicorn/no-nested-ternary
          options.env === 'development'
          ? (info: any) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
          : undefined,
    },

    module: createModuleConfig(options),

    plugins: [
      ...createPluginsConfig(options),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      options.hmr &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            // Create React App overlay config
            entry: webpackDevClientEntry,
            module: require.resolve('react-dev-utils/refreshOverlayInterop'),
            sockIntegration: false,
          },
        }),
      options.env === 'production' &&
      options.paths.src &&
      options.serviceWorkerEntry
        ? new WorkboxWebpackPlugin.InjectManifest({
            swSrc: path.resolve(
              options.paths.src,
              options.serviceWorkerEntry.endsWith('.js') ||
                options.serviceWorkerEntry.endsWith('.ts')
                ? options.serviceWorkerEntry
                : `${options.serviceWorkerEntry}${
                    options.typescript ? '.ts' : '.js'
                  }`,
            ),
            compileSrc: true,
            dontCacheBustURLsMatching: /\.[\da-f]{8}\./,
            exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
          })
        : undefined,
    ].filter(ExcludesFalsy),
  });
}
