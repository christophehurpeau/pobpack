'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var WebpackDevServer = _interopDefault(require('webpack-dev-server'));
var path = _interopDefault(require('path'));
var pobpackUtils = require('pobpack-utils');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const MODERN = 'modern';
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
  resolve: pobpackUtils.createResolveConfig([target === MODERN ? 'modern-browsers' : undefined, 'browser'].filter(ExcludesFalsy), Object.assign({}, options, {
    babel: Object.assign({
      presets: [require.resolve('../babel')]
    }, options.babel, {
      plugins: [options.hmr && require.resolve('react-hot-loader/babel'), ...(options.babel.plugins || [])].filter(ExcludesFalsy)
    })
  })),
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

const createAppBrowserCompiler = (target, options, compilerOptions) => pobpackUtils.createPobpackCompiler(target, pobpackUtils.createAppWebpackConfig(createBrowserWebpackConfig(target))(Object.assign({
  entries: [{
    key: target,
    path: 'index'
  }]
}, options, {
  paths: Object.assign({
    build: 'public'
  }, options.paths)
})), compilerOptions);
const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compilers = TARGETS.map(t => createAppBrowserCompiler(t, Object.assign({}, options, {
    hmr: false
  })));
  compilers[0].clean();
  return compilers.map(compiler => compiler.run());
};
const runDevServer = (compiler, options) => {
  const {
    host,
    port,
    https
  } = options,
        webpackDevServerOptions = _objectWithoutPropertiesLoose(options, ["host", "port", "https"]);

  const browserDevServer = new WebpackDevServer(compiler.compiler, Object.assign({
    hot: true,
    // stats: 'errors-only',
    quiet: true,
    // errors are displayed with friendly-errors plugin
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    overlay: true
  }, webpackDevServerOptions));
  browserDevServer.listen(port, host); // note: host can be undefined, but types does not support it

  return browserDevServer;
};
const watchAndRunDevServer = (options, runOptions) => {
  const url = `http${runOptions.https ? 's' : ''}://localhost:${runOptions.port}`;
  const compiler = createAppBrowserCompiler(MODERN, Object.assign({}, options, {
    hmr: true
  }), {
    successMessage: `Your application is running here: ${url}`
  });
  compiler.clean();
  const webpackDevServer = runDevServer(compiler, runOptions);
  return Object.assign({}, compiler, {
    webpackDevServer
  });
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
//# sourceMappingURL=cli-node6.cjs.js.map
