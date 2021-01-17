import React from 'react';
import { render } from 'react-dom';
import App from './App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((err) => {
        console.log('SW registration failed: ', err);
      });
  });
}

render(React.createElement(App), document.getElementById('app'));
