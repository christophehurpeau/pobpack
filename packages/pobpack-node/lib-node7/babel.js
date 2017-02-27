'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelPresetEnv = require('babel-preset-env');

var _babelPresetEnv2 = _interopRequireDefault(_babelPresetEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  presets: [[_babelPresetEnv2.default, {
    targets: { node: 'current' },
    modules: false,
    useBuiltIns: true
  }]],

  plugins: []
};
//# sourceMappingURL=babel.js.map