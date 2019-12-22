/* eslint-disable prettier/prettier */
import { resolve } from 'path';
import webpack from 'webpack';
import { Options } from 'pobpack-types';

const ExcludesFalse = Boolean as any as <T>(x: T | false) => x is T;

export default function createResolveConfig(
  modulePrefixPackageFields: string[],
  options: Options,
): webpack.Resolve {
  return {
    // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/25209
    // cacheWithContext: false,

    modules: [
      'node_modules',
      resolve('src'),
    ],
    extensions: ([
      options.typescript && '.ts',
      options.typescript && '.tsx',
      '.mjs',
      '.js',
      '.jsx',
    ] as (string | false)[]).filter(ExcludesFalse),

    mainFields: [
      ...([] as (string | false)[]).concat(...modulePrefixPackageFields.map((prefix: string): (string | false)[] => ([
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

      ...(!modulePrefixPackageFields.includes('browser') ? [] : [
        // Browser builds
        options.env !== 'production' && 'browser-dev',
        'browser',
      ]),
      options.env !== 'production' && 'main-dev',
      'main',
    ].filter(ExcludesFalse) as string[],

    aliasFields: [
      ...([] as (string | false)[]).concat(...modulePrefixPackageFields.map((prefix: string): (string | false)[] => ([
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
    ].filter(ExcludesFalse) as string[],

    alias: options.aliases,
  };
}
