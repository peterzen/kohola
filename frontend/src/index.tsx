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

// @TODO pass down a flag to identify dev/production mode and
// enable the below function to disable the context menu in production
// builds.
const w = (window as any)
w.document.addEventListener("contextmenu", function (e: any) {
	// e.preventDefault();
})

store.dispatch(launchApp())
