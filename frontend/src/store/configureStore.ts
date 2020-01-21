import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware, push } from "react-router-redux";
import { createLogger } from 'redux-logger'
import createRootReducer from "../reducers";

export default function configureStore(initialState: Object, history: any) {

  const logger = (createLogger as any)({
    level: "info",
    collapsed: true
  });

  const router = routerMiddleware(history);

  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(thunk, router, logger),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )

  );

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers"))
    );
  }

  return store;
}
