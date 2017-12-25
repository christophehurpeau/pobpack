/* eslint-disable prettier/prettier */
import { resolve } from 'path';
import { type OptionsType } from '../createOptions';

export default (modulePrefixPackageFields: Array<string>, options: OptionsType) => ({
  cacheWithContext: false,

  modules: ['node_modules', resolve('src')],
  extensions: ['.js', '.jsx'],

  mainFields: [
    ...[].concat(...modulePrefixPackageFields.map(prefix => ([
      options.env !== 'production' && `module:${prefix}-dev`,
      `module:${prefix}`,
      // old `webpack:` syntax
      options.env !== 'production' && `webpack:${prefix}-dev`,
      `webpack:${prefix}`,
    ]))),

    options.env !== 'production' && 'module-dev',
    'module',
    // old webpack: syntax
    options.env !== 'production' && 'webpack:main-dev',
    'webpack:main',

    ...(!modulePrefixPackageFields.includes('browser') ? [
    ] : [
      // Browser builds
      options.env !== 'production' && 'browser-dev',
      'browser',
    ]),
    options.env !== 'production' && 'main-dev',
    'main',
  ].filter(Boolean),

  aliasFields: [
    ...[].concat(...modulePrefixPackageFields.map(prefix => ([
      options.env !== 'production' && `module:aliases-${prefix}-dev`,
      `module:aliases-${prefix}`,

      // old webpack: syntax
      options.env !== 'production' && `webpack:aliases-${prefix}-dev`,
      `webpack:aliases-${prefix}`,
    ]))),

    options.env !== 'production' && 'module:aliases-dev',
    'module:aliases',

    // old webpack: syntax
    options.env !== 'production' && 'webpack:aliases-dev',
    'webpack:aliases',
    'webpack',
    modulePrefixPackageFields.includes('browser') && options.env !== 'production' && 'browser-dev',
    modulePrefixPackageFields.includes('browser') && 'browser',
  ].filter(Boolean),

  alias: options.aliases,
});
