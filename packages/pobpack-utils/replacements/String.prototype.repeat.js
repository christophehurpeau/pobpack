if (process.env.NODE_ENV !== 'production') {
  if (!String.prototype.repeat) {
    throw new Error(
      'String.prototype.repeat is missing, you can use https://polyfill.io/v2/polyfill.min.js?features=String.prototype.repeat',
    );
  }
}

module.exports = function repeat(str, num) {
  return str.repeat(num);
};
