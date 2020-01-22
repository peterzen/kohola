import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from "connected-react-router";

import App from './containers/App';
import initialState from './store/initialState';
import configureStore from './store/configureStore';

import { getPingAttempt } from './store/ping/actions';
import { getTicketsAttempt } from './store/tickets/actions';
import { getAccountsAttempt } from './store/accounts/actions';
import { getTransactionsAttempt } from './store/transactions/actions';
import { getBestBlockHeightAttempt } from './store/bestblock/actions';
import { getWalletBalance } from './store/walletbalance/actions';

const history = createBrowserHistory();
const store = configureStore(initialState, history);

store.dispatch(getBestBlockHeightAttempt());
store.dispatch(getAccountsAttempt());
store.dispatch(getTransactionsAttempt())
store.dispatch(getPingAttempt());
store.dispatch(getTicketsAttempt());



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
