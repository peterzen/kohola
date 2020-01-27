import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history';

import initialState from './store/initialState';
import configureStore from './store/configureStore';
import { initializeData } from './store/actions';

import App from './containers/App';

import "bootstrap/dist/css/bootstrap.css";
import "./styles/main.scss";

const history = createBrowserHistory();
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
store.dispatch(initializeData())
	.then(() => {
		render();
	});

