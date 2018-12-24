import { setConfig } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './HelloWorld';

setConfig({ logLevel: 'debug' });
render(React.createElement(HelloWorld), document.getElementById('app'));
