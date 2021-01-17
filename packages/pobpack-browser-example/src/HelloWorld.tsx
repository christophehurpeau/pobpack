// eslint-disable-next-line import/no-extraneous-dependencies
import ObjectAssign from 'object-assign';
import type { ReactElement } from 'react';
import React from 'react';

function HelloWorld(): ReactElement {
  return <div>Hello World !</div>;
}

export default HelloWorld;

// export default () => {
//   console.log(new Error('fail'));
//   throw new Error('Error Thrown ! You can see the stack trace below:');
// };

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function test() {
  console.log(await new Promise((resolve) => resolve('ok')));
  console.log(ObjectAssign({}, { a: true }));
})();
