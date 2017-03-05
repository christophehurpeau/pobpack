import { execSync } from 'child_process';
import chalk from 'chalk';
import promiseCallback from 'promise-callback-factory/src';
import ProgressBar from 'progress';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

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

type WebpackWatcherType = any;
export type WatchCallbackType = (stats: any) => void;

export type PobpackCompilerType = {|
  compiler: any,
  webpackConfig: Object,
  clean: () => string,
  run: () => Promise,
  watch: (callback: WatchCallbackType) => WebpackWatcherType,
|};

export default (bundleName: string, webpackConfig, compilationSuccessInfo): PobpackCompilerType => {
  const compiler = webpack({
    ...webpackConfig,
  });

  if (process.stdout.isTTY) {
    let bar;
    compiler.apply(new ProgressPlugin((percentage: number, msg: string) => {
      if (percentage === 0) {
        bar = new ProgressBar(
          `${chalk.yellow.bold(`Building ${bundleName} bundle...`)} ${chalk.bold(':percent')} [:bar] → :msg`,
          { incomplete: ' ', complete: '▇', total: 50, clear: true, stream: process.stdout },
        );
      // } else if (percentage === 1) {
      //   // bar.clear();
      //   bar = null;
      } else {
        bar.update(percentage, { msg: msg.length > 20 ? `${msg.substr(0, 20)}...` : msg });
      }
    }));
  }

  // human-readable error messages
  compiler.apply(new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo,
    clearConsole: false,
  }));

  return {
    compiler,
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
