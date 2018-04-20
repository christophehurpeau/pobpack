'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var path__default = _interopDefault(path);
var nodeExternals = _interopDefault(require('webpack-node-externals'));
var pobpackUtils = require('pobpack-utils');
var t = _interopDefault(require('flow-runtime'));
var createDaemon = _interopDefault(require('springbokjs-daemon'));

// const fs = require('fs');
const OptionsType = t.tdz(() => pobpackUtils.OptionsType);
var createNodeWebpackConfig = (options => {
  let _optionsType = t.ref(OptionsType);

  t.param('options', _optionsType).assert(options);
  return {
    // production or development
    mode: options.env === 'production' ? 'production' : 'development',

    // Don't attempt to continue if there are any errors.
    bail: options.env === 'production',

    // Target node
    target: 'node',

    // get right stack traces
    devtool: 'source-map',

    optimization: {
      noEmitOnErrors: true,
      minimize: false
    },

    // don't bundle node_modules dependencies
    externals: nodeExternals({
      importType: 'commonjs',
      modulesFromFile: false,
      whitelist: [require.resolve('../hot'), ...options.includeModules.map(module => new RegExp(`^${module}(/|$)`))]
    }),

    // __dirname and __filename
    node: {
      __filename: true,
      __dirname: true
    },

    // use cache
    cache: options.hmr,

    // bundle size is not relevant for node
    performance: {
      hints: false
    },

    resolveLoader: {
      modules: options.resolveLoaderModules || ['node_modules']
    },

    resolve: pobpackUtils.createResolveConfig(['node'], Object.assign({}, options, {
      babel: Object.assign({
        presets: [require.resolve('../babel')]
      }, options.babel)
    })),

    entry: options.entries.reduce((entries, entry) => {
      if (typeof entry === 'string') entry = { key: entry, path: entry };
      entries[entry.key] = [options.hmr && require.resolve('../hot'), path__default.join(path__default.resolve(options.paths.src), entry.path)].filter(Boolean);
      return entries;
    }, {}),

    output: {
      path: path__default.resolve(options.paths.build),
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },

    module: pobpackUtils.createModuleConfig(options),

    plugins: pobpackUtils.createPluginsConfig(Object.assign({}, options, {
      plugins: [options.hmr && new pobpackUtils.webpack.BannerPlugin({
        banner: `require("${require.resolve('../source-map-support')}");`,
        raw: true,
        entryOnly: false,
        include: /\.js$/
      }), ...options.plugins]
    }))
  };
});

const PobpackCompilerType = t.tdz(() => pobpackUtils.PobpackCompilerType);
const WatchCallbackType = t.tdz(() => pobpackUtils.WatchCallbackType);
const createAppNodeCompiler = options => {
  const _returnType = t.return(t.ref(PobpackCompilerType));

  return _returnType.assert(pobpackUtils.createPobpackCompiler('node', pobpackUtils.createAppWebpackConfig(createNodeWebpackConfig)(options)));
};

const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: false }));
  compiler.clean();
  return compiler.run();
};

const watch = (options, callback) => {
  let _callbackType = t.ref(WatchCallbackType);

  t.param('callback', _callbackType).assert(callback);

  if (typeof options === 'function') {
    callback = _callbackType.assert(options);
    options = undefined;
  }
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

const RunOptionsType = t.type('RunOptionsType', t.exactObject(t.property('args', t.nullable(t.array(t.union(t.string(), t.number()))), true), t.property('cwd', t.nullable(t.string()), true), t.property('displayName', t.nullable(t.string()), true), t.property('key', t.nullable(t.string()), true)));


const watchAndRunCompiler = (compiler, options = {}) => {
  let _compilerType = t.ref(PobpackCompilerType);

  t.param('compiler', _compilerType).assert(compiler);
  t.param('options', RunOptionsType).assert(options);

  let daemon;
  return compiler.watch(() => {
    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [path.join(compiler.webpackConfig.output.path), ...(options.args || [])]
        // autoRestart: true,
      });
      daemon.start();
      process.on('exit', () => daemon.stop());
    } else if (daemon.hasExited()) {
      daemon.start();
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

const watchAndRun = options => {
  const compiler = createAppNodeCompiler(Object.assign({}, options, { hmr: true }));
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};

exports.createAppNodeCompiler = createAppNodeCompiler;
exports.build = build;
exports.watch = watch;
exports.watchAndRunCompiler = watchAndRunCompiler;
exports.watchAndRun = watchAndRun;
//# sourceMappingURL=index-node6-dev.cjs.js.map
