import { type OptionsType } from '../createOptions';

export default (webpackPrefixPackageFields: Array<string>, options: OptionsType) => ({
  modules: ['node_modules'],
  extensions: ['.js', '.jsx'],

  mainFields: [
    ...[].concat(...webpackPrefixPackageFields.map(prefix => ([
      options.env !== 'production' && `webpack:${prefix}-dev`,
      `webpack:${prefix}`,
    ]))),
    options.env !== 'production' && 'webpack:main-dev',
    'webpack:main',
    webpackPrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev',
    webpackPrefixPackageFields.includes('browser') && 'browser',
    options.env !== 'production' && 'main-dev',
    'main',
  ].filter(Boolean),

  aliasFields: [
    ...[].concat(...webpackPrefixPackageFields.map(prefix => ([
      options.env !== 'production' && `webpack:aliases-${prefix}-dev`,
      `webpack:aliases-${prefix}`,
    ]))),
    options.env !== 'production' && 'webpack:aliases-dev',
    'webpack:aliases',
    'webpack',
    webpackPrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev',
    webpackPrefixPackageFields.includes('browser') && 'browser',
  ].filter(Boolean),
});
