'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const path = _interopDefault(require('path'));
const WebpackDevServer = _interopDefault(require('webpack-dev-server'));
const pobpackUtils = require('pobpack-utils');
const errorOverlayMiddleware = _interopDefault(require('react-dev-utils/errorOverlayMiddleware'));
const evalSourceMapMiddleware = _interopDefault(require('react-dev-utils/evalSourceMapMiddleware'));
const noopServiceWorkerMiddleware = _interopDefault(require('react-dev-utils/noopServiceWorkerMiddleware'));
const ignoredFiles = _interopDefault(require('react-dev-utils/ignoredFiles'));
const resolveFrom = _interopDefault(require('resolve-from'));

/* eslint-disable complexity */
const MODERN = 'modern';
const ALL = 'all';
const TARGETS = ["all", "modern"];
const ExcludesFalsy = Boolean;
function createBrowserWebpackConfig(target) {
  const cwd = process.cwd();
  return options => ({
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
      minimize: options.env === 'production',
      ...options.optimization
    },
    // use cache
    cache: options.hmr,
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
      aliases: { ...options.aliases,
        'react-dom': resolveFrom(cwd, '@hot-loader/react-dom')
      },
      babel: {
        presets: [require.resolve('../babel')],
        ...options.babel,
        plugins: [...(options.babel.plugins || []), options.hmr ? resolveFrom(cwd, 'react-hot-loader/dist/babel.development.js') : // removes import { hot } from 'react-hot-loader';
        resolveFrom(cwd, 'react-hot-loader/dist/babel.production.min.js')].filter(ExcludesFalsy)
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
      path: path.resolve(options.paths.build),
      // Point sourcemap entries to original disk location
      // devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
      devtoolModuleFilenameTemplate: options.env === 'production' ? info => path.relative(options.paths.src, info.absoluteResourcePath).replace(/\\/g, '/') : // eslint-disable-next-line unicorn/no-nested-ternary
      options.env === 'development' ? info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/') : undefined
    },
    module: pobpackUtils.createModuleConfig(options),
    plugins: pobpackUtils.createPluginsConfig(options)
  });
}

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
const runDevServer = (compiler, options, srcPath = path.resolve('src')) => {
  const {
    host,
    port,
    https,
    ...webpackDevServerOptions
  } = options;
  const browserDevServer = new WebpackDevServer(compiler.compiler, {
    hot: true,
    // Use 'ws' instead of 'sockjs-node' on server since we're using native
    // websockets in react-scripts `webpackHotDevClient`.
    transportMode: 'ws',
    // Prevent a WS client from getting injected as we're already including
    // react-scripts `webpackHotDevClient`.
    injectClient: false,
    publicPath: '/',
    // use react-scripts ignoredFiles for perf
    watchOptions: {
      ignored: ignoredFiles(srcPath)
    },
    // stats: 'errors-only',
    quiet: true,
    // errors are displayed with friendly-errors plugin
    overlay: false,
    // We use create-react-app-overlay
    compress: true,
    // Enable gzip compression of generated files
    // Silence WebpackDevServer's logs. Still displays errors and warnings
    clientLogLevel: 'none',
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    ...webpackDevServerOptions,

    before(app, server) {
      // https://github.com/facebook/create-react-app/blob/30ee52cf3b2cbb6ac70999c02b1196bcaba8d4ca/packages/react-scripts/config/webpackDevServer.config.js#L99
      // This lets us fetch source contents from webpack for the error overlay
      app.use(evalSourceMapMiddleware(server)); // This lets us open files from the runtime error overlay.

      app.use(errorOverlayMiddleware());
    },

    after(app) {
      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware('/'));
    }

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

exports.ALL = ALL;
exports.MODERN = MODERN;
exports.TARGETS = TARGETS;
exports.build = build;
exports.createAppBrowserCompiler = createAppBrowserCompiler;
exports.runDevServer = runDevServer;
exports.watch = watch;
exports.watchAndRunDevServer = watchAndRunDevServer;
//# sourceMappingURL=index-node10.cjs.js.map
