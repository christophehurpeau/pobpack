import path, { join } from 'path';
import createDaemon from 'springbokjs-daemon';
import { createResolveConfig, createModuleConfig, createPluginsConfig, webpack, createPobpackCompiler, createAppWebpackConfig } from 'pobpack-utils';
import fs from 'fs';
import nodeExternals from 'webpack-node-externals';

// const fs = require('fs');
const ExcludesFalsy = Boolean;

const createExternals = options => {
  const baseOptions = {
    importType: 'commonjs',
    modulesFromFile: false,
    whitelist: [require.resolve('../hot'), ...options.includeModules.map(module => new RegExp(`^${module}(/|$)`))]
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

var createNodeWebpackConfig = (options => ({
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
    plugins: [options.hmr && new webpack.BannerPlugin({
      banner: `require("${require.resolve('../source-map-support')}");`,
      raw: true,
      entryOnly: false,
      include: /\.js$/
    }), ...options.plugins]
  })
}));

const createAppNodeCompiler = options => createPobpackCompiler('node', createAppWebpackConfig(createNodeWebpackConfig)(options));
const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compiler = createAppNodeCompiler({ ...options,
    hmr: false
  });
  compiler.clean();
  return compiler.run();
};
const watchAndRunCompiler = (compiler, options = {}) => {
  let daemon;
  const watchingCompiler = compiler.watch(() => {
    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [join(compiler.webpackConfig.output && compiler.webpackConfig.output.path || ''), ...(options.args || [])] // autoRestart: true,

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
  return {
    invalidate: () => {
      watchingCompiler.invalidate();
    },
    close: callback => {
      if (daemon) daemon.stop();
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

/* eslint-disable unicorn/no-process-exit */
const cmd = process.argv[2];

if (cmd === 'build') {
  build();
} else if (cmd === 'start' || !cmd) {
  watchAndRun();
} else {
  console.log(`Invalid command: ${cmd}`);
  process.exit(1);
}
//# sourceMappingURL=cli-node10.es.js.map
