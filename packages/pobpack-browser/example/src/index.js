import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './HelloWorld';
import AppContainer from 'pobpack-browser/AppContainer';

const renderApp = () => (
  render(
    <AppContainer><HelloWorld /></AppContainer>,
    document.getElementById('app'),
  )
);

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./HelloWorld', () => {
    renderApp();
  });
}
