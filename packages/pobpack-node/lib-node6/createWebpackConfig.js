'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const config = require('./config');

exports.default = options => {
  const env = options.env || process.env.NODE_ENV;
  const hmr = options.hmr;
  const production = env === 'production';

  const mainBabelOptions = _extends({
    babelrc: false,
    cacheDirectory: hmr,
    presets: [require.resolve('./babel')]
  }, options.babel);

  return {
    // Target node
    target: 'node',
    // get right stack traces
    devtool: 'source-map',
    // don't bundle node_modules dependencies
    externals: nodeExternals({
      whitelist: ['pobpack-node/hot']
    }),
    // use cache
    cache: hmr,
    // bundle size is not relevant for node
    performance: {
      hints: false
    },
    resolveLoader: {
      modules: ['node_modules']
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
      mainFields: [!production && 'webpack:main-dev', 'webpack:main', !production && 'main-dev', 'main'].filter(Boolean),
      aliasFields: [!production && 'webpack:node-aliases-dev', 'webpack:node-aliases', 'webpack'].filter(Boolean)
    },
    entry: {
      index: [hmr && 'pobpack-node/hot', `${path.resolve(config.server.paths.src)}/index.js`]
    },
    output: {
      path: path.resolve(config.server.paths.build),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: config.server.publicPath,
      libraryTarget: 'commonjs2'
    },

    module: {
      rules: [{
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, config.server.paths.build],
        loaders: [{ loader: 'babel-loader', options: mainBabelOptions }, ...options.jsLoaders]
      }]
    },

    plugins: [new webpack.DefinePlugin(_extends({
      'process.env.NODE_ENV': JSON.stringify(env)
    }, production ? {
      'module.hot': false
    } : {})), new webpack.BannerPlugin({
      raw: true,
      banner: 'require("pobpack-node/source-map-support").install();'
    }), new webpack.NoEmitOnErrorsPlugin(), hmr && new webpack.HotModuleReplacementPlugin(), hmr && new webpack.NamedModulesPlugin()].filter(Boolean)
  };
};
//# sourceMappingURL=createWebpackConfig.js.map