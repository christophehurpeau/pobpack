import { execSync } from 'child_process';
import readline from 'readline';
import { join } from 'path';
import promiseCallback from 'promise-callback-factory/src';
import ProgressBar from 'progress';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import createDaemon from 'springbokjs-daemon/src';
import createWebpackConfig from './createAppWebpackConfig';

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

export const createCompiler = (options) => {
  const webpackConfig = createWebpackConfig(options);

  const compiler = webpack(webpackConfig);

  if (process.stdout.isTTY) {
    const bar = new ProgressBar(
      'Building node bundle... :percent [:bar]',
      { incomplete: ' ', total: 60, width: 50, clear: true, stream: process.stdout },
    );
    compiler.apply(new ProgressPlugin((percentage, msg) => {
      if (percentage === 1) {
        readline.clearLine(process.stdout);
        readline.cursorTo(process.stdout, 0);
      } else {
        bar.update(percentage, { msg });
      }
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

export const build = (options) => {
  const compiler = createCompiler({ ...options, hmr: false });
  compiler.clean();
  return compiler.run();
};

export const watch = (options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createCompiler({ ...options, hmr: true });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

export const watchAndRun = (options = {}) => {
  let daemon;
  const compiler = watch(options, (stats) => {
    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        args: [join(compiler.webpackConfig.output.path)],
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
