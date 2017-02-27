'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsType = undefined;

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ConfigPathsType = _flowRuntime2.default.type('ConfigPathsType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('src', _flowRuntime2.default.string()), _flowRuntime2.default.property('build', _flowRuntime2.default.string()), _flowRuntime2.default.property('entry', _flowRuntime2.default.string())));

const OptionsType = exports.OptionsType = _flowRuntime2.default.type('OptionsType', _flowRuntime2.default.object(_flowRuntime2.default.property('env', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('hmr', _flowRuntime2.default.boolean()), _flowRuntime2.default.property('resolveLoaderModules', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.string()))), _flowRuntime2.default.property('babel', _flowRuntime2.default.nullable(_flowRuntime2.default.object())), _flowRuntime2.default.property('jsLoaders', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any()))), _flowRuntime2.default.property('moduleRules', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any()))), _flowRuntime2.default.property('prependPlugins', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any()))), _flowRuntime2.default.property('plugins', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.any()))), _flowRuntime2.default.property('paths', ConfigPathsType)));

exports.default = function createOptions(options) {
  let _optionsType = _flowRuntime2.default.object();

  const _returnType = _flowRuntime2.default.return(OptionsType);

  _flowRuntime2.default.param('options', _optionsType).assert(options);

  return _returnType.assert({
    env: options.env || process.env.NODE_ENV,
    hmr: options.hmr,
    resolveLoaderModules: options.resolveLoaderModules,
    babel: options.babel,
    jsLoaders: options.jsLoaders,
    moduleRules: options.moduleRules,
    plugins: options.plugins,
    prependPlugins: options.prependPlugins,
    paths: Object.assign({ src: 'src', build: 'build', entry: 'index.js' }, options.paths)
  });
};
//# sourceMappingURL=createOptions.js.map