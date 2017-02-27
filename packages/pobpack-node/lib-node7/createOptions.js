'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = options => ({
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  resolveLoaderModules: options.resolveLoaderModules,
  babel: options.babel,
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  plugins: options.plugins,
  prependPlugins: options.prependPlugins,
  paths: Object.assign({ src: 'src', build: 'build', entry: 'index.js' }, options.paths)
});
//# sourceMappingURL=createOptions.js.map