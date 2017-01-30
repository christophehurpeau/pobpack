'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // const fs = require('fs');


var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _createOptions = require('./createOptions');

var _createOptions2 = _interopRequireDefault(_createOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = options => {
  options = (0, _createOptions2.default)(options);
  const env = options.env;
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
    externals: (0, _webpackNodeExternals2.default)({
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
      index: [hmr && 'pobpack-node/hot', `${_path2.default.resolve(options.paths.src)}/index.js`]
    },
    output: {
      path: _path2.default.resolve(options.paths.build),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },

    module: {
      rules: [{
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, options.paths.build],
        loaders: [{ loader: 'babel-loader', options: mainBabelOptions }, ...(options.jsLoaders || [])]
      }, ...(options.moduleRules || [])]
    },

    plugins: [...(options.prependPlugins || []), new _webpack2.default.DefinePlugin(_extends({
      'process.env.NODE_ENV': JSON.stringify(env)
    }, production ? {
      'module.hot': false
    } : {})), new _webpack2.default.BannerPlugin({
      raw: true,
      banner: 'require("pobpack-node/source-map-support").install();'
    }), new _webpack2.default.NoEmitOnErrorsPlugin(), hmr && new _webpack2.default.HotModuleReplacementPlugin(), hmr && new _webpack2.default.NamedModulesPlugin(), ...(options.plugins || [])].filter(Boolean)
  };
};
//# sourceMappingURL=createWebpackConfig.js.map