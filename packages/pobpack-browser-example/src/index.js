import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './HelloWorld';

const renderApp = () =>
  render(React.createElement(HelloWorld), document.getElementById('app'));

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./HelloWorld', () => {
    renderApp();
  });
}
