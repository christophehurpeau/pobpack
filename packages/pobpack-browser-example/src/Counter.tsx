import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

export default function Counter() {
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
