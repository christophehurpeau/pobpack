'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _createOptions = require('../createOptions');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OptionsType = _flowRuntime2.default.tdz(() => _createOptions.OptionsType);

exports.default = function createPluginsConfig(options) {
  let _optionsType = _flowRuntime2.default.ref(OptionsType);

  _flowRuntime2.default.param('options', _optionsType).assert(options);

  return [...options.prependPlugins,

  // enforces the entire path of all required modules match the exact case
  // of the actual path on disk. Using this plugin helps alleviate cases
  // for developers working on case insensitive systems like OSX.
  options.env !== 'production' && new _caseSensitivePathsWebpackPlugin2.default(), new _webpack2.default.DefinePlugin(Object.assign({
    'process.env.NODE_ENV': JSON.stringify(options.env)
  }, options.defines)), new _webpack2.default.NoEmitOnErrorsPlugin(), options.hmr && new _webpack2.default.HotModuleReplacementPlugin(), options.hmr && new _webpack2.default.NamedModulesPlugin(), ...options.plugins].filter(Boolean);
};
//# sourceMappingURL=createPluginsConfig.js.map