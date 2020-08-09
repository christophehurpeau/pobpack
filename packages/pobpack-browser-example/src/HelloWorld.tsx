import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ObjectAssign from 'object-assign';

const HelloWorld = () => <div>Hello World !</div>;

export default HelloWorld;

// export default () => {
//   console.log(new Error('fail'));
//   throw new Error('Error Thrown ! You can see the stack trace below:');
// };

(async function test() {
  console.log(await new Promise((resolve) => resolve('ok')));
  console.log(ObjectAssign({}, { a: true }));
})();
