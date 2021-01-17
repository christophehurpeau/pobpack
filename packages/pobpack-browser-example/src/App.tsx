import type { ReactElement } from 'react';
import React from 'react';
import Counter from './Counter';
import HelloWorld from './HelloWorld';

export default function App(): ReactElement {
  return (
    <div>
      <HelloWorld />
      <Counter />
    </div>
  );
}
