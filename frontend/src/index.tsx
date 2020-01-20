import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import initialState from './store/initialState';
import configureStore from './store/configureStore';
import App from './containers/App';



const history = createBrowserHistory();
const store = configureStore(initialState, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);