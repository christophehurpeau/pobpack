module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    babel: {
      presets: [
        require.resolve('pobpack-browser/babel'),
        [require.resolve('babel-preset-pob-react'), { production: config.env === 'production' }],
      ],
    },
  }));
};
