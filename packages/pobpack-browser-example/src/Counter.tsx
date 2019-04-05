import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default hot(Counter);
