'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PobpackCompilerType = exports.WatchCallbackType = undefined;

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

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildThrowOnError = stats => {
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({}, true));
};

const WebpackWatcherType = _flowRuntime2.default.type('WebpackWatcherType', _flowRuntime2.default.any());

const WatchCallbackType = exports.WatchCallbackType = _flowRuntime2.default.type('WatchCallbackType', _flowRuntime2.default.function(_flowRuntime2.default.param('stats', _flowRuntime2.default.any()), _flowRuntime2.default.return(_flowRuntime2.default.void())));

const PobpackCompilerType = exports.PobpackCompilerType = _flowRuntime2.default.type('PobpackCompilerType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('compiler', _flowRuntime2.default.any()), _flowRuntime2.default.property('webpackConfig', _flowRuntime2.default.object()), _flowRuntime2.default.property('clean', _flowRuntime2.default.function(_flowRuntime2.default.return(_flowRuntime2.default.string()))), _flowRuntime2.default.property('run', _flowRuntime2.default.function(_flowRuntime2.default.return(_flowRuntime2.default.ref('Promise')))), _flowRuntime2.default.property('watch', _flowRuntime2.default.function(_flowRuntime2.default.param('callback', WatchCallbackType), _flowRuntime2.default.return(WebpackWatcherType)))));

const CreateComplierOptionsType = _flowRuntime2.default.type('CreateComplierOptionsType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('progressBar', _flowRuntime2.default.nullable(_flowRuntime2.default.boolean())), _flowRuntime2.default.property('successMessage', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

exports.default = function createPobpackCompiler(bundleName, webpackConfig, { progressBar = true, successMessage } = {}) {
  let _bundleNameType = _flowRuntime2.default.string();

  const _returnType = _flowRuntime2.default.return(PobpackCompilerType);

  _flowRuntime2.default.param('bundleName', _bundleNameType).assert(bundleName);

  if (arguments[2] !== undefined) {
    _flowRuntime2.default.param('arguments[2]', CreateComplierOptionsType).assert(arguments[2]);
  }

  const compiler = (0, _webpack2.default)(Object.assign({}, webpackConfig));

  if (progressBar && process.stdout.isTTY) {
    let bar;
    compiler.apply(new _ProgressPlugin2.default((percentage, msg) => {
      let _percentageType = _flowRuntime2.default.number();

      let _msgType = _flowRuntime2.default.string();

      _flowRuntime2.default.param('percentage', _percentageType).assert(percentage);

      _flowRuntime2.default.param('msg', _msgType).assert(msg);

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

  return _returnType.assert({
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
  });
};
//# sourceMappingURL=createPobpackCompiler.js.map