'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _pobpackUtils = require('pobpack-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = options => ({
  // Target node
  target: 'node',

  // get right stack traces
  devtool: 'source-map',

  // don't bundle node_modules dependencies
  externals: (0, _webpackNodeExternals2.default)({
    whitelist: [require.resolve('../hot'), ...options.includeModules.map(module => new RegExp(`^${module}(/|$)`))]
  }),

  // __dirname and __filename
  node: {
    __filename: true,
    __dirname: true
  },

  // use cache
  cache: options.hmr,

  // bundle size is not relevant for node
  performance: {
    hints: false
  },

  resolveLoader: {
    modules: options.resolveLoaderModules || ['node_modules']
  },

  resolve: (0, _pobpackUtils.createResolveConfig)(['node'], Object.assign({}, options, {
    babel: Object.assign({
      presets: [require.resolve('./babel')]
    }, options.babel)
  })),

  entry: options.entries.reduce((entries, entry) => {
    if (typeof entry === 'string') entry = { key: entry, path: entry };
    entries[entry.key] = [options.hmr && require.resolve('../hot'), _path2.default.join(_path2.default.resolve(options.paths.src), entry.path)].filter(Boolean);
    return entries;
  }, {}),

  output: {
    path: _path2.default.resolve(options.paths.build),
    libraryTarget: 'commonjs2'
  },

  module: (0, _pobpackUtils.createModuleConfig)(options),

  plugins: (0, _pobpackUtils.createPluginsConfig)(Object.assign({}, options, {
    plugins: [options.hmr && new _pobpackUtils.webpack.BannerPlugin({
      banner: `require("${require.resolve('./source-map-support')}");`,
      raw: true,
      entryOnly: false,
      include: /\.js$/
    }), ...options.plugins]
  }))
}); // const fs = require('fs');
//# sourceMappingURL=createNodeWebpackConfig.js.map