'use strict';

module.exports = function (config, options) {
  return config({
    ...options,
    typescript: true,
    babel: {
      presets: [
        [
          require.resolve('pobpack-browser/babel'),
          {
            targets: {
              esmodules: options.entries[0].key === 'modern',
            },
          },
        ],
        require.resolve('@babel/preset-typescript'),
        [
          require.resolve('@babel/preset-react'),
          { development: config.env !== 'production' },
        ],
      ],
    },
  });
};
