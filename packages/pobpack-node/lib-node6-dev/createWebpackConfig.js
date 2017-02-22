'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // const fs = require('fs');


var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _createOptions = require('./createOptions');

var _createOptions2 = _interopRequireDefault(_createOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function createWebpackConfig(options) {
  _assert(options, _createOptions.OptionsType, 'options');

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
    // don't bundle node_modules dependencies
    externals: (0, _webpackNodeExternals2.default)({
      whitelist: [require.resolve('../hot')]
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
      mainFields: [!production && 'webpack:node-dev', 'webpack:node', !production && 'webpack:main-dev', 'webpack:main', !production && 'main-dev', 'main'].filter(Boolean),
      aliasFields: [!production && 'webpack:node-aliases-dev', 'webpack:node-aliases', 'webpack'].filter(Boolean)
    },
    entry: {
      index: [hmr && require.resolve('../hot'), _path2.default.join(_path2.default.resolve(options.paths.src), options.paths.entry)].filter(Boolean)
    },
    output: {
      path: _path2.default.resolve(options.paths.build),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },

    module: {
      rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },

      // json
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // jsx?
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, options.paths.build],
        loaders: [{ loader: 'babel-loader', options: mainBabelOptions }, ...(options.jsLoaders || [])]
      }, ...(options.moduleRules || [])]
    },

    plugins: [...(options.prependPlugins || []),

    // enforces the entire path of all required modules match the exact case
    // of the actual path on disk. Using this plugin helps alleviate cases
    // for developers working on case insensitive systems like OSX.
    !production && new _caseSensitivePathsWebpackPlugin2.default(), new _webpack2.default.DefinePlugin(_extends({
      'process.env.NODE_ENV': JSON.stringify(env)
    }, production ? {
      'module.hot': false
    } : {})),

    // get right stack traces
    new _webpack2.default.SourceMapDevToolPlugin({
      test: /\.jsx?$/,
      filename: '[name].js.map'
    }), new _webpack2.default.NoEmitOnErrorsPlugin(), hmr && new _webpack2.default.HotModuleReplacementPlugin(), hmr && new _webpack2.default.NamedModulesPlugin(), hmr && new _webpack2.default.BannerPlugin({
      banner: 'require("pobpack-node/source-map-support").install({ environment: "node" });',
      raw: true,
      entryOnly: false,
      include: /\.js$/
    }), ...(options.plugins || [])].filter(Boolean)
  };
};

function _assert(x, type, name) {
  if (_tcombForked2.default.isType(type) && type.meta.kind !== 'struct') {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail('Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')');
  }

  return x;
}
//# sourceMappingURL=createWebpackConfig.js.map