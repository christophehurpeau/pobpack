'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const fs = require('fs');
const OptionsType = _flowRuntime2.default.tdz(() => _createOptions.OptionsType);

exports.default = function createWebpackConfig(options) {
  let _optionsType = _flowRuntime2.default.ref(OptionsType);

  _flowRuntime2.default.param('options', _optionsType).assert(options);

  options = _optionsType.assert((0, _createOptions2.default)(options));
  const env = options.env;
  const hmr = options.hmr;
  const production = env === 'production';

  const mainBabelOptions = Object.assign({
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

    // __dirname and __filename
    node: {
      __filename: true,
      __dirname: true
    },

    // use cache
    cache: hmr,

    // bundle size is not relevant for node
    performance: {
      hints: false
    },

    resolveLoader: {
      modules: options.resolveLoaderModules || ['node_modules']
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
      // force import to be present
      // strictExportPresence: true,

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
      },

      // other rules
      ...(options.moduleRules || [])]
    },

    plugins: [...(options.prependPlugins || []),

    // enforces the entire path of all required modules match the exact case
    // of the actual path on disk. Using this plugin helps alleviate cases
    // for developers working on case insensitive systems like OSX.
    !production && new _caseSensitivePathsWebpackPlugin2.default(), new _webpack2.default.DefinePlugin(Object.assign({
      'process.env.NODE_ENV': JSON.stringify(env)
    }, production ? {
      'module.hot': false
    } : {})),

    // get right stack traces
    new _webpack2.default.SourceMapDevToolPlugin({
      test: /\.jsx?$/,
      filename: '[name].js.map'
    }), new _webpack2.default.NoEmitOnErrorsPlugin(), hmr && new _webpack2.default.HotModuleReplacementPlugin(), hmr && new _webpack2.default.NamedModulesPlugin(), hmr && new _webpack2.default.BannerPlugin({
      banner: `require("${require.resolve('source-map-support')}").install({ environment: "node" });`,
      raw: true,
      entryOnly: false,
      include: /\.js$/
    }), ...(options.plugins || [])].filter(Boolean)
  };
};
//# sourceMappingURL=createWebpackConfig.js.map