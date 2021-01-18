import { appLogger } from 'nightingale-app-console';
import type { ReactElement } from 'react';
import React from 'react';

const clickToThrowLogger = appLogger.child('counter');

export default function ClickToThrow(): ReactElement {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          throw new Error('Error on click');
        }}
      >
        Click me to throw
      </button>
      <button
        type="button"
        onClick={() => {
          clickToThrowLogger.error(new Error('Error on click'));
        }}
      >
        Click me to log error
      </button>
    </div>
  );
}
