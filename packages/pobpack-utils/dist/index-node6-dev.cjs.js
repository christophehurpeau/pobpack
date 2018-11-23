'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var child_process = require('child_process');
var util = require('util');
var colorette = _interopDefault(require('colorette'));
var ProgressBar = _interopDefault(require('progress'));
var nightingale = require('nightingale');
var Logger = _interopDefault(require('nightingale-logger'));
var ConsoleHandler = _interopDefault(require('nightingale-console'));
var formatWebpackMessages = _interopDefault(require('react-dev-utils/formatWebpackMessages'));
var fs = require('fs');
var resolveFrom = _interopDefault(require('resolve-from'));
var webpack = require('webpack');
var webpack__default = _interopDefault(webpack);
var CaseSensitivePathsPlugin = _interopDefault(require('case-sensitive-paths-webpack-plugin'));
var path = require('path');
var path__default = _interopDefault(path);

var createOptions = (options => ({
  aliases: options.aliases || {},
  babel: options.babel || {},
  defines: options.defines || {},
  entries: options.entries || ['index'],
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  includeModules: options.includeModules || [],
  includePaths: options.includePaths || [],
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  paths: Object.assign({
    src: 'src',
    build: 'build'
  }, options.paths),
  plugins: options.plugins || [],
  prependPlugins: options.prependPlugins || [],
  resolveLoaderModules: options.resolveLoaderModules,
  typescript: options.typescript || false,
  webpackPrefixPackageFields: options.webpackPrefixPackageFields || []
}));

var createAppWebpackConfig = (createWebpackConfig => {
  const wrapCreateWebpackConfig = options => createWebpackConfig(createOptions(options));

  return options => {
    const appWebpackConfigPath = path__default.resolve('createAppWebpackConfig.js');

    if (fs.existsSync(appWebpackConfigPath)) {
      console.info('Using app createAppWebpackConfig.js'); // eslint-disable-next-line import/no-dynamic-require, global-require, typescript/no-var-requires

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
});

/* eslint-disable no-console */
nightingale.addConfig({
  key: 'pobpack-utils',
  handler: new ConsoleHandler(nightingale.levels.INFO)
});
const logger = new Logger('pobpack-utils', 'pobpack');

const isSuccessful = messages => !messages.errors.length && !messages.warnings.length;

const pluginName = 'pobpack/FriendlyErrorsWebpackPlugin';
class FriendlyErrorsWebpackPlugin {
  constructor(options) {
    this.logger = void 0;
    this.bundleName = void 0;
    this.successMessage = void 0;
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
      const messages = formatWebpackMessages(stats.toJson({})); // const messages = stats.toJson({}, true);

      if (isSuccessful(messages)) {
        this.logger.success('Compiled successfully!');

        if (this.successMessage) {
          console.log(this.successMessage);
        }

        return;
      }

      if (messages.errors.length !== 0) {
        this.logger.critical('Failed to compile.');
        console.log();
        messages.errors.forEach(message => {
          console.log(message);
          console.log();
        });
        return;
      }

      if (messages.warnings.length !== 0) {
        this.logger.critical('Compiled with warnings.');
        console.log();
        messages.warnings.forEach(message => {
          console.log(message);
          console.log();
        });
      }
    });
  }

}

const buildThrowOnError = stats => {
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({}));
};

var createPobpackCompiler = ((bundleName, webpackConfig, {
  progressBar = true,
  successMessage
} = {}) => {
  const compiler = webpack__default(webpackConfig);

  if (progressBar && process.stdout.isTTY) {
    let bar;
    const progressPlugin = new webpack.ProgressPlugin((percentage, msg) => {
      if (percentage === 0) {
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
          msg: msg.length > 20 ? `${msg.substr(0, 20)}...` : msg
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
      if (webpackConfig.output && webpackConfig.output.path) {
        return child_process.execSync(`rm -Rf ${webpackConfig.output.path}`);
      }
    },
    run: () => promisifyRun().then(buildThrowOnError),
    watch: callback => compiler.watch({}, (err, stats) => {
      if (err) return;
      if (stats.hasErrors()) return;
      buildThrowOnError(stats);
      callback(stats);
    })
  };
});

var createModuleConfig = (options => ({
  strictExportPresence: true,
  rules: [// Disable require.ensure as it's not a standard language feature.
  {
    parser: {
      requireEnsure: false
    }
  }, // tsx? / jsx?
  {
    test: options.typescript ? /\.[tj]sx?$/ : /\.jsx?$/,
    include: [path.resolve(options.paths.src), ...options.includeModules.map(includeModule => fs.realpathSync(resolveFrom(process.cwd(), includeModule).replace(new RegExp(`(node_modules/${includeModule.replace('-', '\\-')}.*$)`), '$1'))), ...options.includePaths],
    loaders: [{
      loader: require.resolve('babel-loader'),
      options: Object.assign({
        babelrc: false,
        cacheDirectory: true
      }, options.babel)
    }, ...(options.jsLoaders || [])]
  }, // other rules
  ...(options.moduleRules || [])]
}));

var createPluginsConfig = (options => [...options.prependPlugins, // ignore files when watching
new webpack__default.WatchIgnorePlugin([// typescript definitions
/\.d\.ts$/]), // enforces the entire path of all required modules match the exact case
// of the actual path on disk. Using this plugin helps alleviate cases
// for developers working on case insensitive systems like OSX.
options.env !== 'production' && new CaseSensitivePathsPlugin(), new webpack__default.DefinePlugin(Object.assign({
  'process.env.NODE_ENV': JSON.stringify(options.env)
}, options.defines)), options.hmr && new webpack__default.HotModuleReplacementPlugin(),
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
...options.plugins].filter(Boolean));

/* eslint-disable prettier/prettier */
const ExcludesFalse = Boolean;
var createResolveConfig = ((modulePrefixPackageFields, options) => ({
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/25209
  // cacheWithContext: false,
  modules: ['node_modules', path.resolve('src')],
  extensions: [options.typescript && '.ts', options.typescript && '.tsx', '.js', '.jsx'].filter(ExcludesFalse),
  mainFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:${prefix}-dev`, `module:${prefix}`, // old `webpack:` syntax
  options.env !== 'production' && `webpack:${prefix}-dev`, `webpack:${prefix}`])), options.env !== 'production' && 'module-dev', 'module', // old webpack: syntax
  options.env !== 'production' && 'webpack:main-dev', 'webpack:main', ...(!modulePrefixPackageFields.includes('browser') ? [] : [// Browser builds
  options.env !== 'production' && 'browser-dev', 'browser']), options.env !== 'production' && 'main-dev', 'main'].filter(ExcludesFalse),
  aliasFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:aliases-${prefix}-dev`, `module:aliases-${prefix}`, // old webpack: syntax
  options.env !== 'production' && `webpack:aliases-${prefix}-dev`, `webpack:aliases-${prefix}`])), options.env !== 'production' && 'module:aliases-dev', 'module:aliases', // old webpack: syntax
  options.env !== 'production' && 'webpack:aliases-dev', 'webpack:aliases', 'webpack', modulePrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev', modulePrefixPackageFields.includes('browser') && 'browser'].filter(ExcludesFalse),
  alias: options.aliases
}));

exports.webpack = webpack__default;
exports.createAppWebpackConfig = createAppWebpackConfig;
exports.createOptions = createOptions;
exports.createPobpackCompiler = createPobpackCompiler;
exports.createModuleConfig = createModuleConfig;
exports.createPluginsConfig = createPluginsConfig;
exports.createResolveConfig = createResolveConfig;
//# sourceMappingURL=index-node6-dev.cjs.js.map
