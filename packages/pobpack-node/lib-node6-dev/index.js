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

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PobpackCompilerType = _flowRuntime2.default.tdz(() => _pobpackUtils.PobpackCompilerType);

const WatchCallbackType = _flowRuntime2.default.tdz(() => _pobpackUtils.WatchCallbackType);

const createAppNodeCompiler = exports.createAppNodeCompiler = options => {
  const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(PobpackCompilerType));

  return _returnType.assert((0, _pobpackUtils.createPobpackCompiler)('node', (0, _pobpackUtils.createAppWebpackConfig)(_createNodeWebpackConfig2.default)(options)));
};

const build = exports.build = (options = {}) => {
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: false }));
  compiler.clean();
  return compiler.run();
};

const watch = exports.watch = (options, callback) => {
  let _callbackType = _flowRuntime2.default.ref(WatchCallbackType);

  _flowRuntime2.default.param('callback', _callbackType).assert(callback);

  if (typeof options === 'function') {
    callback = _callbackType.assert(options);
    options = undefined;
  }
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

const RunOptions = _flowRuntime2.default.type('RunOptions', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('displayName', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('args', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.number())))), _flowRuntime2.default.property('cwd', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

const watchAndRunCompiler = exports.watchAndRunCompiler = (compiler, options = {}) => {
  let _compilerType = _flowRuntime2.default.ref(PobpackCompilerType);

  _flowRuntime2.default.param('compiler', _compilerType).assert(compiler);

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
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
//# sourceMappingURL=index.js.map