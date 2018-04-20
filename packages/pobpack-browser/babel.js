/* eslint-disable strict, import/no-commonjs */

'use strict';

module.exports = function(context, opts) {
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        // pass options but force modules to false
        Object.assign({}, opts, { modules: false }),
      ],
    ],

    plugins: [require.resolve('@babel/plugin-external-helpers')],
  };
};
