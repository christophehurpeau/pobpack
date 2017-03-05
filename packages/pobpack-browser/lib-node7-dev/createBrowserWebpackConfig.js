'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TARGETS = exports.ALL = exports.MODERN = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pobpackUtils = require('pobpack-utils');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OptionsType = _flowRuntime2.default.tdz(() => _pobpackUtils.OptionsType);

const BrowserTargetType = _flowRuntime2.default.type('BrowserTargetType', _flowRuntime2.default.union(_flowRuntime2.default.string('modern'), _flowRuntime2.default.string('all')));

const MODERN = exports.MODERN = 'modern';
const ALL = exports.ALL = 'all';
const TARGETS = exports.TARGETS = [ALL, MODERN];

exports.default = function createBrowserWebpackConfig(target) {
  _flowRuntime2.default.param('target', BrowserTargetType).assert(target);

  return options => {
    let _optionsType = _flowRuntime2.default.ref(OptionsType);

    _flowRuntime2.default.param('options', _optionsType).assert(options);

    return {
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
        entries[`${target}/${entry.key}`] = [target !== MODERN && 'babel-regenerator-runtime',
        // options.hmr && 'react-hot-loader/patch',
        _path2.default.join(_path2.default.resolve(options.paths.src), entry.path)].filter(Boolean);
        return entries;
      }, {}),

      output: {
        path: _path2.default.resolve(options.paths.build)
      },

      module: (0, _pobpackUtils.createModuleConfig)(options),

      plugins: (0, _pobpackUtils.createPluginsConfig)(options)
    };
  };
};
//# sourceMappingURL=createBrowserWebpackConfig.js.map