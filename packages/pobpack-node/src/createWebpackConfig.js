// const fs = require('fs');
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import createOptions, { type OptionsType } from './createOptions';

export default (options: OptionsType) => {
  options = createOptions(options);
  const env = options.env;
  const hmr = options.hmr;
  const production = env === 'production';

  const mainBabelOptions = {
    babelrc: false,
    cacheDirectory: hmr,
    presets: [
      require.resolve('./babel'),
    ],
    ...options.babel,
  };

  return {
    // Target node
    target: 'node',

    // don't bundle node_modules dependencies
    externals: nodeExternals({
      whitelist: [require.resolve('../hot')],
    }),

    // __dirname and __filename
    node: {
      __filename: true,
      __dirname: true,
    },

    // use cache
    cache: hmr,

    // bundle size is not relevant for node
    performance: {
      hints: false,
    },

    resolveLoader: {
      modules: options.resolveLoaderModules || ['node_modules'],
    },

    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
      mainFields: [
        !production && 'webpack:node-dev',
        'webpack:node',
        !production && 'webpack:main-dev',
        'webpack:main',
        !production && 'main-dev',
        'main',
      ].filter(Boolean),
      aliasFields: [
        !production && 'webpack:node-aliases-dev',
        'webpack:node-aliases',
        'webpack',
      ].filter(Boolean),
    },

    entry: {
      index: [
        hmr && require.resolve('../hot'),
        path.join(path.resolve(options.paths.src), options.paths.entry),
      ].filter(Boolean),
    },

    output: {
      path: path.resolve(options.paths.build),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: '/',
      libraryTarget: 'commonjs2',
    },

    module: {
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },

        // json
        {
          test: /\.json$/,
          loader: 'json-loader',
        },

        // jsx?
        {
          test: /\.jsx?$/,
          exclude: [
            /node_modules/,
            options.paths.build,
          ],
          loaders: [
            { loader: 'babel-loader', options: mainBabelOptions },
            ...(options.jsLoaders || []),
          ],
        },

        // other rules
        ...(options.moduleRules || []),
      ],
    },

    plugins: [
      ...(options.prependPlugins || []),

      // enforces the entire path of all required modules match the exact case
      // of the actual path on disk. Using this plugin helps alleviate cases
      // for developers working on case insensitive systems like OSX.
      !production && new CaseSensitivePathsPlugin(),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        ...(production ? { 'module.hot': false } : {}),
      }),

      // get right stack traces
      new webpack.SourceMapDevToolPlugin({
        test: /\.jsx?$/,
        filename: '[name].js.map',
      }),

      new webpack.NoEmitOnErrorsPlugin(),

      hmr && new webpack.HotModuleReplacementPlugin(),
      hmr && new webpack.NamedModulesPlugin(),
      hmr && new webpack.BannerPlugin({
        banner: `require("${require.resolve('source-map-support')}").install({ environment: "node" });`,
        raw: true,
        entryOnly: false,
        include: /\.js$/,
      }),
      ...(options.plugins || []),
    ].filter(Boolean),
  };
};
