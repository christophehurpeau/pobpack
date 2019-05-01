'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const path = require('path');
const path__default = _interopDefault(path);
const createDaemon = _interopDefault(require('springbokjs-daemon'));
const pobpackUtils = require('pobpack-utils');
const fs = _interopDefault(require('fs'));
const nodeExternals = _interopDefault(require('webpack-node-externals'));

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

    if (fs.existsSync(nodeModulesCurrentPath)) {
      nodeModulesPaths.push(nodeModulesCurrentPath);
    }

    p = path__default.dirname(p);
  } while (p !== '/');

  return nodeModulesPaths.map(nodeModulesPath => nodeExternals({ ...baseOptions,
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

  const daemonStop = () => daemon.stop();

  const watchingCompiler = compiler.watch(stats => {
    const hasErrors = stats.hasErrors();

    if (hasErrors) {
      hadError = true;
      return;
    }

    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [path.join(compiler.webpackConfig.output && compiler.webpackConfig.output.path || ''), ...(options.args || [])] // autoRestart: true,

      });
      daemon.start();
      process.on('exit', daemonStop);
    } else if (daemon.hasExited()) {
      daemon.start();
    } else if (hadError) {
      daemon.restart();
    } else {
      // already started, send a signal to ask hot reload
      try {
        daemon.sendSIGUSR2();
      } catch (err) {
        daemon.restart();
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
        daemon.stop();
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
//# sourceMappingURL=index-node10-dev.cjs.js.map
