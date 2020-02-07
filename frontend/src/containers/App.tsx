import * as React from 'react';

import { Switch, Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import { Container } from 'react-bootstrap'

import Navbar from "../components/Fixtures/Navbar"
import Home from "./Home"
import Staking from "./Staking"
import Settings from './Settings';
import { NoRouteMatch } from '../components/Shared/shared';

import { hot } from 'react-hot-loader/root'

interface AppProps {
	history: any  // should be History<something>
}

const App = ({ history }: AppProps) => {
	return (
		<ConnectedRouter history={history}>
			<main>
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
		</ConnectedRouter>
	)
}


export default hot(App)
