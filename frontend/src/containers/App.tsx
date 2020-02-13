import * as React from 'react';

import { Switch, Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import { Container, Toast } from 'react-bootstrap'

import Home from "./Home"
import Staking from "./Staking"
import Settings from './Settings';
import { NoRouteMatch } from '../components/Shared/shared';

import { hot } from 'react-hot-loader/root'
import ToastContainer from '../components/Fixtures/Toasts';
import Navbar from "../components/Fixtures/Navbar"
import DevTools from '../components/Fixtures/DevTools';

// import Drawer from 'rc-drawer'

interface AppProps {
	history: any  // should be History<something>
}

const App = ({ history }: AppProps) => {
	return (
		<ConnectedRouter history={history}>
			<main>
				{/* <Drawer
					placement='right'
					width={400}
					// height={this.state.height}
				>
					<DevTools />
				</Drawer> */}
				<Navbar />
				<Container fluid={true} className="mt-5">
					<Switch>
						<Route path="/staking" component={Staking} />
						<Route path="/settings" component={Settings} />
						<Route exact path="/" component={Home} />
						<Route component={NoRouteMatch} />
					</Switch>
				</Container>
			</main>
			<ToastContainer />
		</ConnectedRouter>
	)
}

export default hot(App)

