import * as React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root'

import { Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

import { Container } from 'react-bootstrap'
// @ts-ignore
import { AnimatedSwitch } from 'react-router-transition';

import Login from '../../containers/Login';
import Wallet from "../../containers/Wallet"
import Market from '../../containers/Market';
import Mixing from '../../containers/Mixing';
import Welcome from '../../containers/Welcome';
import Staking from "../../containers/Staking"
import Settings from '../../containers/Settings';
import AccountDetails from '../../containers/AccountDetails'
import { NoRouteMatch } from '../../components/Shared/shared';

import DevTools from './fixtures/DevTools';
import { IApplicationState } from '../../store/types';
import { AppToastContainer } from './fixtures/Toasts';

import { bounceTransition, mapStyles } from './routeSwitchAnimations';
import AppProgressIndicator from './AppProgressIndicator';
import AppSidebar from './fixtures/AppSidebar';


const devMonitorEnabled = false

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
					<AppSidebar>
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
								<Route path="/market" component={Market} />
								<Route path="/login" component={Login} />
								<Route exact path="/" component={Welcome} />
								<Route component={NoRouteMatch} />
							</AnimatedSwitch>
						</Container>
						{this.props.showProgress && <AppProgressIndicator />}
					</AppSidebar>
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

