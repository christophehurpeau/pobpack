/* eslint-disable spaced-comment */
/// <reference types="webpack-env" />

// https://github.com/Microsoft/TypeScript/issues/15230
export const _ = '';

const interval = setInterval(() => {
  console.log('hello !');
}, 1000);

if (module.hot) {
  module.hot.dispose(() => clearInterval(interval));
}
