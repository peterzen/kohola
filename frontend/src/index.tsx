import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory, createHashHistory } from 'history';

import initialState from './store/initialState';
import configureStore from './store/configureStore';
import { initializeData, checkBackend } from './store/actions';

import App from './containers/App';

import "bootstrap/dist/css/bootstrap.css";
import "./styles/main.scss";

const history = createHashHistory({
	hashType: 'slash',
});
const store = configureStore(initialState, history);

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<App history={history} />
			</Provider>
		</AppContainer>,
		document.getElementById('app')
	);
}
store.dispatch(checkBackend())
	.then(() => {
		return store.dispatch(initializeData())
	})
	.catch(() => {
		history.replace('/settings')
	})
	.finally(() => {
		render()
	})

