import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { AppContainer } from 'react-hot-loader'

import store, { history } from './store/store';

import App from './features/app/App';

// import "bootstrap/dist/css/bootstrap.css";
import "./styles/main.scss";
import { getConfiguration } from './features/appconfiguration/settingsSlice';
import { connectDefaultWallet } from './features/app/appSlice';

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<App history={history} />
			</Provider>
		</AppContainer>,
		document.getElementById('app')
	)
}

store.dispatch(getConfiguration())
	.then(() => {
		// connect to the first wallet endpoint, in lieu of a proper
		// default flag.  
		// @FIXME add GUI to select default endpoint
		return store.dispatch(connectDefaultWallet())
	})
	.then(() => {
		render()
	})
