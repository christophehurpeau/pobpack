/* eslint-disable strict */

'use strict';

module.exports = {
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        modules: false,
        useBuiltIns: true,
      },
    ],
  ],

  plugins: [],
};
