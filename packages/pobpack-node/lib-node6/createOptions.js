'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = options => ({
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  resolveLoaderModules: options.resolveLoaderModules,
  babel: options.babel,
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  plugins: options.plugins,
  prependPlugins: options.prependPlugins,
  paths: _extends({ src: 'src', build: 'build', entry: 'index.js' }, options.paths)
});
//# sourceMappingURL=createOptions.js.map