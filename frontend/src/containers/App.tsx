import * as React from 'react';

import { Switch, Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import { Container } from 'react-bootstrap'

import Home from "./Home"
import Staking from "./Staking"
import Settings from './Settings';
import AccountDetailsContainer from './AccountDetailsContainer'
import { NoRouteMatch } from '../components/Shared/shared';

import { hot } from 'react-hot-loader/root'
import ToastContainer from '../components/Fixtures/Toasts';
import Navbar from "../components/Fixtures/Navbar"
import DevTools from '../components/Fixtures/DevTools';
// import Drawer from 'rc-drawer'

import { AnimatedSwitch } from 'react-router-transition';
import { spring } from 'react-motion';


interface AppProps {
	history: any  // should be History<something>
}

const devMonitorEnabled = true


// child matches will...
const bounceTransition = {
	// start in a transparent, upscaled state
	atEnter: {
		opacity: 0,
		translateX: 100,
	},
	// leave in a transparent, downscaled state
	atLeave: {
		opacity: bounce(0),
		translateX: bounce(-100),
	},
	// and rest at an opaque, normally-scaled state
	atActive: {
		opacity: bounce(1),
		translateX: bounce(0),
	},
}


// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles: any) {
	return {
		opacity: styles.opacity,
		transform: `translateX(${styles.translateX}%)`,
	}
}

function bounce(val: number) {
	return spring(val, {
		stiffness: 180,
		damping: 17,
	})
}



const App = ({ history }: AppProps) => {
	return (
		<ConnectedRouter history={history}>
			{devMonitorEnabled && <DevTools />}
			<main id="main" className={devMonitorEnabled ? "devmonitor" : ""}>
				{/* <Drawer
					placement='right'
					width={400}
					// height={this.state.height}
				>
					<DevTools />
				</Drawer> */}
				<Navbar />
				<Container fluid={true} className="mt-5">
					<AnimatedSwitch
						atEnter={bounceTransition.atEnter}
						atLeave={bounceTransition.atLeave}
						atActive={bounceTransition.atActive}
						mapStyles={mapStyles}
						className="switch-wrapper"
					>
						<Route path="/staking" component={Staking} />
						<Route path="/settings" component={Settings} />
						<Route path="/account/:accountNumber" component={AccountDetailsContainer} />
						<Route exact path="/" component={Home} />
						<Route component={NoRouteMatch} />
					</AnimatedSwitch>
				</Container>
				<ToastContainer />
			</main>
		</ConnectedRouter>
	)
}

export default hot(App)

