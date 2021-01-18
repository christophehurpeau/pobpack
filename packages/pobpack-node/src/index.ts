import { join } from 'path';
import debounce from 'debounce';
import type {
  CreateCompilerOptions,
  Options,
  PobpackCompiler,
  WatchCallback,
} from 'pobpack-types';
import { createPobpackCompiler, createAppWebpackConfig } from 'pobpack-utils';
import type { Daemon } from 'springbokjs-daemon';
import createDaemon from 'springbokjs-daemon';
import type { Stats, Watching } from 'webpack';
import createNodeWebpackConfig from './createNodeWebpackConfig';

export const createAppNodeCompiler = (
  options: Partial<Options>,
  compilerOptions?: CreateCompilerOptions,
): PobpackCompiler =>
  createPobpackCompiler(
    'node',
    createAppWebpackConfig(createNodeWebpackConfig)(options),
    compilerOptions,
  );

export const build = (options = {}): Promise<Stats | undefined> => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compiler = createAppNodeCompiler({ ...options, hmr: false });
  compiler.clean();
  return compiler.run();
};

export const watch = (
  options: Partial<Options>,
  callback: WatchCallback,
): PobpackCompiler => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const compiler = createAppNodeCompiler({ ...options, hmr: true });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

export interface RunOptions {
  nodeArgs?: (string | number)[];
  args?: (string | number)[];
  cwd?: string;
  displayName?: string;
  key?: string;
}

export const watchAndRunCompiler = (
  compiler: PobpackCompiler,
  options: RunOptions = {},
): Watching => {
  let daemon: Daemon;
  let hadError = false;
  const debounceRestart = debounce(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    daemon.restart();
  }, 1000);
  const daemonStop = (): void => {
    debounceRestart.clear();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    daemon.stop();
  };
  const watchingCompiler = compiler.watch((stats) => {
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
        args: [
          ...(options.nodeArgs || []),
          join(
            // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
            (compiler.webpackConfig.output &&
              compiler.webpackConfig.output.path) ||
              '',
          ),
          ...(options.args || []),
        ],
        // autoRestart: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
    close: (callback) => {
      if (daemon) {
        daemonStop();
        process.off('exit', daemonStop);
      }
      watchingCompiler.close(callback);
    },
  };
};

export const watchAndRun = (options?: Partial<Options>): PobpackCompiler => {
  const compiler = createAppNodeCompiler({ ...options, hmr: true });
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
