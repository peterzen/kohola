
import { configureStore, Action } from '@reduxjs/toolkit'

import thunk, { ThunkAction } from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from 'redux-logger'
import {  createHashHistory } from 'history';
import DevTools from "../components/Fixtures/DevTools";

import createRootReducer from "./reducers";
import { persistState } from 'redux-devtools';

export const history = createHashHistory({
	hashType: 'slash',
});

const w = (window as any)

const logger = (createLogger as any)({
	level: "info",
	collapsed: true
});

const router = routerMiddleware(history);

const rootReducer = createRootReducer(history)

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

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
