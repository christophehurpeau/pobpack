import React from 'react';
import { AppContainer } from 'react-hot-loader';
// import ReactErrorHtml from 'react-error-html';

const PobpackAppContainer = function(props) {
  return React.createElement(AppContainer, {
    // errorReporter: props.errorReporter || ReactErrorHtml,
    children: props.children,
  });
};

export default PobpackAppContainer;
