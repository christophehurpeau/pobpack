const React = require('react');
const AppContainer = require('react-hot-loader').AppContainer;
const ReactErrorHtml = require('react-error-html').default;

module.exports = function (props) {
  return React.createElement(AppContainer, {
    errorReporter: props.errorReporter || ReactErrorHtml,
    children: props.children,
  });
};
