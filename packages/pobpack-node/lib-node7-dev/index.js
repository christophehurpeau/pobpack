'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchAndRun = exports.watchAndRunCompiler = exports.watch = exports.build = exports.createAppCompiler = exports.createCompiler = undefined;

var _child_process = require('child_process');

var _path = require('path');

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

var _friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var _friendlyErrorsWebpackPlugin2 = _interopRequireDefault(_friendlyErrorsWebpackPlugin);

var _springbokjsDaemon = require('springbokjs-daemon');

var _springbokjsDaemon2 = _interopRequireDefault(_springbokjsDaemon);

var _createAppWebpackConfig = require('./createAppWebpackConfig');

var _createAppWebpackConfig2 = _interopRequireDefault(_createAppWebpackConfig);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildThrowOnError = stats => {
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false,
    colors: process.stdout.isTTY
  }));
};

const WebpackWatcherType = _flowRuntime2.default.type('WebpackWatcherType', _flowRuntime2.default.any());

const WatchCallbackType = _flowRuntime2.default.type('WatchCallbackType', _flowRuntime2.default.function(_flowRuntime2.default.param('stats', _flowRuntime2.default.any()), _flowRuntime2.default.return(_flowRuntime2.default.void())));

const CompilerType = _flowRuntime2.default.type('CompilerType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('compiler', _flowRuntime2.default.any()), _flowRuntime2.default.property('webpackConfig', _flowRuntime2.default.object()), _flowRuntime2.default.property('clean', _flowRuntime2.default.function(_flowRuntime2.default.return(_flowRuntime2.default.string()))), _flowRuntime2.default.property('run', _flowRuntime2.default.function(_flowRuntime2.default.return(_flowRuntime2.default.ref('Promise')))), _flowRuntime2.default.property('watch', _flowRuntime2.default.function(_flowRuntime2.default.param('callback', WatchCallbackType), _flowRuntime2.default.return(WebpackWatcherType)))));

const createCompiler = exports.createCompiler = webpackConfig => {
  const _returnType = _flowRuntime2.default.return(CompilerType);

  const compiler = (0, _webpack2.default)(webpackConfig);

  if (process.stdout.isTTY) {
    const bar = new _progress2.default(`${_chalk2.default.yellow.bold('Building node bundle...')} ${_chalk2.default.bold(':percent')} [:bar] → :msg`, { incomplete: ' ', complete: '▇', total: 50, clear: true, stream: process.stdout });
    compiler.apply(new _ProgressPlugin2.default((percentage, msg) => {
      bar.update(percentage, { msg: msg.length > 20 ? `${msg.substr(0, 20)}...` : msg });
    }));
  }

  // human-readable error messages
  compiler.apply(new _friendlyErrorsWebpackPlugin2.default({
    clearConsole: false
  }));

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

const createAppCompiler = exports.createAppCompiler = options => {
  const _returnType2 = _flowRuntime2.default.return(CompilerType);

  return _returnType2.assert(createCompiler((0, _createAppWebpackConfig2.default)(options)));
};

const build = exports.build = (options = {}) => {
  const compiler = createAppCompiler(Object.assign({}, options, { hmr: false }));
  compiler.clean();
  return compiler.run();
};

const watch = exports.watch = (options, callback) => {
  let _callbackType = WatchCallbackType;

  _flowRuntime2.default.param('callback', _callbackType).assert(callback);

  if (typeof options === 'function') {
    callback = _callbackType.assert(options);
    options = undefined;
  }
  const compiler = createAppCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

const RunOptions = _flowRuntime2.default.type('RunOptions', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('displayName', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('args', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.number())))), _flowRuntime2.default.property('cwd', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

const watchAndRunCompiler = exports.watchAndRunCompiler = (compiler, options = {}) => {
  _flowRuntime2.default.param('compiler', CompilerType).assert(compiler);

  _flowRuntime2.default.param('options', RunOptions).assert(options);

  let daemon;
  return compiler.watch(() => {
    if (!daemon) {
      daemon = (0, _springbokjsDaemon2.default)({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [(0, _path.join)(compiler.webpackConfig.output.path), ...(options.args || [])]
      });
      daemon.start();
      process.on('exit', () => daemon.stop());
    } else {
      // already started, send a signal to ask hot reload
      try {
        daemon.sendSIGUSR2();
      } catch (err) {
        daemon.restart();
      }
    }
  });
};

const watchAndRun = exports.watchAndRun = options => {
  const compiler = createAppCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
//# sourceMappingURL=index.js.map