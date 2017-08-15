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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.TARGETS = _createBrowserWebpackConfig.TARGETS;
exports.ALL = _createBrowserWebpackConfig.ALL;
exports.MODERN = _createBrowserWebpackConfig.MODERN;
const createAppBrowserCompiler = exports.createAppBrowserCompiler = (target, options, compilerOptions) => (0, _pobpackUtils.createPobpackCompiler)(target, (0, _pobpackUtils.createAppWebpackConfig)((0, _createBrowserWebpackConfig2.default)(target))({
  ...options,
  paths: { build: 'public', ...options.paths }
}), compilerOptions);

const build = exports.build = (options = {}) => {
  const compilers = _createBrowserWebpackConfig.TARGETS.map(t => createAppBrowserCompiler(t, { ...options, hmr: false }));
  compilers[0].clean();
  return compilers.map(compiler => compiler.run());
};

const watch = exports.watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createAppBrowserCompiler(_createBrowserWebpackConfig.MODERN, { ...options, hmr: true });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

const runDevServer = exports.runDevServer = (compiler, options) => {
  const { port, https, ...webpackDevServerOptions } = options;
  const browserDevServer = new _webpackDevServer2.default(compiler.compiler, {
    hot: true,
    // stats: 'errors-only',
    quiet: true, // errors are displayed with friendly-errors plugin
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    overlay: true,
    ...webpackDevServerOptions
  });
  browserDevServer.listen(port);
  return browserDevServer;
};

const watchAndRunDevServer = exports.watchAndRunDevServer = (options, runOptions) => {
  const url = `http${runOptions.https ? 's' : ''}://localhost:${runOptions.port}`;
  const compiler = createAppBrowserCompiler(_createBrowserWebpackConfig.MODERN, { ...options, hmr: true }, {
    successMessage: `Your application is running here: ${url}`
  });
  compiler.clean();
  const webpackDevServer = runDevServer(compiler, runOptions);
  return { ...compiler, webpackDevServer };
};
//# sourceMappingURL=index.js.map