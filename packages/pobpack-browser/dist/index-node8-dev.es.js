import path from 'path';
import { createModuleConfig, createPluginsConfig, createResolveConfig, createPobpackCompiler, createAppWebpackConfig } from 'pobpack-utils';
import WebpackDevServer from 'webpack-dev-server';

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
  resolve: createResolveConfig([target === "modern" ? 'modern-browsers' : undefined, 'browser'].filter(ExcludesFalsy), { ...options,
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
    target !== "modern" && require.resolve('regenerator-runtime/runtime'), options.hmr && require.resolve('react-hot-loader/patch'), options.hmr && require.resolve('react-dev-utils/webpackHotDevClient'), path.join(path.resolve(options.paths.src), entry.path)].filter(ExcludesFalsy);
    return entries;
  }, {}),
  output: {
    path: path.resolve(options.paths.build) // devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]',

  },
  module: createModuleConfig(options),
  plugins: createPluginsConfig(options)
}));

const createAppBrowserCompiler = (target, options, compilerOptions) => createPobpackCompiler(target, createAppWebpackConfig(createBrowserWebpackConfig(target))({
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

export { TARGETS, ALL, MODERN, createAppBrowserCompiler, build, watch, runDevServer, watchAndRunDevServer };
//# sourceMappingURL=index-node8-dev.es.js.map
