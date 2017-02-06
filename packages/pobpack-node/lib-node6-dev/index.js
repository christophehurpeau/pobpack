'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchAndRun = exports.watchAndRunCompiler = exports.watch = exports.build = exports.createAppCompiler = exports.createCompiler = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _child_process = require('child_process');

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _path = require('path');

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

const createCompiler = exports.createCompiler = webpackConfig => {
  const compiler = (0, _webpack2.default)(webpackConfig);

  if (process.stdout.isTTY) {
    const bar = new _progress2.default('Building node bundle... :percent [:bar]', { incomplete: ' ', total: 60, width: 50, clear: true, stream: process.stdout });
    compiler.apply(new _ProgressPlugin2.default((percentage, msg) => {
      if (percentage === 1) {
        _readline2.default.clearLine(process.stdout);
        _readline2.default.cursorTo(process.stdout, 0);
      } else {
        bar.update(percentage, { msg });
      }
    }));
    // human-readable error messages
    compiler.apply(new _friendlyErrorsWebpackPlugin2.default({
      clearConsole: false
    }));
  }

  return {
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

const createAppCompiler = exports.createAppCompiler = options => createCompiler((0, _createAppWebpackConfig2.default)(options));

const build = exports.build = (options = {}) => {
  const compiler = createAppCompiler(_extends({}, options, { hmr: false }));
  compiler.clean();
  return compiler.run();
};

const watch = exports.watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createAppCompiler(_extends({}, options, { hmr: true }));
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

const watchAndRunCompiler = exports.watchAndRunCompiler = (compiler, options = {}) => {
  let daemon;
  compiler.watch(() => {
    if (!daemon) {
      daemon = (0, _springbokjsDaemon2.default)({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        args: [(0, _path.join)(compiler.webpackConfig.output.path)],
        autorestart: true
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
  const compiler = createAppCompiler(_extends({}, options, { hmr: true }));
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
//# sourceMappingURL=index.js.map