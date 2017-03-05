'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _promiseCallbackFactory = require('promise-callback-factory');

var _promiseCallbackFactory2 = _interopRequireDefault(_promiseCallbackFactory);

var _progress = require('progress');

var _progress2 = _interopRequireDefault(_progress);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _ProgressPlugin = require('webpack/lib/ProgressPlugin');

var _ProgressPlugin2 = _interopRequireDefault(_ProgressPlugin);

var _FriendlyErrorsWebpackPlugin = require('./FriendlyErrorsWebpackPlugin');

var _FriendlyErrorsWebpackPlugin2 = _interopRequireDefault(_FriendlyErrorsWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildThrowOnError = stats => {
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({}, true));
};

exports.default = (bundleName, webpackConfig, { progressBar = true, successMessage } = {}) => {
  const compiler = (0, _webpack2.default)(Object.assign({}, webpackConfig));

  if (progressBar && process.stdout.isTTY) {
    let bar;
    compiler.apply(new _ProgressPlugin2.default((percentage, msg) => {
      if (percentage === 0) {
        bar = new _progress2.default(`${_chalk2.default.yellow.bold(`Building ${bundleName} bundle...`)} ${_chalk2.default.bold(':percent')} [:bar] → :msg`, { incomplete: ' ', complete: '▇', total: 50, clear: true, stream: process.stdout });
        // } else if (percentage === 1) {
        //   // bar.clear();
        //   bar = null;
      } else {
        bar.update(percentage, { msg: msg.length > 20 ? `${msg.substr(0, 20)}...` : msg });
      }
    }));
  }

  // human-readable error messages
  compiler.apply(new _FriendlyErrorsWebpackPlugin2.default({ bundleName, successMessage }));

  return {
    compiler,
    webpackConfig,
    clean: () => webpackConfig.output.path && (0, _child_process.execSync)(`rm -Rf ${webpackConfig.output.path}`),
    run: () => (0, _promiseCallbackFactory2.default)(done => compiler.run(done)).then(buildThrowOnError),
    watch: callback => compiler.watch({}, (err, stats) => {
      if (err) return;
      if (stats.hasErrors()) return;
      buildThrowOnError(stats);
      callback(stats);
    })
  };
};
//# sourceMappingURL=createPobpackCompiler.js.map