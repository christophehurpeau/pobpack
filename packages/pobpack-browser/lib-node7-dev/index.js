'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchAndRunDevServer = exports.runDevServer = exports.watch = exports.build = exports.createAppBrowserCompiler = exports.MODERN = exports.ALL = exports.TARGETS = undefined;

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _pobpackUtils = require('pobpack-utils');

var _createBrowserWebpackConfig = require('./createBrowserWebpackConfig');

var _createBrowserWebpackConfig2 = _interopRequireDefault(_createBrowserWebpackConfig);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const OptionsType = _flowRuntime2.default.tdz(() => _pobpackUtils.OptionsType);

const PobpackCompilerType = _flowRuntime2.default.tdz(() => _pobpackUtils.PobpackCompilerType);

const WatchCallbackType = _flowRuntime2.default.tdz(() => _pobpackUtils.WatchCallbackType);

exports.TARGETS = _createBrowserWebpackConfig.TARGETS;
exports.ALL = _createBrowserWebpackConfig.ALL;
exports.MODERN = _createBrowserWebpackConfig.MODERN;
const createAppBrowserCompiler = exports.createAppBrowserCompiler = (target, options, compilerOptions) => {
  let _targetType = _flowRuntime2.default.string();

  let _optionsType = _flowRuntime2.default.ref(OptionsType);

  const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(PobpackCompilerType));

  _flowRuntime2.default.param('target', _targetType).assert(target);

  _flowRuntime2.default.param('options', _optionsType).assert(options);

  return _returnType.assert((0, _pobpackUtils.createPobpackCompiler)(target, (0, _pobpackUtils.createAppWebpackConfig)((0, _createBrowserWebpackConfig2.default)(target))(Object.assign({}, options, {
    paths: Object.assign({ build: 'public' }, options.paths)
  })), compilerOptions));
};

const build = exports.build = (options = {}) => {
  const compilers = _createBrowserWebpackConfig.TARGETS.map(t => createAppBrowserCompiler(t, Object.assign({}, options, { hmr: false })));
  compilers[0].clean();
  return compilers.map(compiler => compiler.run());
};

const watch = exports.watch = (options, callback) => {
  let _callbackType = _flowRuntime2.default.ref(WatchCallbackType);

  _flowRuntime2.default.param('callback', _callbackType).assert(callback);

  if (typeof options === 'function') {
    callback = _callbackType.assert(options);
    options = undefined;
  }
  const compiler = createAppBrowserCompiler(_createBrowserWebpackConfig.MODERN, Object.assign({}, options, { hmr: true }));
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

const RunOptions = _flowRuntime2.default.type('RunOptions', _flowRuntime2.default.object(_flowRuntime2.default.property('port', _flowRuntime2.default.number())));

const runDevServer = (compiler, options) => {
  let _compilerType = _flowRuntime2.default.ref(PobpackCompilerType);

  _flowRuntime2.default.param('compiler', _compilerType).assert(compiler);

  _flowRuntime2.default.param('options', RunOptions).assert(options);

  const { port, https } = options,
        webpackDevServerOptions = _objectWithoutProperties(options, ['port', 'https']);
  const browserDevServer = new _webpackDevServer2.default(compiler.compiler, Object.assign({
    hot: true,
    // stats: 'errors-only',
    quiet: false, // errors are displayed with friendly-errors plugin
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    overlay: true
  }, webpackDevServerOptions));
  browserDevServer.listen(port);
  return browserDevServer;
};

exports.runDevServer = runDevServer;
const watchAndRunDevServer = exports.watchAndRunDevServer = (options, runOptions) => {
  let _optionsType3 = _flowRuntime2.default.ref(OptionsType);

  _flowRuntime2.default.param('options', _optionsType3).assert(options);

  _flowRuntime2.default.param('runOptions', RunOptions).assert(runOptions);

  const url = `http${runOptions.https ? 's' : ''}://localhost:${runOptions.port}`;
  const compiler = createAppBrowserCompiler(_createBrowserWebpackConfig.MODERN, Object.assign({}, options, { hmr: true }), {
    successMessage: `Your application is running here: ${url}`
  });
  compiler.clean();
  const webpackDevServer = runDevServer(compiler, runOptions);
  return Object.assign({}, compiler, { webpackDevServer });
};
//# sourceMappingURL=index.js.map