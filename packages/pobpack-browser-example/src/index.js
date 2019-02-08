import { setConfig } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

setConfig({ logLevel: 'debug' });
render(React.createElement(App), document.getElementById('app'));
