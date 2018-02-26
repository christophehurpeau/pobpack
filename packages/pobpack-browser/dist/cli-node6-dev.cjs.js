'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var pobpackUtils = require('pobpack-utils');
var hotLoaderBabelPlugin = _interopDefault(require('react-hot-loader/babel'));
var _t = _interopDefault(require('flow-runtime'));
var WebpackDevServer = _interopDefault(require('webpack-dev-server'));

const OptionsType = _t.tdz(() => pobpackUtils.OptionsType);
const BrowserTargetType = _t.type('BrowserTargetType', _t.union(_t.string('modern'), _t.string('all')));


const MODERN = 'modern';
const ALL = 'all';
const TARGETS = [ALL, MODERN];

var createBrowserWebpackConfig = (target => {
  _t.param('target', BrowserTargetType).assert(target);
  return options => {
    let _optionsType = _t.ref(OptionsType);

    _t.param('options', _optionsType).assert(options);
    return {
      // Don't attempt to continue if there are any errors.
      bail: options.env === 'production',

      // Target web
      target: 'web',

      // get right stack traces
      devtool: options.env === 'production' ? 'nosources-source-map' : 'source-map',

      // use cache
      cache: options.hmr,

      devServer: {
        // don't watch node_modules (improve cpu and memory usage)
        watchOptions: {
          ignored: /node_modules/
        }
      },

      // Some libraries import Node modules but don't use them in the browser.
      // Tell Webpack to provide empty mocks for them so importing them works.
      // fs and module are used by source-map-support
      node: {
        fs: 'empty',
        module: 'empty'
      },

      resolveLoader: {
        modules: options.resolveLoaderModules || ['node_modules']
      },

      resolve: pobpackUtils.createResolveConfig([target === MODERN && 'modern-browsers', 'browser'].filter(Boolean), Object.assign({}, options, {
        babel: Object.assign({
          presets: [require.resolve('../babel')]
        }, options.babel, {
          plugins: [options.hmr && hotLoaderBabelPlugin, ...(options.babel.plugins || [])].filter(Boolean)
        })
      })),

      entry: options.entries.reduce((entries, entry) => {
        if (typeof entry === 'string') entry = { key: entry, path: entry };
        entries[entry.key] = [target !== MODERN && require.resolve('babel-regenerator-runtime'), options.hmr && require.resolve('react-hot-loader/patch'), options.hmr && require.resolve('react-dev-utils/webpackHotDevClient'), path.join(path.resolve(options.paths.src), entry.path)].filter(Boolean);
        return entries;
      }, {}),

      output: {
        path: path.resolve(options.paths.build),
        devtoolModuleFilenameTemplate: 'file://[absolute-resource-path]'
      },

      module: pobpackUtils.createModuleConfig(options),

      plugins: pobpackUtils.createPluginsConfig(options)
    };
  };
});

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

const OptionsType$1 = _t.tdz(() => pobpackUtils.OptionsType);

const PobpackCompilerType = _t.tdz(() => pobpackUtils.PobpackCompilerType);

const WatchCallbackType = _t.tdz(() => pobpackUtils.WatchCallbackType);

const createAppBrowserCompiler = (target, options, compilerOptions) => {
  let _targetType = _t.string();

  let _optionsType = _t.ref(OptionsType$1);

  const _returnType = _t.return(_t.ref(PobpackCompilerType));

  _t.param('target', _targetType).assert(target);

  _t.param('options', _optionsType).assert(options);

  return _returnType.assert(pobpackUtils.createPobpackCompiler(target, pobpackUtils.createAppWebpackConfig(createBrowserWebpackConfig(target))(Object.assign({}, options, {
    paths: Object.assign({ build: 'public' }, options.paths)
  })), compilerOptions));
};

const build = (options = {}) => {
  const compilers = TARGETS.map(t => createAppBrowserCompiler(t, Object.assign({}, options, { hmr: false })));
  compilers[0].clean();
  return compilers.map(compiler => compiler.run());
};

const RunOptions = _t.type('RunOptions', _t.object(_t.property('host', _t.string(), true), _t.property('port', _t.number()), _t.property('https', _t.nullable(_t.boolean()), true)));

const runDevServer = (compiler, options) => {
  let _compilerType = _t.ref(PobpackCompilerType);

  _t.param('compiler', _compilerType).assert(compiler);

  _t.param('options', RunOptions).assert(options);

  const { host, port, https } = options,
        webpackDevServerOptions = objectWithoutProperties(options, ['host', 'port', 'https']);
  const browserDevServer = new WebpackDevServer(compiler.compiler, Object.assign({
    hot: true,
    // stats: 'errors-only',
    quiet: true, // errors are displayed with friendly-errors plugin
    // without page refresh as fallback in case of build failures: hotOnly: true,
    https,
    overlay: true
  }, webpackDevServerOptions));
  browserDevServer.listen(port, host);
  return browserDevServer;
};
const watchAndRunDevServer = (options, runOptions) => {
  let _optionsType3 = _t.ref(OptionsType$1);

  _t.param('options', _optionsType3).assert(options);

  _t.param('runOptions', RunOptions).assert(runOptions);

  const url = `http${runOptions.https ? 's' : ''}://localhost:${runOptions.port}`;
  const compiler = createAppBrowserCompiler(MODERN, Object.assign({}, options, { hmr: true }), {
    successMessage: `Your application is running here: ${url}`
  });
  compiler.clean();
  const webpackDevServer = runDevServer(compiler, runOptions);
  return Object.assign({}, compiler, { webpackDevServer });
};

const cmd = process.argv[2];

if (cmd === 'build') {
  build();
} else if (cmd === 'start' || !cmd) {
  watchAndRunDevServer({}, { port: Number(process.env.PORT) || 8080, https: false });
} else {
  console.log(`Invalid command: ${cmd}`);
  process.exit(1);
}
//# sourceMappingURL=cli-node6-dev.cjs.js.map
