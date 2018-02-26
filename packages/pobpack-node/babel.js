/* eslint-disable strict */

'use strict';

module.exports = {
  presets: [
    [
      require.resolve('babel-preset-latest-node'),
      {
        target: 'current',
        modules: false,
        useBuiltIns: true,
      },
    ],
  ],

  plugins: [],
};
