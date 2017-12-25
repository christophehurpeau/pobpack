'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsType = undefined;

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable flowtype/no-weak-types */

const ConfigPathsType = _flowRuntime2.default.type('ConfigPathsType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('src', _flowRuntime2.default.string(), true), _flowRuntime2.default.property('build', _flowRuntime2.default.string(), true)));

const ConfigEntryType = _flowRuntime2.default.type('ConfigEntryType', _flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.exactObject(_flowRuntime2.default.property('key', _flowRuntime2.default.string()), _flowRuntime2.default.property('path', _flowRuntime2.default.string()))));

const BabelConfigType = _flowRuntime2.default.type('BabelConfigType', _flowRuntime2.default.object());

const OptionsType = exports.OptionsType = _flowRuntime2.default.type('OptionsType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('env', _flowRuntime2.default.nullable(_flowRuntime2.default.string()), true), _flowRuntime2.default.property('hmr', _flowRuntime2.default.boolean(), true), _flowRuntime2.default.property('resolveLoaderModules', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.string())), true), _flowRuntime2.default.property('webpackPrefixPackageFields', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.string())), true), _flowRuntime2.default.property('babel', _flowRuntime2.default.nullable(BabelConfigType), true), _flowRuntime2.default.property('jsLoaders', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any())), true), _flowRuntime2.default.property('moduleRules', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any())), true), _flowRuntime2.default.property('prependPlugins', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any())), true), _flowRuntime2.default.property('plugins', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any())), true), _flowRuntime2.default.property('paths', _flowRuntime2.default.nullable(ConfigPathsType), true), _flowRuntime2.default.property('entries', _flowRuntime2.default.nullable(_flowRuntime2.default.array(ConfigEntryType)), true), _flowRuntime2.default.property('includeModules', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.string())), true), _flowRuntime2.default.property('includePaths', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.string())), true), _flowRuntime2.default.property('defines', _flowRuntime2.default.nullable(_flowRuntime2.default.object(_flowRuntime2.default.indexer('key', _flowRuntime2.default.string(), _flowRuntime2.default.any()))), true), _flowRuntime2.default.property('aliases', _flowRuntime2.default.nullable(_flowRuntime2.default.object(_flowRuntime2.default.indexer('key', _flowRuntime2.default.string(), _flowRuntime2.default.any()))), true)));

exports.default = function createOptions(options) {
  let _optionsType = _flowRuntime2.default.object();

  const _returnType = _flowRuntime2.default.return(OptionsType);

  _flowRuntime2.default.param('options', _optionsType).assert(options);

  return _returnType.assert({
    env: options.env || process.env.NODE_ENV,
    hmr: options.hmr,
    resolveLoaderModules: options.resolveLoaderModules,
    webpackPrefixPackageFields: options.webpackPrefixPackageFields || [],
    babel: options.babel,
    jsLoaders: options.jsLoaders,
    moduleRules: options.moduleRules,
    plugins: options.plugins || [],
    prependPlugins: options.prependPlugins || [],
    paths: Object.assign({ src: 'src', build: 'build' }, options.paths),
    entries: options.entries || ['index'],
    includeModules: options.includeModules || [],
    includePaths: options.includePaths || [],
    defines: options.defines || {},
    aliases: options.aliases || {}
  });
};
//# sourceMappingURL=createOptions.js.map