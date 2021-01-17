'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const util = require('util');
const colorette = require('colorette');
const ProgressBar = require('progress');
const nightingale = require('nightingale');
const ConsoleHandler = require('nightingale-console');
const Logger = require('nightingale-logger');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const findUp = require('find-up');
const resolveFrom = require('resolve-from');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const webpack__default = /*#__PURE__*/_interopDefaultLegacy(webpack);
const colorette__default = /*#__PURE__*/_interopDefaultLegacy(colorette);
const ProgressBar__default = /*#__PURE__*/_interopDefaultLegacy(ProgressBar);
const ConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(ConsoleHandler);
const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const formatWebpackMessages__default = /*#__PURE__*/_interopDefaultLegacy(formatWebpackMessages);
const findUp__default = /*#__PURE__*/_interopDefaultLegacy(findUp);
const resolveFrom__default = /*#__PURE__*/_interopDefaultLegacy(resolveFrom);
const CaseSensitivePathsPlugin__default = /*#__PURE__*/_interopDefaultLegacy(CaseSensitivePathsPlugin);

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
    const appWebpackConfigPath = path.resolve('createAppWebpackConfig.js');

    if (fs.existsSync(appWebpackConfigPath)) {
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
nightingale.addConfig({
  key: 'pobpack-utils',
  handler: new ConsoleHandler__default(nightingale.levels.INFO)
});
const logger = new Logger__default('pobpack-utils', 'pobpack');
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
      this.logger.info('Compiling...');
    }); // compilation done

    compiler.hooks.done.tap(pluginName, stats => {
      const messages = formatWebpackMessages__default(stats.toJson({})); // const messages = stats.toJson({}, true);

      if (messages.errors.length > 0) {
        this.logger.critical('Failed to compile.');
        console.log();
        messages.errors.forEach(message => {
          console.log(message);
          console.log();
        });
        return;
      }

      if (process.send) process.send('ready');

      if (messages.warnings.length > 0) {
        this.logger.critical('Compiled with warnings.');
        console.log();
        messages.warnings.forEach(message => {
          console.log(message);
          console.log();
        });
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
  const compiler = webpack__default(webpackConfig);

  if (progressBar && process.stdout.isTTY) {
    let bar;
    const progressPlugin = new webpack.ProgressPlugin((percentage, msg) => {
      if (percentage === 0) {
        bar = new ProgressBar__default(`${colorette__default.bold(colorette__default.yellow(`Building ${bundleName} bundle...`))} ${colorette__default.bold(':percent')} [:bar] → :msg`, {
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
      }
    });
    progressPlugin.apply(compiler);
  } // human-readable error messages


  new FriendlyErrorsWebpackPlugin({
    bundleName,
    successMessage
  }).apply(compiler);
  const promisifyRun = util.promisify(compiler.run.bind(compiler));
  return {
    compiler,
    webpackConfig,
    clean: () => {
      var _webpackConfig$output;

      if ((_webpackConfig$output = webpackConfig.output) !== null && _webpackConfig$output !== void 0 && _webpackConfig$output.path) {
        child_process.execSync(`rm -Rf ${webpackConfig.output.path}`);
      }
    },
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
      include: [path.resolve(options.paths.src), ...options.includeModules.map(includeModule => {
        const packageJson = findUp__default.sync('package.json', {
          cwd: path.dirname( // requireFromPwd.resolve(includeModule)
          fs.realpathSync(resolveFrom__default(process.cwd(), includeModule)))
        });
        if (!packageJson) return;
        return packageJson.slice(0, -12);
      }).filter(ExcludesFalsy), ...options.includePaths],
      loaders: [{
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
  options.env !== 'production' && new CaseSensitivePathsPlugin__default(), new webpack__default.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(options.env),
    ...options.defines
  }), options.hmr && new webpack__default.HotModuleReplacementPlugin(),
  /* replace object-assign ponyfill to use native implementation */
  // Array.isArray
  new webpack__default.NormalModuleReplacementPlugin(/.*\/node_modules\/isarray\/index.js$/, require.resolve('../replacements/Array.isArray.js')), // Object.assign
  new webpack__default.NormalModuleReplacementPlugin(/.*\/node_modules\/(object-assign|extend-shallow)\/index.js$/, require.resolve('../replacements/Object.assign.js')), // Object.setPrototypeOf
  new webpack__default.NormalModuleReplacementPlugin(/.*\/node_modules\/setprototypeof\/index.js$/, require.resolve('../replacements/Object.setPrototypeOf.js')), // Promise
  new webpack__default.NormalModuleReplacementPlugin(/.*\/node_modules\/any-promise\/index.js$/, require.resolve('../replacements/Promise.js')), // String.prototype.repeat
  new webpack__default.NormalModuleReplacementPlugin(/.*\/node_modules\/repeat-string\/index.js$/, require.resolve('../replacements/String.prototype.repeat.js')), // Symbol.observable
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
    modules: ['node_modules', path.resolve('src')],
    extensions: [options.typescript && '.ts', options.typescript && '.tsx', '.mjs', '.js', '.jsx'].filter(ExcludesFalse),
    mainFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:${prefix}-dev`, `module:${prefix}`, // old `webpack:` syntax
    options.env !== 'production' && `webpack:${prefix}-dev`, `webpack:${prefix}`])), options.env !== 'production' && 'module-dev', 'module', // old webpack: syntax
    options.env !== 'production' && 'webpack:main-dev', 'webpack:main', ...(!modulePrefixPackageFields.includes('browser') ? [] : [// Browser builds
    options.env !== 'production' && 'browser-dev', 'browser']), options.env !== 'production' && 'main-dev', 'main'].filter(ExcludesFalse),
    aliasFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:aliases-${prefix}-dev`, `module:aliases-${prefix}`, // old webpack: syntax
    options.env !== 'production' && `webpack:aliases-${prefix}-dev`, `webpack:aliases-${prefix}`])), options.env !== 'production' && 'module:aliases-dev', 'module:aliases', // old webpack: syntax
    options.env !== 'production' && 'webpack:aliases-dev', 'webpack:aliases', 'webpack', modulePrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev', modulePrefixPackageFields.includes('browser') && 'browser'].filter(ExcludesFalse),
    alias: options.aliases
  };
}

exports.webpack = webpack__default;
exports.createAppWebpackConfig = createAppWebpackConfig;
exports.createModuleConfig = createModuleConfig;
exports.createOptions = createOptions;
exports.createPluginsConfig = createPluginsConfig;
exports.createPobpackCompiler = createPobpackCompiler;
exports.createResolveConfig = createResolveConfig;
//# sourceMappingURL=index-node12.cjs.js.map
