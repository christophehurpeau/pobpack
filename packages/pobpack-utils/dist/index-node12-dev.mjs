import webpack, { ProgressPlugin } from 'webpack';
export { default as webpack } from 'webpack';
import { existsSync, realpathSync } from 'fs';
import { resolve, dirname } from 'path';
import { execSync } from 'child_process';
import { promisify } from 'util';
import colorette from 'colorette';
import ProgressBar from 'progress';
import { addConfig, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';
import Logger from 'nightingale-logger';
import findUp from 'find-up';
import resolveFrom from 'resolve-from';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

/* eslint-disable complexity */
function createOptions(options) {
  return {
    aliases: options.aliases || {},
    babel: options.babel || {},
    defines: options.defines || {},
    entries: options.entries || ['index'],
    serviceWorkerEntry: options.serviceWorkerEntry === undefined ? 'service-worker' : options.serviceWorkerEntry,
    env: options.env || process.env.NODE_ENV,
    hmr: options.hmr,
    allowlistExternalExtensions: options.allowlistExternalExtensions || [],
    includeModules: options.includeModules || [],
    includePaths: options.includePaths || [],
    jsLoaders: options.jsLoaders,
    moduleRules: options.moduleRules,
    paths: {
      src: 'src',
      build: 'build',
      ...options.paths
    },
    optimization: options.optimization,
    plugins: options.plugins || [],
    prependPlugins: options.prependPlugins || [],
    resolveLoaderModules: options.resolveLoaderModules,
    typescript: options.typescript || false,
    webpackPrefixPackageFields: options.webpackPrefixPackageFields || []
  };
}

function createAppWebpackConfig(createWebpackConfig) {
  const wrapCreateWebpackConfig = options => createWebpackConfig(createOptions(options));

  return options => {
    const appWebpackConfigPath = resolve('createAppWebpackConfig.js');

    if (existsSync(appWebpackConfigPath)) {
      console.info('Using app createAppWebpackConfig.js'); // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment

      const appWebpackConfigCreator = require(appWebpackConfigPath);

      if (typeof appWebpackConfigCreator !== 'function') {
        console.error("app createAppWebpackConfig.js should export a function\nmodule.exports = function (config, options) { ... }");
      }

      options = createOptions(options);
      const config = appWebpackConfigCreator(wrapCreateWebpackConfig, options);

      if (typeof config !== 'object') {
        console.error("app createAppWebpackConfig.js should return the config\nfunction (config, options) { return config(options); }");
      }

      return config;
    } else {
      return wrapCreateWebpackConfig(options);
    }
  };
}

/* eslint-disable no-console */

addConfig({
  key: 'pobpack-utils',
  handler: new ConsoleHandler(levels.INFO)
});
const logger = new Logger('pobpack-utils', 'pobpack');
const pluginName = 'pobpack/FriendlyErrorsWebpackPlugin';
class FriendlyErrorsWebpackPlugin {
  constructor(options) {
    this.bundleName = options.bundleName;
    this.successMessage = options.successMessage;
    this.logger = logger.context({
      bundleName: options.bundleName
    });
  }

  apply(compiler) {
    // webpack is recompiling
    compiler.hooks.invalid.tap(pluginName, () => {
      console.log();
      this.logger.info('Compiling...');
    }); // compilation done

    compiler.hooks.done.tap(pluginName, stats => {
      console.log();

      if (stats.hasErrors()) {
        this.logger.critical('Failed to compile.');
        console.log(); // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call

        stats.toJson({}).errors.map(error => // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error !== null && error !== void 0 && error.message ? error.message : error));
        return;
      }

      if (process.send) process.send('ready');

      if (stats.hasWarnings()) {
        this.logger.critical('Compiled with warnings.');
        console.log(); // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call

        stats.toJson({}).warnings.map(warning => // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(warning !== null && warning !== void 0 && warning.message ? warning.message : warning));
        return;
      }

      this.logger.success('Compiled successfully!');

      if (this.successMessage) {
        console.log(this.successMessage);
      }
    });
  }

}

const buildThrowOnError = stats => {
  if (!stats) return stats;

  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({}));
};

function createPobpackCompiler(bundleName, webpackConfig, {
  progressBar = true,
  successMessage
} = {}) {
  const compiler = webpack(webpackConfig);

  if (progressBar && process.stdout.isTTY) {
    let bar;
    const progressPlugin = new ProgressPlugin((percentage, msg) => {
      if (!bar || percentage === 0) {
        bar = new ProgressBar(`${colorette.bold(colorette.yellow(`Building ${bundleName} bundle...`))} ${colorette.bold(':percent')} [:bar] → :msg`, {
          incomplete: ' ',
          complete: '▇',
          total: 50,
          clear: true,
          stream: process.stdout
        }); // } else if (percentage === 1) {
        //   // bar.clear();
        //   bar = null;
      } else {
        bar.update(percentage, {
          msg: msg.length > 20 ? `${msg.slice(0, 20)}...` : msg
        });

        if (percentage === 1) {
          bar = undefined;
        }
      }
    });
    progressPlugin.apply(compiler);
  } // human-readable error messages


  new FriendlyErrorsWebpackPlugin({
    bundleName,
    successMessage
  }).apply(compiler);
  const promisifyRun = promisify(compiler.run.bind(compiler));
  const promisifyClose = promisify(compiler.close.bind(compiler));
  return {
    compiler,
    webpackConfig,
    clean: () => {
      var _webpackConfig$output;

      if ((_webpackConfig$output = webpackConfig.output) !== null && _webpackConfig$output !== void 0 && _webpackConfig$output.path) {
        execSync(`rm -Rf ${webpackConfig.output.path}`);
      }
    },
    close: promisifyClose,
    run: () => promisifyRun().then(buildThrowOnError),
    watch: callback => compiler.watch({}, (err, stats) => {
      if (err || !stats) return;
      if (stats.hasErrors()) return;
      buildThrowOnError(stats);
      callback(stats);
    })
  };
}

// with node 10.12
// import { createRequireFromPath } from 'module';
// const requireFromPwd = createRequireFromPath(process.cwd());
const ExcludesFalsy = Boolean;
function createModuleConfig(options) {
  return {
    strictExportPresence: true,
    rules: [// Disable require.ensure as it's not a standard language feature.
    {
      parser: {
        requireEnsure: false
      }
    }, // tsx? / jsx?
    {
      test: options.typescript ? /\.(mjs|[jt]sx?)$/ : /\.(mjs|jsx?)$/,
      include: [resolve(options.paths.src), ...options.includeModules.map(includeModule => {
        const packageJson = findUp.sync('package.json', {
          cwd: dirname( // requireFromPwd.resolve(includeModule)
          realpathSync(resolveFrom(process.cwd(), includeModule)))
        });
        if (!packageJson) return;
        return packageJson.slice(0, -12);
      }).filter(ExcludesFalsy), ...options.includePaths],
      use: [{
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          cacheDirectory: true,
          ...options.babel
        }
      }, ...(options.jsLoaders || [])]
    }, // other rules
    ...(options.moduleRules || [])]
  };
}

const ExcludesFalsy$1 = Boolean;
function createPluginsConfig(options) {
  const plugins = [...(options.prependPlugins || []), // enforces the entire path of all required modules match the exact case
  // of the actual path on disk. Using this plugin helps alleviate cases
  // for developers working on case insensitive systems like OSX.
  options.env !== 'production' && new CaseSensitivePathsPlugin(), new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(options.env),
    ...options.defines
  }),
  /* replace object-assign ponyfill to use native implementation */
  // Array.isArray
  new webpack.NormalModuleReplacementPlugin(/.*\/node_modules\/isarray\/index.js$/, require.resolve('../replacements/Array.isArray.js')), // Object.assign
  new webpack.NormalModuleReplacementPlugin(/.*\/node_modules\/(object-assign|extend-shallow)\/index.js$/, require.resolve('../replacements/Object.assign.js')), // Object.setPrototypeOf
  new webpack.NormalModuleReplacementPlugin(/.*\/node_modules\/setprototypeof\/index.js$/, require.resolve('../replacements/Object.setPrototypeOf.js')), // Promise
  new webpack.NormalModuleReplacementPlugin(/.*\/node_modules\/any-promise\/index.js$/, require.resolve('../replacements/Promise.js')), // String.prototype.repeat
  new webpack.NormalModuleReplacementPlugin(/.*\/node_modules\/repeat-string\/index.js$/, require.resolve('../replacements/String.prototype.repeat.js')), // Symbol.observable
  // https://github.com/tc39/proposal-observable
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/observable
  // new webpack.NormalModuleReplacementPlugin(
  //   /.*\/node_modules\/symbol-observable\/es\/ponyfill.js$/,
  //   require.resolve('../replacements/Symbol.observable.js'),
  // ),
  ...options.plugins];
  return plugins.filter(ExcludesFalsy$1);
}

/* eslint-disable complexity */
const ExcludesFalse = Boolean;
function createResolveConfig(modulePrefixPackageFields, options) {
  return {
    // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/25209
    // cacheWithContext: false,
    modules: ['node_modules', resolve('src')],
    extensions: [options.typescript && '.ts', options.typescript && '.tsx', '.mjs', '.js', '.jsx'].filter(ExcludesFalse),
    mainFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:${prefix}-dev`, `module:${prefix}`, // old `webpack:` syntax
    options.env !== 'production' && `webpack:${prefix}-dev`, `webpack:${prefix}`])), options.env !== 'production' && 'module-dev', 'module', // old webpack: syntax
    options.env !== 'production' && 'webpack:main-dev', 'webpack:main', ...(!modulePrefixPackageFields.includes('browser') ? [] : [// Browser builds
    options.env !== 'production' && 'browser-dev', 'browser']), options.env !== 'production' && 'main-dev', 'main'].filter(ExcludesFalse),
    aliasFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:aliases-${prefix}-dev`, `module:aliases-${prefix}`, // old webpack: syntax
    options.env !== 'production' && `webpack:aliases-${prefix}-dev`, `webpack:aliases-${prefix}`])), options.env !== 'production' && 'module:aliases-dev', 'module:aliases', // old webpack: syntax
    options.env !== 'production' && 'webpack:aliases-dev', 'webpack:aliases', 'webpack', modulePrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev', modulePrefixPackageFields.includes('browser') && 'browser'].filter(ExcludesFalse),
    alias: options.aliases,
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    // fs and module are used by source-map-support
    fallback: {
      fs: false,
      module: false
    }
  };
}

export { createAppWebpackConfig, createModuleConfig, createOptions, createPluginsConfig, createPobpackCompiler, createResolveConfig };
//# sourceMappingURL=index-node12-dev.mjs.map
