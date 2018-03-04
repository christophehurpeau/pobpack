// const React = require('react');
// const AppContainer = require('react-hot-loader').AppContainer;
// const ReactErrorHtml = require('react-error-html');
//
// module.exports = function(props) {
//   return React.createElement(AppContainer, {
//     errorReporter: props.errorReporter || ReactErrorHtml,
//     children: props.children,
//   });
// };
/* eslint-disable import/no-extraneous-dependencies */

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
