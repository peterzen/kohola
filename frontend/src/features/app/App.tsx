import * as React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root'

import { Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import { Container } from 'react-bootstrap'

import Wallet from "../../containers/Wallet"
import Staking from "../../containers/Staking"
import Settings from '../../containers/Settings';
import AccountDetails from '../../containers/AccountDetails'
import { NoRouteMatch } from '../../components/Shared/shared';

import { IApplicationState } from '../../store/types';
import { AppToastContainer } from '../../components/Fixtures/Toasts';
import Navbar from "../../components/Fixtures/Navbar"
import DevTools from '../../components/Fixtures/DevTools';
// import Drawer from 'rc-drawer'

// @ts-ignore
import { AnimatedSwitch } from 'react-router-transition';
import Login from '../../containers/Login';
import { bounceTransition, mapStyles } from './routeSwitchAnimations';
import Mixing from '../../containers/Mixing';
import AppProgressIndicator from './AppProgressIndicator';


const devMonitorEnabled = true

class App extends React.Component<Props>{
	render() {
		const history = this.props.history

		const mainClassNames = []
		if (devMonitorEnabled) mainClassNames.push("devmonitor")
		if (this.props.isEndpointConnected) mainClassNames.push("endpoint-connected")

		return (
			<ConnectedRouter history={history}>
				{devMonitorEnabled && <DevTools />}
				<main id="main" className={mainClassNames.join(" ")}>
					{/* <Drawer
					placement='right'
					width={400}
					// height={this.state.height}
				>
					<DevTools />
				</Drawer> */}
					<Navbar />
					<Container fluid={true} className="main-content mt-5">
						<AppToastContainer />
						<AnimatedSwitch
							atEnter={bounceTransition.atEnter}
							atLeave={bounceTransition.atLeave}
							atActive={bounceTransition.atActive}
							mapStyles={mapStyles}
							className="switch-wrapper"
						>
							<Route path="/staking" component={Staking} />
							<Route path="/settings" component={Settings} />
							<Route path="/account/:accountNumber" component={AccountDetails} />
							<Route path="/wallet" component={Wallet} />
							<Route path="/mixing" component={Mixing} />
							<Route exact path="/" component={Login} />
							<Route component={NoRouteMatch} />
						</AnimatedSwitch>
					</Container>
					{this.props.showProgress && <AppProgressIndicator />}
				</main>
			</ConnectedRouter>
		)
	}
}

interface OwnProps {
	showProgress: boolean
	isEndpointConnected: boolean
}

interface ParentProps {
	history: any  // @FIXME
}

type Props = OwnProps & ParentProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		showProgress: state.app.progressbarShown,
		isEndpointConnected: state.app.isWalletConnected,
	}
}

export default hot(connect(mapStateToProps)(App))

