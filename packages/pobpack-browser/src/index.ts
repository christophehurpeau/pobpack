import WebpackDevServer from 'webpack-dev-server';
import { Options, PobpackCompiler, WatchCallback, CreateCompilerOptions } from 'pobpack-types';
import { createPobpackCompiler, createAppWebpackConfig } from 'pobpack-utils';
import createBrowserWebpackConfig, {
  TARGETS,
  ALL,
  MODERN,
  BrowserTargetType,
} from './createBrowserWebpackConfig';

export { TARGETS, ALL, MODERN };

export const createAppBrowserCompiler = (
  target: BrowserTargetType,
  options: Partial<Options>,
  compilerOptions?: CreateCompilerOptions,
): PobpackCompiler =>
  createPobpackCompiler(
    target,
    createAppWebpackConfig(createBrowserWebpackConfig(target))({
      entries: [{ key: target, path: 'index' }], // override default entry
      ...options,
      paths: { build: 'public', ...options.paths },
    }),
    compilerOptions,
  );

export const build = (options = {}) => {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  const compilers = TARGETS.map(t => createAppBrowserCompiler(t, { ...options, hmr: false }));
  compilers[0].clean();
  return compilers.map(compiler => compiler.run());
};

export const watch = (options: Partial<Options>, callback?: WatchCallback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const compiler = createAppBrowserCompiler(MODERN, { ...options, hmr: true });
  compiler.clean();
  compiler.watch(callback as WatchCallback);
  return compiler;
};

export interface RunOptions {
  host?: string;
  https?: boolean;
  port: number;
}

export const runDevServer = (compiler: PobpackCompiler, options: RunOptions) => {
  const { host, port, https, ...webpackDevServerOptions } = options;
  const browserDevServer = new WebpackDevServer(compiler.compiler, {
    hot: true,
    // stats: 'errors-only',
    quiet: true, // errors are displayed with friendly-errors plugin
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    overlay: true,
    ...webpackDevServerOptions,
  });
  browserDevServer.listen(port, host as string); // note: host can be undefined, but types does not support it
  return browserDevServer;
};

export type PobpackBrowserCompiler = PobpackCompiler & { webpackDevServer: WebpackDevServer };

export const watchAndRunDevServer = (
  options: Partial<Options>,
  runOptions: RunOptions,
): PobpackBrowserCompiler => {
  const url = `http${runOptions.https ? 's' : ''}://localhost:${runOptions.port}`;
  const compiler: PobpackCompiler = createAppBrowserCompiler(
    MODERN,
    { ...options, hmr: true },
    {
      successMessage: `Your application is running here: ${url}`,
    },
  );
  compiler.clean();
  const webpackDevServer = runDevServer(compiler, runOptions);
  return { ...compiler, webpackDevServer };
};
