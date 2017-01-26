module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    jsLoaders: ['webpack-module-hot-accept'],
  }));
};
