
import _ from 'lodash';
import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { IApplicationState } from '../../store/store';
import { IAppConfigurationState } from '../appconfiguration/settingsSlice';
import { AppConfiguration } from '../../proto/dcrwalletgui_pb';
import { Button, Card, Row, Col } from 'react-bootstrap';
import ConnectionSettings from '../appconfiguration/ConnectionSettings';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlug } from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import Fade from 'react-reveal/Fade';
import WalletEndpointGrid from './WalletEndpointGrid';
import EditableEndpointGrid from './EditableEndpointGrid';
import { connectWallet } from './appSlice';


class Login extends React.Component<Props> {
	render() {
		return (
			<div>
				<h1><FontAwesomeIcon icon={faPlug} /> Connect to wallet</h1>
				<EditableEndpointGrid onSelect={(endpoint) => this.props.connectWallet(endpoint)} />
			</div>
		)
	}
}

interface OwnProps {
	appConfig: AppConfiguration
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): IAppConfigurationState => {
	return {
		...state.appconfiguration
	};
}

interface DispatchProps {
	connectWallet: typeof connectWallet
}

const mapDispatchToProps = {
	connectWallet
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));


