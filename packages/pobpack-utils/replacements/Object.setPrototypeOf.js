if (process.env.NODE_ENV !== 'production') {
  if (!Object.assign) {
    throw new Error(
      'Object.setPrototypeOf is missing, you can use https://polyfill.io/v2/polyfill.min.js?features=Object.setPrototypeOf',
    );
  }
}

module.exports = Object.setPrototypeOf;
