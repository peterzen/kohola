import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { AppContainer } from "react-hot-loader"

import store, { history } from "./store/store"

import App from "./features/app/App"

// import "bootstrap/dist/css/bootstrap.css";
import "./styles/main.scss"
import { launchApp } from "./features/app/appSlice"

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App history={history} />
        </Provider>
    </AppContainer>,
    document.getElementById("app")
)

store.dispatch(launchApp())
