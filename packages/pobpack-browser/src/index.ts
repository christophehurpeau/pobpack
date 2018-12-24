import WebpackDevServer, {
  Configuration as WebpackDevServerConfiguration,
} from 'webpack-dev-server';
import {
  Options,
  PobpackCompiler,
  WatchCallback,
  CreateCompilerOptions,
} from 'pobpack-types';
import { createPobpackCompiler, createAppWebpackConfig } from 'pobpack-utils';
import createLaunchEditorMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import evalSourceMapMiddleware from 'react-dev-utils/evalSourceMapMiddleware';
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware';
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
  const compilers = TARGETS.map((t) =>
    createAppBrowserCompiler(t, { ...options, hmr: false }),
  );
  compilers[0].clean();
  return compilers.map((compiler) => compiler.run());
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

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface RunOptions
  extends Omit<
    WebpackDevServerConfiguration,
    'hot' | 'quiet' | 'overlay' | 'compress' | 'before'
  > {
  host?: string;
  https?: boolean;
  port: number;
}

export const runDevServer = (
  compiler: PobpackCompiler,
  options: RunOptions,
) => {
  const { host, port, https, ...webpackDevServerOptions } = options;
  const browserDevServer = new WebpackDevServer(compiler.compiler, {
    hot: true,
    // stats: 'errors-only',
    quiet: true, // errors are displayed with friendly-errors plugin
    overlay: false, // We use create-react-app-overlay
    compress: true, // Enable gzip compression of generated files
    // Silence WebpackDevServer's logs. Still displays errors and warnings
    clientLogLevel: 'none',

    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    ...webpackDevServerOptions,

    // @ts-ignore
    before(app: any, server: any) {
      // https://github.com/facebook/create-react-app/blob/30ee52cf3b2cbb6ac70999c02b1196bcaba8d4ca/packages/react-scripts/config/webpackDevServer.config.js#L99
      // This lets us fetch source contents from webpack for the error overlay
      app.use(evalSourceMapMiddleware(server));
      // This lets us open files from the runtime error overlay.
      app.use(createLaunchEditorMiddleware());

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware());
    },
  });
  browserDevServer.listen(port, host as string); // note: host can be undefined, but types does not support it
  return browserDevServer;
};

export type PobpackBrowserCompiler = PobpackCompiler & {
  webpackDevServer: WebpackDevServer;
};

export const watchAndRunDevServer = (
  options: Partial<Options>,
  runOptions: RunOptions,
): PobpackBrowserCompiler => {
  const url = `http${runOptions.https ? 's' : ''}://localhost:${
    runOptions.port
  }`;
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
