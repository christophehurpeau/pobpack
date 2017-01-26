import readline from 'readline';
import { execSync } from 'child_process';
import promiseCallback from 'promise-callback-factory/src';
import ProgressBar from 'progress';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import createWebpackConfig from './createAppWebpackConfig';

const builtRejectOnError = (stats) => {
  if (stats.hasErrors()) {
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
      colors: true,
    }));
  }

  return stats;
};

export const createCompiler = (options) => {
  const webpackConfig = createWebpackConfig({
    env: process.env.NODE_ENV,
    ...options,
  });

  const compiler = webpack(webpackConfig);

  if (process.stdout.isTTY) {
    const bar = new ProgressBar(
      'Building server bundle... :percent [:bar]',
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
    clean: () => webpackConfig.output.path && execSync(`rm -Rf ${webpackConfig.output.path}`),
    run: () => promiseCallback(done => compiler.run(done)).then(builtRejectOnError),
    watch: (callback) => compiler.watch({}, (err, stats) => {
      if (err) return;
      builtRejectOnError(stats);
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
};
