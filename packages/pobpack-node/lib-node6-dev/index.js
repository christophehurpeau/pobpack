'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.build = exports.createCompiler = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _child_process = require('child_process');

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

var _createAppWebpackConfig = require('./createAppWebpackConfig');

var _createAppWebpackConfig2 = _interopRequireDefault(_createAppWebpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const builtRejectOnError = stats => {
  if (stats.hasErrors()) {
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
      colors: true
    }));
  }

  return stats;
};

const createCompiler = exports.createCompiler = options => {
  const webpackConfig = (0, _createAppWebpackConfig2.default)(_extends({
    env: process.env.NODE_ENV
  }, options));

  const compiler = (0, _webpack2.default)(webpackConfig);

  if (process.stdout.isTTY) {
    const bar = new _progress2.default('Building server bundle... :percent [:bar]', { incomplete: ' ', total: 60, width: 50, clear: true, stream: process.stdout });
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
    clean: () => webpackConfig.output.path && (0, _child_process.execSync)(`rm -Rf ${webpackConfig.output.path}`),
    run: () => (0, _promiseCallbackFactory2.default)(done => compiler.run(done)).then(builtRejectOnError),
    watch: callback => compiler.watch({}, (err, stats) => {
      if (err) return;
      builtRejectOnError(stats);
      callback(stats);
    })
  };
};

const build = exports.build = options => {
  const compiler = createCompiler(_extends({}, options, { hmr: false }));
  compiler.clean();
  return compiler.run();
};

const watch = exports.watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createCompiler(_extends({}, options, { hmr: true }));
  compiler.clean();
  compiler.watch(callback);
};
//# sourceMappingURL=index.js.map