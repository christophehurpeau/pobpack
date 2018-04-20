module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    babel: {
      presets: [
        [require.resolve('pobpack-browser/babel'), {
          targets: {
            esmodules: options.entries[0].key === 'modern',
          }
        }],
        [require.resolve('@babel/preset-react'), { development: config.env !== 'production' }],
      ],
    },
  }));
};
