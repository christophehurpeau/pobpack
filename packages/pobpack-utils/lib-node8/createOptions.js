'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* eslint-disable flowtype/no-weak-types */

exports.default = options => ({
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  resolveLoaderModules: options.resolveLoaderModules,
  webpackPrefixPackageFields: options.webpackPrefixPackageFields || [],
  babel: options.babel,
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  plugins: options.plugins || [],
  prependPlugins: options.prependPlugins || [],
  paths: Object.assign({ src: 'src', build: 'build' }, options.paths),
  entries: options.entries || ['index'],
  includeModules: options.includeModules || [],
  includePaths: options.includePaths || [],
  defines: options.defines || {},
  aliases: options.aliases || {}
});
//# sourceMappingURL=createOptions.js.map