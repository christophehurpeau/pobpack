'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createOptions = require('../createOptions');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OptionsType = _flowRuntime2.default.tdz(() => _createOptions.OptionsType);

exports.default = function createResolveConfig(webpackPrefixPackageFields, options) {
  let _webpackPrefixPackageFieldsType = _flowRuntime2.default.array(_flowRuntime2.default.string());

  let _optionsType = _flowRuntime2.default.ref(OptionsType);

  _flowRuntime2.default.param('webpackPrefixPackageFields', _webpackPrefixPackageFieldsType).assert(webpackPrefixPackageFields);

  _flowRuntime2.default.param('options', _optionsType).assert(options);

  return {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],

    mainFields: [...[].concat(...webpackPrefixPackageFields.map(prefix => [options.env !== 'production' && `webpack:${prefix}-dev`, `webpack:${prefix}`])), options.env !== 'production' && 'webpack:main-dev', 'webpack:main', ...(!webpackPrefixPackageFields.includes('browser') ? [] : [options.env !== 'production' && 'module-dev', 'module', options.env !== 'production' && 'browser-dev', 'browser']), options.env !== 'production' && 'main-dev', 'main'].filter(Boolean),

    aliasFields: [...[].concat(...webpackPrefixPackageFields.map(prefix => [options.env !== 'production' && `webpack:aliases-${prefix}-dev`, `webpack:aliases-${prefix}`])), options.env !== 'production' && 'webpack:aliases-dev', 'webpack:aliases', 'webpack', webpackPrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev', webpackPrefixPackageFields.includes('browser') && 'browser'].filter(Boolean)
  };
};
//# sourceMappingURL=createResolveConfig.js.map