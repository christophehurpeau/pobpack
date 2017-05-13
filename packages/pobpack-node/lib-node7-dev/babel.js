'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelPresetLatestNode = require('babel-preset-latest-node');

var _babelPresetLatestNode2 = _interopRequireDefault(_babelPresetLatestNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  presets: [[_babelPresetLatestNode2.default, {
    target: 'current',
    modules: false,
    useBuiltIns: true
  }]],

  plugins: []
};
//# sourceMappingURL=babel.js.map