'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TARGETS = exports.ALL = exports.MODERN = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pobpackUtils = require('pobpack-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MODERN = exports.MODERN = 'modern';
const ALL = exports.ALL = 'all';
const TARGETS = exports.TARGETS = [ALL, MODERN];

exports.default = target => options => ({
  // Target web
  target: 'web',

  // use cache
  cache: options.hmr,

  resolveLoader: {
    modules: options.resolveLoaderModules || ['node_modules']
  },

  resolve: (0, _pobpackUtils.createResolveConfig)([target === MODERN && 'modern-browsers', 'browser'].filter(Boolean), Object.assign({}, options, {
    babel: Object.assign({
      presets: [require.resolve('./babel')]
    }, options.babel)
  })),

  entry: options.entries.reduce((entries, entry) => {
    if (typeof entry === 'string') entry = { key: entry, path: entry };
    entries[entry.key] = [target !== MODERN && 'babel-regenerator-runtime',
    // options.hmr && 'react-hot-loader/patch',
    _path2.default.join(_path2.default.resolve(options.paths.src), entry.path)].filter(Boolean);
    return entries;
  }, {}),

  output: {
    path: _path2.default.resolve(options.paths.build)
  },

  module: (0, _pobpackUtils.createModuleConfig)(options),

  plugins: (0, _pobpackUtils.createPluginsConfig)(options)
});
//# sourceMappingURL=createBrowserWebpackConfig.js.map