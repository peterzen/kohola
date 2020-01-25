import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from "connected-react-router";

import App from './containers/App';
import initialState from './store/initialState';
import configureStore from './store/configureStore';
import { initializeData } from './store/actions';

import Navbar from './components/Navbar';
import Staking from './containers/Staking';

const history = createBrowserHistory();
const store = configureStore(initialState, history);

store.dispatch(initializeData())
	.then(() => {
		ReactDOM.render(
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Navbar />
					<Switch>
						<Route path="/staking" component={Staking} />
						<Route path="/" component={App} />
					</Switch>
				</ConnectedRouter>
			</Provider>,
			document.getElementById('app')
		);

	});

