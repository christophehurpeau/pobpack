if (process.env.NODE_ENV !== 'production') {
  if (!global.Promise) {
    throw new Error(
      'Object.assign is missing, you can use https://polyfill.io/v2/polyfill.min.js?features=Promise',
    );
  }
}

module.exports = Promise;
