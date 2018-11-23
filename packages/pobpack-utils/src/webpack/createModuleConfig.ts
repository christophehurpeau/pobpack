import { realpathSync } from 'fs';
import { resolve } from 'path';
import resolveFrom from 'resolve-from';
import { Options } from 'pobpack-types';

export default (options: Options) => ({
  strictExportPresence: true,

  rules: [
    // Disable require.ensure as it's not a standard language feature.
    { parser: { requireEnsure: false } },

    // tsx? / jsx?
    {
      test: options.typescript ? /\.[tj]sx?$/ : /\.jsx?$/,
      include: [
        resolve(options.paths.src as string),
        ...options.includeModules.map((includeModule) =>
          realpathSync(
            resolveFrom(process.cwd(), includeModule).replace(
              new RegExp(
                `(node_modules/${includeModule.replace('-', '\\-')}.*$)`,
              ),
              '$1',
            ),
          ),
        ),
        ...options.includePaths,
      ],
      loaders: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            cacheDirectory: true,
            ...options.babel,
          },
        },
        ...(options.jsLoaders || []),
      ],
    },

    // other rules
    ...(options.moduleRules || []),
  ],
});
