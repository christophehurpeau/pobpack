'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsType = undefined;
var _arguments = arguments;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ConfigPathsType = _tcombForked2.default.interface({
  src: _tcombForked2.default.String,
  build: _tcombForked2.default.String
}, {
  name: 'ConfigPathsType',
  strict: true
});

const OptionsType = exports.OptionsType = _tcombForked2.default.interface({
  env: _tcombForked2.default.maybe(_tcombForked2.default.String),
  hmr: _tcombForked2.default.Boolean,
  babel: _tcombForked2.default.maybe(_tcombForked2.default.Object),
  jsLoaders: _tcombForked2.default.maybe(_tcombForked2.default.list(_tcombForked2.default.Any)),
  moduleRules: _tcombForked2.default.maybe(_tcombForked2.default.list(_tcombForked2.default.Any)),
  prependPlugins: _tcombForked2.default.maybe(_tcombForked2.default.list(_tcombForked2.default.Any)),
  plugins: _tcombForked2.default.maybe(_tcombForked2.default.list(_tcombForked2.default.Any)),
  paths: ConfigPathsType
}, 'OptionsType');

exports.default = function createOptions(options) {
  _assert(options, _tcombForked2.default.Object, 'options');

  return _assert(function () {
    return {
      env: options.env || process.env.NODE_ENV,
      hmr: options.hmr,
      babel: options.babel,
      jsLoaders: options.jsLoaders,
      moduleRules: options.moduleRules,
      plugins: options.plugins,
      prependPlugins: options.prependPlugins,
      paths: _extends({ src: 'src', build: 'build' }, options.paths)
    };
  }.apply(undefined, _arguments), OptionsType, 'return value');
};

function _assert(x, type, name) {
  if (_tcombForked2.default.isType(type) && type.meta.kind !== 'struct') {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail('Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')');
  }

  return x;
}
//# sourceMappingURL=createOptions.js.map