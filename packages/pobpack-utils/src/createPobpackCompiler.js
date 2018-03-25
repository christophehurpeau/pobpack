import { execSync } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import ProgressBar from 'progress';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import FriendlyErrorsWebpackPlugin from './FriendlyErrorsWebpackPlugin';

const buildThrowOnError = stats => {
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({}, true));
};

type WebpackWatcherType = any;
export type WatchCallbackType = (stats: any) => void;

export type PobpackCompilerType = {|
  clean: () => string,
  compiler: any,
  run: () => Promise,
  watch: (callback: WatchCallbackType) => WebpackWatcherType,
  webpackConfig: Object,
|};

type CreateComplierOptionsType = {|
  progressBar?: ?boolean,
  successMessage?: ?string,
|};

export default (
  bundleName: string,
  webpackConfig,
  { progressBar = true, successMessage }: CreateComplierOptionsType = {},
): PobpackCompilerType => {
  const compiler = webpack({
    ...webpackConfig,
  });

  if (progressBar && process.stdout.isTTY) {
    let bar;
    compiler.apply(
      new ProgressPlugin((percentage: number, msg: string) => {
        if (percentage === 0) {
          bar = new ProgressBar(
            `${chalk.yellow.bold(`Building ${bundleName} bundle...`)} ${chalk.bold(
              ':percent',
            )} [:bar] → :msg`,
            { incomplete: ' ', complete: '▇', total: 50, clear: true, stream: process.stdout },
          );
          // } else if (percentage === 1) {
          //   // bar.clear();
          //   bar = null;
        } else {
          bar.update(percentage, { msg: msg.length > 20 ? `${msg.substr(0, 20)}...` : msg });
        }
      }),
    );
  }

  // human-readable error messages
  compiler.apply(new FriendlyErrorsWebpackPlugin({ bundleName, successMessage }));

  const promisifyRun = promisify(compiler.run.bind(compiler));

  return {
    compiler,
    webpackConfig,
    clean: () => webpackConfig.output.path && execSync(`rm -Rf ${webpackConfig.output.path}`),
    run: () => promisifyRun().then(buildThrowOnError),
    watch: callback =>
      compiler.watch({}, (err, stats) => {
        if (err) return;
        if (stats.hasErrors()) return;
        buildThrowOnError(stats);
        callback(stats);
      }),
  };
};
