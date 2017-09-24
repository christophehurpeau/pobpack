'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

require('../createOptions');

exports.default = options => ({
  strictExportPresence: true,

  rules: [
  // Disable require.ensure as it's not a standard language feature.
  { parser: { requireEnsure: false } },

  // json
  {
    test: /\.json$/,
    loader: 'json-loader'
  },

  // jsx?
  {
    test: /\.jsx?$/,
    include: [(0, _path.resolve)(options.paths.src), ...options.includeModules.map(includeModule => (0, _fs.realpathSync)((0, _path.resolve)('node_modules', includeModule))), ...options.includePaths],
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
});
//# sourceMappingURL=createModuleConfig.js.map