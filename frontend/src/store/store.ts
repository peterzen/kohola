
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from 'redux-logger'
import {  createHashHistory } from 'history';
import { persistState } from 'redux-devtools';

import createRootReducer from "./reducers";
import DevTools from "../features/app/fixtures/DevTools";

export const history = createHashHistory({
	hashType: 'slash',
});

const w = (window as any)

const logger = (createLogger as any)({
	level: "info",
	collapsed: true
});

const router = routerMiddleware(history);

export const rootReducer = createRootReducer(history)

const store = configureStore({
	reducer: rootReducer,
	middleware: [
		thunk,
		router,
		logger
	],
	devTools: true,
	enhancers: [
		DevTools.instrument(),
		persistState(w.location.href.match(/[?&]debug_session=([^&#]+)\b/))
	]
})

if (module.hot) {
	module.hot.accept("./reducers", () =>
		store.replaceReducer(require("./reducers"))
	);
}

export default store
