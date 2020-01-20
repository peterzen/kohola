import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware, push } from "react-router-redux";
import { createLogger } from 'redux-logger'
import createRootReducer from "../reducers";


interface MyWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__(arg0: any): void;
}

declare var window: MyWindow;

export default function configureStore(initialState: Object, history: any) {

  const actionCreators = {
    push
  };

  const logger = (createLogger as any)({
    level: "info",
    collapsed: true
  });

  const router = routerMiddleware(history);

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators
    }) :
    compose;

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
