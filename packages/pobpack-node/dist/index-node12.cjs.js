'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const path = require('path');
const debounce = require('debounce');
const pobpackUtils = require('pobpack-utils');
const createDaemon = require('springbokjs-daemon');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const path__default = /*#__PURE__*/_interopDefaultLegacy(path);
const debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
const createDaemon__default = /*#__PURE__*/_interopDefaultLegacy(createDaemon);
const fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
const nodeExternals__default = /*#__PURE__*/_interopDefaultLegacy(nodeExternals);

// const fs = require('fs');
const ExcludesFalsy = Boolean;

const createExternals = options => {
  const baseOptions = {
    importType: 'commonjs',
    modulesFromFile: false,
    whitelist: [require.resolve('../hot'), ...options.includeModules.map(module => new RegExp(`^${module}(/|$)`))].concat(options.whitelistExternalExtensions ? [new RegExp(`(${options.whitelistExternalExtensions.join('|')})$`)] : [])
  };
  const nodeModulesPaths = [];
  let p = process.cwd();

  do {
    const nodeModulesCurrentPath = path__default.join(p, 'node_modules');

    if (fs__default.existsSync(nodeModulesCurrentPath)) {
      nodeModulesPaths.push(nodeModulesCurrentPath);
    }

    p = path__default.dirname(p);
  } while (p !== '/');

  return nodeModulesPaths.map(nodeModulesPath => nodeExternals__default({ ...baseOptions,
    modulesDir: nodeModulesPath
  }));
};

function createNodeWebpackConfig(options) {
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
      minimize: false,
      ...options.optimization
    },
    // don't bundle node_modules dependencies
    externals: createExternals(options),
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
    resolve: pobpackUtils.createResolveConfig(['node'], { ...options,
      babel: {
        presets: [require.resolve('../babel')],
        ...options.babel
      }
    }),
    entry: options.entries.reduce((entries, entry) => {
      if (typeof entry === 'string') entry = {
        key: entry,
        path: entry
      };
      entries[entry.key] = [options.hmr ? require.resolve('../hot') : undefined, path__default.join(path__default.resolve(options.paths.src), entry.path)].filter(ExcludesFalsy);
      return entries;
    }, {}),
    output: {
      path: path__default.resolve(options.paths.build),
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    module: pobpackUtils.createModuleConfig(options),
    plugins: pobpackUtils.createPluginsConfig({ ...options,
      plugins: [options.hmr && new pobpackUtils.webpack.BannerPlugin({
        banner: `require("${require.resolve('../source-map-support')}");`,
        raw: true,
        entryOnly: false,
        include: /\.js$/
      }), ...options.plugins]
    })
  };
}

const createAppNodeCompiler = (options, compilerOptions) => pobpackUtils.createPobpackCompiler('node', pobpackUtils.createAppWebpackConfig(createNodeWebpackConfig)(options), compilerOptions);
const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compiler = createAppNodeCompiler({ ...options,
    hmr: false
  });
  compiler.clean();
  return compiler.run();
};
const watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const compiler = createAppNodeCompiler({ ...options,
    hmr: true
  });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};
const watchAndRunCompiler = (compiler, options = {}) => {
  let daemon;
  let hadError = false;
  const debounceRestart = debounce__default(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    daemon.restart();
  }, 1000);

  const daemonStop = () => {
    debounceRestart.clear(); // eslint-disable-next-line @typescript-eslint/no-floating-promises

    daemon.stop();
  };

  const watchingCompiler = compiler.watch(stats => {
    const hasErrors = stats ? stats.hasErrors() : false;

    if (hasErrors) {
      hadError = true;
      return;
    }

    if (!daemon) {
      daemon = createDaemon__default({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [...(options.nodeArgs || []), path.join( // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        compiler.webpackConfig.output && compiler.webpackConfig.output.path || ''), ...(options.args || [])] // autoRestart: true,

      }); // eslint-disable-next-line @typescript-eslint/no-floating-promises

      daemon.start();
      process.on('exit', daemonStop);
    } else if (daemon.hasExited()) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      daemon.start();
    } else if (hadError) {
      debounceRestart();
    } else {
      // already started, send a signal to ask hot reload
      try {
        daemon.sendSIGUSR2();
      } catch {
        debounceRestart();
      }
    }

    hadError = false;
  });
  return {
    invalidate: () => {
      watchingCompiler.invalidate();
    },
    close: callback => {
      if (daemon) {
        daemonStop();
        process.off('exit', daemonStop);
      }

      watchingCompiler.close(callback);
    }
  };
};
const watchAndRun = options => {
  const compiler = createAppNodeCompiler({ ...options,
    hmr: true
  });
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};

exports.build = build;
exports.createAppNodeCompiler = createAppNodeCompiler;
exports.watch = watch;
exports.watchAndRun = watchAndRun;
exports.watchAndRunCompiler = watchAndRunCompiler;
//# sourceMappingURL=index-node12.cjs.js.map
