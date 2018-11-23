'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var WebpackDevServer = _interopDefault(require('webpack-dev-server'));
var path = _interopDefault(require('path'));
var pobpackUtils = require('pobpack-utils');

const MODERN = 'modern';
const ALL = 'all';
const TARGETS = ["all", "modern"];
const ExcludesFalsy = Boolean;
var createBrowserWebpackConfig = (target => options => ({
  // production or development
  mode: options.env === 'production' ? 'production' : 'development',
  // Don't attempt to continue if there are any errors.
  bail: options.env === 'production',
  // Target web
  target: 'web',
  // get right stack traces
  devtool: options.env === 'production' ? 'nosources-source-map' : 'source-map',
  optimization: {
    noEmitOnErrors: true,
    minimize: options.env === 'production'
  },
  // use cache
  cache: options.hmr,
  devServer: {
    // don't watch node_modules (improve cpu and memory usage)
    watchOptions: {
      ignored: /node_modules/
    }
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // fs and module are used by source-map-support
  node: {
    fs: 'empty',
    module: 'empty'
  },
  resolveLoader: {
    modules: options.resolveLoaderModules || ['node_modules']
  },
  resolve: pobpackUtils.createResolveConfig([target === MODERN ? 'modern-browsers' : undefined, 'browser'].filter(ExcludesFalsy), { ...options,
    babel: {
      presets: [require.resolve('../babel')],
      ...options.babel,
      plugins: [options.hmr && require.resolve('react-hot-loader/babel'), ...(options.babel.plugins || [])].filter(ExcludesFalsy)
    }
  }),
  entry: options.entries.reduce((entries, entry) => {
    if (typeof entry === 'string') entry = {
      key: entry,
      path: entry
    };
    entries[entry.key] = [// options.env !== 'production' && require.resolve('../source-map-support'),
    target !== MODERN && require.resolve('regenerator-runtime/runtime'), options.hmr && require.resolve('react-hot-loader/patch'), options.hmr && require.resolve('react-dev-utils/webpackHotDevClient'), path.join(path.resolve(options.paths.src), entry.path)].filter(ExcludesFalsy);
    return entries;
  }, {}),
  output: {
    path: path.resolve(options.paths.build) // devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',

  },
  module: pobpackUtils.createModuleConfig(options),
  plugins: pobpackUtils.createPluginsConfig(options)
}));

const createAppBrowserCompiler = (target, options, compilerOptions) => pobpackUtils.createPobpackCompiler(target, pobpackUtils.createAppWebpackConfig(createBrowserWebpackConfig(target))({
  entries: [{
    key: target,
    path: 'index'
  }],
  // override default entry
  ...options,
  paths: {
    build: 'public',
    ...options.paths
  }
}), compilerOptions);
const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compilers = TARGETS.map(t => createAppBrowserCompiler(t, { ...options,
    hmr: false
  }));
  compilers[0].clean();
  return compilers.map(compiler => compiler.run());
};
const watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const compiler = createAppBrowserCompiler(MODERN, { ...options,
    hmr: true
  });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};
const runDevServer = (compiler, options) => {
  const {
    host,
    port,
    https,
    ...webpackDevServerOptions
  } = options;
  const browserDevServer = new WebpackDevServer(compiler.compiler, {
    hot: true,
    // stats: 'errors-only',
    quiet: true,
    // errors are displayed with friendly-errors plugin
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    overlay: true,
    ...webpackDevServerOptions
  });
  browserDevServer.listen(port, host); // note: host can be undefined, but types does not support it

  return browserDevServer;
};
const watchAndRunDevServer = (options, runOptions) => {
  const url = `http${runOptions.https ? 's' : ''}://localhost:${runOptions.port}`;
  const compiler = createAppBrowserCompiler(MODERN, { ...options,
    hmr: true
  }, {
    successMessage: `Your application is running here: ${url}`
  });
  compiler.clean();
  const webpackDevServer = runDevServer(compiler, runOptions);
  return { ...compiler,
    webpackDevServer
  };
};

exports.TARGETS = TARGETS;
exports.ALL = ALL;
exports.MODERN = MODERN;
exports.createAppBrowserCompiler = createAppBrowserCompiler;
exports.build = build;
exports.watch = watch;
exports.runDevServer = runDevServer;
exports.watchAndRunDevServer = watchAndRunDevServer;
//# sourceMappingURL=index-node10-dev.cjs.js.map
