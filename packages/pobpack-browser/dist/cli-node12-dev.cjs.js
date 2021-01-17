'use strict';

const path = require('path');
const pobpackUtils = require('pobpack-utils');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const WebpackDevServer = require('webpack-dev-server');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const path__default = /*#__PURE__*/_interopDefaultLegacy(path);
const errorOverlayMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(errorOverlayMiddleware);
const evalSourceMapMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(evalSourceMapMiddleware);
const ignoredFiles__default = /*#__PURE__*/_interopDefaultLegacy(ignoredFiles);
const noopServiceWorkerMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(noopServiceWorkerMiddleware);
const WebpackDevServer__default = /*#__PURE__*/_interopDefaultLegacy(WebpackDevServer);
const ReactRefreshWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ReactRefreshWebpackPlugin);
const webpack__default = /*#__PURE__*/_interopDefaultLegacy(webpack);
const WorkboxWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(WorkboxWebpackPlugin);

/* eslint-disable complexity */
const MODERN = 'modern';
const TARGETS = ["all", "modern"];
const ExcludesFalsy = Boolean;

const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');

function createBrowserWebpackConfig(target) {
  return options => ({
    // production or development
    mode: options.env === 'production' ? 'production' : 'development',
    // Don't attempt to continue if there are any errors.
    bail: options.env === 'production',
    // Target web
    target: target === MODERN ? 'web' : ['web', 'es5'],
    // get right stack traces
    devtool: options.env === 'production' ? 'nosources-source-map' : 'source-map',
    optimization: {
      emitOnErrors: false,
      minimize: options.env === 'production',
      ...options.optimization
    },
    // use cache
    cache: options.hmr,
    resolveLoader: {
      modules: options.resolveLoaderModules || ['node_modules']
    },
    resolve: pobpackUtils.createResolveConfig([target === MODERN ? 'modern-browsers' : undefined, 'browser'].filter(ExcludesFalsy), { ...options,
      babel: {
        presets: [require.resolve('../babel')],
        ...options.babel,
        plugins: [...(options.babel.plugins || []), options.hmr && require.resolve('react-refresh/babel')].filter(ExcludesFalsy)
      }
    }),
    entry: options.entries.reduce((entries, entry) => {
      if (typeof entry === 'string') entry = {
        key: entry,
        path: entry
      };
      entries[entry.key] = [// options.env !== 'production' && require.resolve('../source-map-support'),
      target !== MODERN && require.resolve('regenerator-runtime/runtime'), options.hmr && webpackDevClientEntry, path__default.join(path__default.resolve(options.paths.src), entry.path)].filter(ExcludesFalsy);
      return entries;
    }, {}),
    output: {
      path: path__default.resolve(options.paths.build),
      // Point sourcemap entries to original disk location
      // devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',
      devtoolModuleFilenameTemplate: options.env === 'production' ? info => path__default.relative(options.paths.src, // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      info.absoluteResourcePath).replace(/\\/g, '/') : // eslint-disable-next-line unicorn/no-nested-ternary
      options.env === 'development' ? info => // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      path__default.resolve(info.absoluteResourcePath).replace(/\\/g, '/') : undefined
    },
    module: pobpackUtils.createModuleConfig(options),
    plugins: [...pobpackUtils.createPluginsConfig(options), new webpack__default.ProvidePlugin({
      process: 'process/browser'
    }), options.hmr && new ReactRefreshWebpackPlugin__default({
      overlay: {
        // Create React App overlay config
        entry: webpackDevClientEntry,
        module: require.resolve('react-dev-utils/refreshOverlayInterop'),
        sockIntegration: false
      }
    }), options.env === 'production' && options.paths.src && options.serviceWorkerEntry ? new WorkboxWebpackPlugin__default.InjectManifest({
      swSrc: path__default.resolve(options.paths.src, options.serviceWorkerEntry.endsWith('.js') || options.serviceWorkerEntry.endsWith('.ts') ? options.serviceWorkerEntry : `${options.serviceWorkerEntry}${options.typescript ? '.ts' : '.js'}`),
      compileSrc: true,
      dontCacheBustURLsMatching: /\.[\da-f]{8}\./,
      exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/]
    }) : undefined].filter(ExcludesFalsy)
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
const runDevServer = (compiler, options, srcPath = path__default.resolve('src')) => {
  const {
    host,
    port,
    https,
    ...webpackDevServerOptions
  } = options;
  const browserDevServer = new WebpackDevServer__default(compiler.compiler, {
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
      ignored: ignoredFiles__default(srcPath)
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
      app.use(evalSourceMapMiddleware__default(server)); // This lets us open files from the runtime error overlay.

      app.use(errorOverlayMiddleware__default());
    },

    after(app) {
      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware__default('/'));
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

/* eslint-disable unicorn/no-process-exit */
const cmd = process.argv[2];

if (cmd === 'build') {
  build();
} else if (cmd === 'start' || !cmd) {
  watchAndRunDevServer({}, {
    port: Number(process.env.PORT) || 8080,
    https: false
  });
} else {
  console.log(`Invalid command: ${cmd}`);
  process.exit(1);
}
//# sourceMappingURL=cli-node12-dev.cjs.js.map
