import { join } from 'path';
import createDaemon from 'springbokjs-daemon/src';
import {
  createPobpackCompiler,
  createAppWebpackConfig,
  type PobpackCompilerType,
  type WatchCallbackType,
} from 'pobpack-utils';
import createNodeWebpackConfig from './createNodeWebpackConfig';

export const createAppNodeCompiler = (options): PobpackCompilerType => (
  createPobpackCompiler('node', createAppWebpackConfig(createNodeWebpackConfig)(options))
);

export const build = (options = {}) => {
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


type RunOptions = {|
  key: ?string,
  displayName: ?string,
  args: ?Array<string|number>,
  cwd: ?string,
|};

export const watchAndRunCompiler = (compiler: PobpackCompilerType, options: RunOptions = {}) => {
  let daemon;
  return compiler.watch((stats) => {
    if (!daemon) {
      daemon = createDaemon({
        key: options.key || 'pobpack-node',
        displayName: options.displayName,
        cwd: options.cwd,
        args: [
          join(compiler.webpackConfig.output.path),
          ...(options.args || []),
        ],
        // autoRestart: true,
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
  const compiler = createAppNodeCompiler({ ...options, hmr: true });
  compiler.clean();
  watchAndRunCompiler(compiler);
  return compiler;
};
