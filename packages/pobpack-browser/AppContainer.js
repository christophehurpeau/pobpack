import React from 'react';
import { AppContainer } from 'react-hot-loader';
// import ReactErrorHtml from 'react-error-html';

const PobpackAppContainer = function(props) {
  console.warn(
    'This is depreacted, please use pobpack-browser/host instead. See https://github.com/gaearon/react-hot-loader#hotcomponent-options',
  );
  return React.createElement(AppContainer, {
    // errorReporter: props.errorReporter || ReactErrorHtml,
    children: props.children,
  });
};

export default PobpackAppContainer;
