if (process.env.NODE_ENV !== 'production') {
  if (!Object.assign) {
    throw new Error(
      'Object.assign is missing, you can use https://polyfill.io/v2/polyfill.min.js?features=Object.assign',
    );
  }
}

module.exports = Object.assign;
