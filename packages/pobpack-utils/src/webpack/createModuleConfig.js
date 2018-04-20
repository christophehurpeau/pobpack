import { realpathSync } from 'fs';
import { resolve } from 'path';
import { type OptionsType } from '../createOptions';

export default (options: OptionsType) => ({
  strictExportPresence: true,

  rules: [
    // Disable require.ensure as it's not a standard language feature.
    { parser: { requireEnsure: false } },

    // tsx? / jsx?
    {
      test: options.typescript ? /\.[tj]sx?$/ : /\.jsx?$/,
      include: [
        resolve(options.paths.src),
        ...options.includeModules.map(includeModule =>
          realpathSync(resolve('node_modules', includeModule)),
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
