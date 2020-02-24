import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { AppContainer } from 'react-hot-loader'

import store, {history, RootState} from './store/store';
import { initializeData, checkBackend } from './store/actions';

import App from './containers/App';

// import "bootstrap/dist/css/bootstrap.css";
import "./styles/main.scss";


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

