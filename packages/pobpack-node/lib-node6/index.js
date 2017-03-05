'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watchAndRun = exports.watchAndRunCompiler = exports.watch = exports.build = exports.createAppNodeCompiler = undefined;

var _path = require('path');

var _springbokjsDaemon = require('springbokjs-daemon');

var _springbokjsDaemon2 = _interopRequireDefault(_springbokjsDaemon);

var _pobpackUtils = require('pobpack-utils');

var _createNodeWebpackConfig = require('./createNodeWebpackConfig');

var _createNodeWebpackConfig2 = _interopRequireDefault(_createNodeWebpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createAppNodeCompiler = exports.createAppNodeCompiler = options => (0, _pobpackUtils.createPobpackCompiler)('node', (0, _pobpackUtils.createAppWebpackConfig)(_createNodeWebpackConfig2.default)(options));

const build = exports.build = (options = {}) => {
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: false }));
  compiler.clean();
  return compiler.run();
};

const watch = exports.watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

const watchAndRunCompiler = exports.watchAndRunCompiler = (compiler, options = {}) => {
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
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
//# sourceMappingURL=index.js.map