import { appLogger } from 'nightingale-app-console';
import type { ReactElement } from 'react';
import React, { useState } from 'react';

const counterLogger = appLogger.child('counter');

export default function Counter(): ReactElement {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        type="button"
        onClick={() => {
          counterLogger.info('inc', { count });
          setCount(count + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}
