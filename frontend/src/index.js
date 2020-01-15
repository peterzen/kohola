import React from 'react';
import ReactDOM from 'react-dom';

import WsClient from './ws'

import App from './components/App';

WsClient.initialize();

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);