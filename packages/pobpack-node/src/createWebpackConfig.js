// const fs = require('fs');
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
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
    // get right stack traces
    devtool: 'source-map',
    // don't bundle node_modules dependencies
    externals: nodeExternals({
      whitelist: ['pobpack-node/hot'],
    }),
    // use cache
    cache: hmr,
    // bundle size is not relevant for node
    performance: {
      hints: false,
    },
    resolveLoader: {
      modules: ['node_modules'],
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
      mainFields: [
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
        hmr && 'pobpack-node/hot',
        `${path.resolve(options.paths.src)}/index.js`,
      ],
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
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: [
            /node_modules/,
            options.paths.build,
          ],
          loaders: [
            { loader: 'babel-loader', options: mainBabelOptions },
            ...(options.jsLoaders || []),
          ],
        },
        ...(options.moduleRules || []),
      ],
    },

    plugins: [
      ...(options.prependPlugins || []),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        ...(production ? { 'module.hot': false } : {}),
      }),

      new webpack.BannerPlugin({
        raw: true,
        banner: 'require("pobpack-node/source-map-support").install();',
      }),

      new webpack.NoEmitOnErrorsPlugin(),

      hmr && new webpack.HotModuleReplacementPlugin(),
      hmr && new webpack.NamedModulesPlugin(),
      ...(options.plugins || []),
    ].filter(Boolean),
  };
};
