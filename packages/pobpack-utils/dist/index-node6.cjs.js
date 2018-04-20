'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var path__default = _interopDefault(path);
var fs = require('fs');
var nightingale = require('nightingale');
var Logger = _interopDefault(require('nightingale-logger'));
var ConsoleHandler = _interopDefault(require('nightingale-console'));
var formatWebpackMessages = _interopDefault(require('react-dev-utils/formatWebpackMessages'));
var child_process = require('child_process');
var util = require('util');
var chalk = _interopDefault(require('chalk'));
var ProgressBar = _interopDefault(require('progress'));
var webpack = _interopDefault(require('webpack'));
var ProgressPlugin = _interopDefault(require('webpack/lib/ProgressPlugin'));
var CaseSensitivePathsPlugin = _interopDefault(require('case-sensitive-paths-webpack-plugin'));

// /* eslint-disable flowtype/no-weak-types */
//
var createOptions = (options => ({
  aliases: options.aliases || {},
  babel: options.babel,
  defines: options.defines || {},
  entries: options.entries || ['index'],
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  includeModules: options.includeModules || [],
  includePaths: options.includePaths || [],
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  paths: Object.assign({ src: 'src', build: 'build' }, options.paths),
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
      console.log('Using app createAppWebpackConfig.js');
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const appWebpackConfigCreator = require(appWebpackConfigPath);
      if (typeof appWebpackConfigCreator !== 'function') {
        console.error('app createAppWebpackConfig.js should export a function\nmodule.exports = function (config, options) { ... }');
      }

      options = createOptions(options);
      const config = appWebpackConfigCreator(wrapCreateWebpackConfig, options);

      if (typeof config !== 'object') {
        console.error('app createAppWebpackConfig.js should return the config\nfunction (config, options) { return config; }');
      }

      return config;
    } else {
      return wrapCreateWebpackConfig(options);
    }
  };
});

/* eslint-disable no-console */

nightingale.addConfig({ key: 'pobpack-utils', handler: new ConsoleHandler(nightingale.levels.INFO) });
const logger = new Logger('pobpack-utils', 'pobpack');
const isSuccessful = messages => !messages.errors.length && !messages.warnings.length;

const plugin = { name: 'pobpack/FriendlyErrorsWebpackPlugin' };

let FriendlyErrorsWebpackPlugin = class {

  constructor(options) {
    Object.assign(this, options);
    this.logger = logger.context({ bundleName: options.bundleName });
  }

  apply(compiler) {
    // webpack is recompiling
    compiler.hooks.invalid.tap(plugin, () => {
      this.logger.info('Compiling...');
    });

    // compilation done
    compiler.hooks.done.tap(plugin, stats => {
      const messages = formatWebpackMessages(stats.toJson({}, true));
      // const messages = stats.toJson({}, true);

      if (isSuccessful(messages)) {
        this.logger.success('Compiled successfully!', { env: this.env });
        if (this.successMessage) {
          console.log(this.successMessage);
        }
        return;
      }

      if (messages.errors.length) {
        this.logger.critical('Failed to compile.');
        console.log();
        messages.errors.forEach(message => {
          console.log(message);
          console.log();
        });
        return;
      }

      if (messages.warnings.length) {
        this.logger.critical('Compiled with warnings.');
        console.log();
        messages.warnings.forEach(message => {
          console.log(message);
          console.log();
        });
      }
    });
  }
};

const buildThrowOnError = stats => {
  if (!stats.hasErrors()) {
    return stats;
  }

  throw new Error(stats.toString({}, true));
};

var createPobpackCompiler = ((bundleName, webpackConfig, { progressBar = true, successMessage } = {}) => {
  const compiler = webpack(Object.assign({}, webpackConfig));

  if (progressBar && process.stdout.isTTY) {
    let bar;
    const progressPlugin = new ProgressPlugin((percentage, msg) => {
      if (percentage === 0) {
        bar = new ProgressBar(`${chalk.yellow.bold(`Building ${bundleName} bundle...`)} ${chalk.bold(':percent')} [:bar] → :msg`, { incomplete: ' ', complete: '▇', total: 50, clear: true, stream: process.stdout });
        // } else if (percentage === 1) {
        //   // bar.clear();
        //   bar = null;
      } else {
        bar.update(percentage, { msg: msg.length > 20 ? `${msg.substr(0, 20)}...` : msg });
      }
    });
    progressPlugin.apply(compiler);
  }

  // human-readable error messages
  new FriendlyErrorsWebpackPlugin({ bundleName, successMessage }).apply(compiler);

  const promisifyRun = util.promisify(compiler.run.bind(compiler));

  return {
    compiler,
    webpackConfig,
    clean: () => webpackConfig.output.path && child_process.execSync(`rm -Rf ${webpackConfig.output.path}`),
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

  rules: [
  // Disable require.ensure as it's not a standard language feature.
  { parser: { requireEnsure: false } },

  // tsx? / jsx?
  {
    test: options.typescript ? /\.[tj]sx?$/ : /\.jsx?$/,
    include: [path.resolve(options.paths.src), ...options.includeModules.map(includeModule => fs.realpathSync(path.resolve('node_modules', includeModule))), ...options.includePaths],
    loaders: [{
      loader: require.resolve('babel-loader'),
      options: Object.assign({
        babelrc: false,
        cacheDirectory: true
      }, options.babel)
    }, ...(options.jsLoaders || [])]
  },

  // other rules
  ...(options.moduleRules || [])]
}));

var createPluginsConfig = (options => [...options.prependPlugins,

// ignore files when watching
new webpack.WatchIgnorePlugin([
// typescript definitions
/\.d\.ts$/]),

// enforces the entire path of all required modules match the exact case
// of the actual path on disk. Using this plugin helps alleviate cases
// for developers working on case insensitive systems like OSX.
options.env !== 'production' && new CaseSensitivePathsPlugin(), new webpack.DefinePlugin(Object.assign({
  'process.env.NODE_ENV': JSON.stringify(options.env)
}, options.defines)), options.hmr && new webpack.HotModuleReplacementPlugin(),

// replace object-assign ponyfill to use native implementation
new webpack.NormalModuleReplacementPlugin(/.*\/node_modules\/object-assign\/index.js/, require.resolve('../replacements/object-assign.js')), ...options.plugins].filter(Boolean));

/* eslint-disable prettier/prettier */

var createResolveConfig = ((modulePrefixPackageFields, options) => ({
  cacheWithContext: false,

  modules: ['node_modules', path.resolve('src')],
  extensions: [options.typescript && '.ts', options.typescript && '.tsx', '.js', '.jsx'].filter(Boolean),

  mainFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:${prefix}-dev`, `module:${prefix}`,
  // old `webpack:` syntax
  options.env !== 'production' && `webpack:${prefix}-dev`, `webpack:${prefix}`])), options.env !== 'production' && 'module-dev', 'module',
  // old webpack: syntax
  options.env !== 'production' && 'webpack:main-dev', 'webpack:main', ...(!modulePrefixPackageFields.includes('browser') ? [] : [
  // Browser builds
  options.env !== 'production' && 'browser-dev', 'browser']), options.env !== 'production' && 'main-dev', 'main'].filter(Boolean),

  aliasFields: [...[].concat(...modulePrefixPackageFields.map(prefix => [options.env !== 'production' && `module:aliases-${prefix}-dev`, `module:aliases-${prefix}`,

  // old webpack: syntax
  options.env !== 'production' && `webpack:aliases-${prefix}-dev`, `webpack:aliases-${prefix}`])), options.env !== 'production' && 'module:aliases-dev', 'module:aliases',

  // old webpack: syntax
  options.env !== 'production' && 'webpack:aliases-dev', 'webpack:aliases', 'webpack', modulePrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev', modulePrefixPackageFields.includes('browser') && 'browser'].filter(Boolean),

  alias: options.aliases
}));

exports.webpack = webpack;
exports.createAppWebpackConfig = createAppWebpackConfig;
exports.createOptions = createOptions;
exports.createPobpackCompiler = createPobpackCompiler;
exports.createModuleConfig = createModuleConfig;
exports.createPluginsConfig = createPluginsConfig;
exports.createResolveConfig = createResolveConfig;
//# sourceMappingURL=index-node6.cjs.js.map
