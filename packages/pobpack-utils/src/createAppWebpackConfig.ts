import path from 'path';
import { existsSync } from 'fs';
import webpack from 'webpack';
import { Options } from 'pobpack-types';
import createOptions from './createOptions';

export type CreateWebpackConfig = (options: Options) => webpack.Configuration;

export default (createWebpackConfig: CreateWebpackConfig) => {
  const wrapCreateWebpackConfig = (options: Partial<Options>) =>
    createWebpackConfig(createOptions(options));

  return (options: Partial<Options>) => {
    const appWebpackConfigPath = path.resolve('createAppWebpackConfig.js');
    if (existsSync(appWebpackConfigPath)) {
      console.info('Using app createAppWebpackConfig.js');
      // eslint-disable-next-line import/no-dynamic-require, global-require, typescript/no-var-requires
      const appWebpackConfigCreator = require(appWebpackConfigPath);
      if (typeof appWebpackConfigCreator !== 'function') {
        console.error(
          'app createAppWebpackConfig.js should export a function\n' +
            'module.exports = function (config, options) { ... }',
        );
      }

      options = createOptions(options);
      const config = appWebpackConfigCreator(wrapCreateWebpackConfig, options);

      if (typeof config !== 'object') {
        console.error(
          'app createAppWebpackConfig.js should return the config\n' +
            'function (config, options) { return config(options); }',
        );
      }

      return config;
    } else {
      return wrapCreateWebpackConfig(options);
    }
  };
};
