import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from 'redux-logger'
import createRootReducer from "./reducers";
import { IApplicationState } from "./types";
import DevTools from "../components/Fixtures/DevTools";
import { persistState } from "redux-devtools";
// import composeWithDevTools from 'remote-redux-devtools';

import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore(initialState: IApplicationState, history: any) {

	const logger = (createLogger as any)({
		level: "info",
		collapsed: true
	});

	const router = routerMiddleware(history);

	const w = (window as any)
	// const devTool = (w.__REDUX_DEVTOOLS_EXTENSION__ && typeof w.__REDUX_DEVTOOLS_EXTENSION__ == 'function') ?
	// 	w.__REDUX_DEVTOOLS_EXTENSION__() :
	// 	function () { return {} }


	// const composeEnhancers =
	// 	typeof w === 'object' &&
	// 		w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	// 		w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
	// 			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
	// 		}) : compose;



	const devToolCompose = compose(
		DevTools.instrument(),
		persistState(w.location.href.match(/[?&]debug_session=([^&#]+)\b/))
	);


	// const composeEnhancers = composeWithDevTools({
	// 	name: "main"
	// });

	// const store = createStore(reducer, devToolsEnhancer());

	const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		createRootReducer(history),
		initialState,
		composeEnhancers(
			applyMiddleware(thunk, router, logger),
			// DevTools.instrument()

			
			// devTool,
			// devToolCompose
			// composeWithDevTools({
			// 	persistState: true,
			// 	realtime: true,
			// 	hostname: "localhost",
			// 	"port": 8888
			// })
		)

	);

	if (module.hot) {
		module.hot.accept("./reducers", () =>
			store.replaceReducer(require("./reducers"))
		);
	}

	return store;
}
