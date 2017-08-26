'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createOptions = require('../createOptions');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prettier/prettier */
const OptionsType = _flowRuntime2.default.tdz(() => _createOptions.OptionsType);

exports.default = function createResolveConfig(modulePrefixPackageFields, options) {
  let _modulePrefixPackageFieldsType = _flowRuntime2.default.array(_flowRuntime2.default.string());

  let _optionsType = _flowRuntime2.default.ref(OptionsType);

  _flowRuntime2.default.param('modulePrefixPackageFields', _modulePrefixPackageFieldsType).assert(modulePrefixPackageFields);

  _flowRuntime2.default.param('options', _optionsType).assert(options);

  return {
    cacheWithContext: false,

    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],

    mainFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:${prefix}-dev`, `module:${prefix}`,
    // old `webpack:` syntax
    options.env !== 'production' && `webpack:${prefix}-dev`, `webpack:${prefix}`])), options.env !== 'production' && 'module-dev', 'module',
    // old webpack: syntax
    options.env !== 'production' && 'webpack:main-dev', 'webpack:main', ...(!modulePrefixPackageFields.includes('browser') ? [] : [
    // Browser builds
    options.env !== 'production' && 'browser-dev', 'browser']), options.env !== 'production' && 'main-dev', 'main'].filter(Boolean),

    aliasFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:aliases-${prefix}-dev`, `module:aliases-${prefix}`,

    // old webpack: syntax
    options.env !== 'production' && `webpack:aliases-${prefix}-dev`, `webpack:aliases-${prefix}`])), options.env !== 'production' && 'module:aliases-dev', 'module:aliases',

    // old webpack: syntax
    options.env !== 'production' && 'webpack:aliases-dev', 'webpack:aliases', 'webpack', modulePrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev', modulePrefixPackageFields.includes('browser') && 'browser'].filter(Boolean)
  };
};
//# sourceMappingURL=createResolveConfig.js.map