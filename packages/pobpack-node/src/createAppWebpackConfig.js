import path from 'path';
import { existsSync } from 'fs';
import webpackConfig from './createWebpackConfig';
import createOptions from './createOptions';

export default (options) => {
  options = createOptions(options);
  const appWebpackConfigPath = path.resolve('createAppWebpackConfig.js');
  if (existsSync(appWebpackConfigPath)) {
    console.log('Using app createAppWebpackConfig.js');
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const appWebpackConfigCreator = require(appWebpackConfigPath);
    if (typeof appWebpackConfigCreator !== 'function') {
      console.error(
        'app createAppWebpackConfig.js should export a function\n'
        + 'module.exports = function (config, options) { ... }'
      );
    }

    const config = appWebpackConfigCreator(webpackConfig, options);

    if (typeof config !== 'object') {
      console.error(
        'app createAppWebpackConfig.js should return the config\n'
        + 'function (config, options) { return config; }'
      );
    }

    return config;
  } else {
    return webpackConfig(options);
  }
};
