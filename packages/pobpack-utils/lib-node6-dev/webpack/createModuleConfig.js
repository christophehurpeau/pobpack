'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _createOptions = require('../createOptions');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OptionsType = _flowRuntime2.default.tdz(() => _createOptions.OptionsType);

exports.default = function createModuleConfig(options) {
  let _optionsType = _flowRuntime2.default.ref(OptionsType);

  return _flowRuntime2.default.param('options', _optionsType).assert(options), {
    strictExportPresence: true,

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
      include: [(0, _path.resolve)(options.paths.src), ...(options.includeModules || []).map(includeModule => (0, _fs.realpathSync)((0, _path.resolve)('node_modules', includeModule)))],
      loaders: [{
        loader: require.resolve('babel-loader'),
        options: Object.assign({
          babelrc: false,
          cacheDirectory: true
        }, options.babel)
      }, ...(options.jsLoaders || [])]
    },

    // other rules
    ...(options.moduleRules || [])]
  };
};
//# sourceMappingURL=createModuleConfig.js.map