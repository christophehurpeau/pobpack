import { join } from 'path';
import createDaemon, { Daemon } from 'springbokjs-daemon';
import {
  createPobpackCompiler,
  createAppWebpackConfig,
  webpack,
} from 'pobpack-utils';
import { Options, PobpackCompiler, WatchCallback } from 'pobpack-types';
import { Watching } from 'webpack';
import createNodeWebpackConfig from './createNodeWebpackConfig';

export const createAppNodeCompiler = (
  options: Partial<Options>,
): PobpackCompiler =>
  createPobpackCompiler(
    'node',
    createAppWebpackConfig(createNodeWebpackConfig)(options),
  );

export const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compiler = createAppNodeCompiler({ ...options, hmr: false });
  compiler.clean();
  return compiler.run();
};

export const watch = (options: Partial<Options>, callback: WatchCallback) => {
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
  args?: Array<string | number>;
  cwd?: string;
  displayName?: string;
  key?: string;
}

export const watchAndRunCompiler = (
  compiler: PobpackCompiler,
  options: RunOptions = {},
): Watching => {
  let daemon: Daemon;
  const watchingCompiler = compiler.watch((stats: webpack.Stats) => {
    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [
          join(
            (compiler.webpackConfig.output &&
              compiler.webpackConfig.output.path) ||
              '',
          ),
          ...(options.args || []),
        ],
        // autoRestart: true,
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
    close: (callback) => {
      if (daemon) daemon.stop();
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
