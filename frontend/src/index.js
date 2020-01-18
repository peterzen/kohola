import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import DatastoreFactory from './store.js';

const store = DatastoreFactory.getInstance();

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);