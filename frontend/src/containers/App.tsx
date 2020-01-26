import * as React from 'react';

import { Switch, Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import { Container } from 'react-bootstrap'

import Home from "./Home"
import Staking from "./Staking"
import Navbar from "../components/Navbar"
import { NoRouteMatch } from '../components/shared';
import Footer from '../components/Footer';

import { hot } from 'react-hot-loader/root'

interface AppProps {
	history: any  // should be History<something>
}

const App = ({ history }: AppProps) => {
	return (
		<ConnectedRouter history={history}>
			<main>
				<Navbar />
				<Container fluid={true}>
					<Switch>
						<Route path="/staking" component={Staking} />
						<Route exact path="/" component={Home} />
						<Route component={NoRouteMatch} />
					</Switch>
				</Container>
			</main>
			<Footer/>
		</ConnectedRouter>
	)
}


export default hot(App)
