import { execSync } from 'child_process';
import { promisify } from 'util';
import colorette from 'colorette';
import type {
  PobpackCompiler,
  CreateCompilerOptions,
  FilledWebpackConfiguration,
} from 'pobpack-types';
import ProgressBar from 'progress';
import type { Stats } from 'webpack';
import webpack, { ProgressPlugin } from 'webpack';
import FriendlyErrorsWebpackPlugin from './FriendlyErrorsWebpackPlugin';

const buildThrowOnError = (stats?: Stats): Stats | undefined => {
  if (!stats) return stats;
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({}));
};

export default function createPobpackCompiler(
  bundleName: string,
  webpackConfig: FilledWebpackConfiguration,
  { progressBar = true, successMessage }: CreateCompilerOptions = {},
): PobpackCompiler {
  const compiler = webpack(webpackConfig);

  if (progressBar && process.stdout.isTTY) {
    let bar: ProgressBar;
    const progressPlugin = new ProgressPlugin(
      (percentage: number, msg: string) => {
        if (percentage === 0) {
          bar = new ProgressBar(
            `${colorette.bold(
              colorette.yellow(`Building ${bundleName} bundle...`),
            )} ${colorette.bold(':percent')} [:bar] → :msg`,
            {
              incomplete: ' ',
              complete: '▇',
              total: 50,
              clear: true,
              stream: process.stdout,
            },
          );
          // } else if (percentage === 1) {
          //   // bar.clear();
          //   bar = null;
        } else {
          bar.update(percentage, {
            msg: msg.length > 20 ? `${msg.slice(0, 20)}...` : msg,
          });
        }
      },
    );
    progressPlugin.apply(compiler);
  }

  // human-readable error messages
  new FriendlyErrorsWebpackPlugin({ bundleName, successMessage }).apply(
    compiler,
  );

  const promisifyRun: () => Promise<Stats | undefined> = promisify(
    compiler.run.bind(compiler),
  );

  return {
    compiler,
    webpackConfig,
    clean: (): void => {
      if (webpackConfig.output?.path) {
        execSync(`rm -Rf ${webpackConfig.output.path}`);
      }
    },
    run: (): Promise<Stats | undefined> =>
      promisifyRun().then(buildThrowOnError),
    watch: (callback: (stats?: Stats) => unknown) =>
      compiler.watch({}, (err?: Error, stats?: Stats): void => {
        if (err || !stats) return;
        if (stats.hasErrors()) return;
        buildThrowOnError(stats);
        callback(stats);
      }),
  };
}
