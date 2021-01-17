import type { ReactElement } from 'react';
import React, { useState } from 'react';

export default function Counter(): ReactElement {
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
