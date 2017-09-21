module.exports = function(config, options) {
  return config({
    ...options,
    jsLoaders: ['webpack-module-hot-accept'],
  });
};
