module.exports = function(config, options) {
  return config({
    ...options,
    typescript: true,
    // jsLoaders: ['webpack-module-hot-accept'],
  });
};
