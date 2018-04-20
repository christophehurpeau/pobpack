import { join } from 'path';
import createDaemon from 'springbokjs-daemon';
import {
  createPobpackCompiler,
  createAppWebpackConfig,
  type PobpackCompilerType,
  type WatchCallbackType,
} from 'pobpack-utils';
import createNodeWebpackConfig from './createNodeWebpackConfig';

export const createAppNodeCompiler = (options): PobpackCompilerType =>
  createPobpackCompiler('node', createAppWebpackConfig(createNodeWebpackConfig)(options));

export const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compiler = createAppNodeCompiler({ ...options, hmr: false });
  compiler.clean();
  return compiler.run();
};

export const watch = (options, callback: WatchCallbackType) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createAppNodeCompiler({ ...options, hmr: true });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};

type RunOptionsType = {|
  args?: ?Array<string | number>,
  cwd?: ?string,
  displayName?: ?string,
  key?: ?string,
|};

export const watchAndRunCompiler = (
  compiler: PobpackCompilerType,
  options: RunOptionsType = {},
) => {
  let daemon;
  return compiler.watch(stats => {
    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [join(compiler.webpackConfig.output.path), ...(options.args || [])],
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
};

export const watchAndRun = options => {
  const compiler = createAppNodeCompiler({ ...options, hmr: true });
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
