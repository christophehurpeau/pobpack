import { execSync } from 'child_process';
import { join } from 'path';
import chalk from 'chalk';
import promiseCallback from 'promise-callback-factory/src';
import ProgressBar from 'progress';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import createDaemon from 'springbokjs-daemon/src';
import createAppWebpackConfig from './createAppWebpackConfig';

const buildThrowOnError = (stats) => {
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false,
    colors: process.stdout.isTTY,
  }));
};

export const createCompiler = (webpackConfig) => {
  const compiler = webpack(webpackConfig);

  if (process.stdout.isTTY) {
    const bar = new ProgressBar(
      `${chalk.yellow.bold('Building node bundle...')} ${chalk.bold(':percent')} [:bar] → :msg`,
      { incomplete: ' ', complete: '▇', total: 50, clear: true, stream: process.stdout },
    );
    compiler.apply(new ProgressPlugin((percentage, msg) => {
      bar.update(percentage, { msg: msg.length > 20 ? `${msg.substr(0, 20)}...` : msg });
    }));
    // human-readable error messages
    compiler.apply(new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    }));
  }

  return {
    webpackConfig,
    clean: () => webpackConfig.output.path && execSync(`rm -Rf ${webpackConfig.output.path}`),
    run: () => promiseCallback(done => compiler.run(done)).then(buildThrowOnError),
    watch: (callback) => compiler.watch({}, (err, stats) => {
      if (err) return;
      if (stats.hasErrors()) return;
      buildThrowOnError(stats);
      callback(stats);
    }),
  };
};

export const createAppCompiler = options => (
  createCompiler(createAppWebpackConfig(options))
);

export const build = (options = {}) => {
  const compiler = createAppCompiler({ ...options, hmr: false });
  compiler.clean();
  return compiler.run();
};

export const watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createAppCompiler({ ...options, hmr: true });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

export const watchAndRunCompiler = (compiler, options = {}) => {
  let daemon;
  compiler.watch((stats) => {
    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        args: [
          join(compiler.webpackConfig.output.path),
          ...options.args,
        ],
        autorestart: true,
      });
      daemon.start();
      process.on('exit', () => daemon.stop());
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

export const watchAndRun = (options) => {
  const compiler = createAppCompiler({ ...options, hmr: true });
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
