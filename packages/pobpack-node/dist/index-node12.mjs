import path, { join } from 'path';
import debounce from 'debounce';
import { createResolveConfig, createModuleConfig, createPluginsConfig, webpack, createPobpackCompiler, createAppWebpackConfig } from 'pobpack-utils';
import createDaemon from 'springbokjs-daemon';
import fs from 'fs';
import nodeExternals from 'webpack-node-externals';

// const fs = require('fs');
const ExcludesFalsy = Boolean;

const createExternals = options => {
  const baseOptions = {
    importType: 'commonjs',
    modulesFromFile: false,
    allowlist: [require.resolve('../hot'), ...options.includeModules.map(module => new RegExp(`^${module}(/|$)`))].concat(options.allowlistExternalExtensions ? [new RegExp(`(${options.allowlistExternalExtensions.join('|')})$`)] : [])
  };
  const nodeModulesPaths = [];
  let p = process.cwd();

  do {
    const nodeModulesCurrentPath = path.join(p, 'node_modules');

    if (fs.existsSync(nodeModulesCurrentPath)) {
      nodeModulesPaths.push(nodeModulesCurrentPath);
    }

    p = path.dirname(p);
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
    resolve: createResolveConfig(['node'], { ...options,
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
      entries[entry.key] = [options.hmr ? require.resolve('../hot') : undefined, path.join(path.resolve(options.paths.src), entry.path)].filter(ExcludesFalsy);
      return entries;
    }, {}),
    output: {
      path: path.resolve(options.paths.build),
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    module: createModuleConfig(options),
    plugins: createPluginsConfig({ ...options,
      prependPlugins: [options.hmr && new webpack.HotModuleReplacementPlugin(), ...(options.prependPlugins || [])],
      plugins: [options.hmr && new webpack.BannerPlugin({
        banner: `require("${require.resolve('../source-map-support')}");`,
        raw: true,
        entryOnly: false,
        include: /\.js$/
      }), ...options.plugins]
    })
  };
}

const createAppNodeCompiler = (options, compilerOptions) => createPobpackCompiler('node', createAppWebpackConfig(createNodeWebpackConfig)(options), compilerOptions);
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
  const debounceRestart = debounce(() => {
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
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [...(options.nodeArgs || []), join( // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
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

export { build, createAppNodeCompiler, watch, watchAndRun, watchAndRunCompiler };
//# sourceMappingURL=index-node12.mjs.map
