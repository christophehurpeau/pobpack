if (process.env.NODE_ENV !== 'production') {
  if (!Object.assign) {
    throw new Error(
      'Array.isArray is missing, you can use https://polyfill.io/v2/polyfill.min.js?features=Array.isArray',
    );
  }
}

module.exports = Array.isArray;
