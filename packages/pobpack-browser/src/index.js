import WebpackDevServer from 'webpack-dev-server';
import {
  createPobpackCompiler,
  createAppWebpackConfig,
  type OptionsType,
  type PobpackCompilerType,
  type WatchCallbackType,
} from 'pobpack-utils/src';
import createBrowserWebpackConfig, { TARGETS, ALL, MODERN } from './createBrowserWebpackConfig';

export { TARGETS, ALL, MODERN };

export const createAppBrowserCompiler =
  (target: string, options: OptionsType, compilerOptions): PobpackCompilerType => (
    createPobpackCompiler(
      target,
      createAppWebpackConfig(createBrowserWebpackConfig(target))({
        ...options,
        paths: { build: 'public', ...options.paths },
      }),
      compilerOptions,
    )
  );

export const build = (options = {}) => {
  const compilers = TARGETS.map(t => createAppBrowserCompiler(t, { ...options, hmr: false }));
  compilers[0].clean();
  return compilers.map(compiler => compiler.run());
};

export const watch = (options, callback: WatchCallbackType) => {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  const compiler = createAppBrowserCompiler(MODERN, { ...options, hmr: true });
  compiler.clean();
  compiler.watch(callback);
  return compiler;
};


type RunOptions = {
  port: number,
};

export const runDevServer = (compiler: PobpackCompilerType, options: RunOptions) => {
  const { port, https, ...webpackDevServerOptions } = options;
  const browserDevServer = new WebpackDevServer(compiler.compiler, {
    hot: true,
    // stats: 'errors-only',
    quiet: false, // errors are displayed with friendly-errors plugin
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    overlay: true,
    ...webpackDevServerOptions,
  });
  browserDevServer.listen(port);
  return browserDevServer;
};

export const watchAndRunDevServer = (options: OptionsType, runOptions: RunOptions) => {
  const url = `http${runOptions.https ? 's' : ''}://localhost:${runOptions.port}`;
  const compiler = createAppBrowserCompiler(
    MODERN,
    { ...options, hmr: true },
    {
      successMessage: `Your application is running here: ${url}`,
    }
  );
  compiler.clean();
  const webpackDevServer = runDevServer(compiler, runOptions);
  return { ...compiler, webpackDevServer };
};
