import { type OptionsType } from '../createOptions';

export default (options: OptionsType) => ({
  // force import to be present
  // strictExportPresence: true,

  rules: [
    // Disable require.ensure as it's not a standard language feature.
    { parser: { requireEnsure: false } },

    // json
    {
      test: /\.json$/,
      loader: 'json-loader',
    },

    // jsx?
    {
      test: /\.jsx?$/,
      exclude: [
        new RegExp(
          // eslint-disable-next-line prefer-template
          'node_modules/'
          + (!options.includeModules || options.includeModules.length === 0 ? ''
            : `(?!(?:${options.includeModules.join('|')}))/`
          )
        ),
        options.paths.build,
      ],
      loaders: [
        {
          loader: 'babel-loader',
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
