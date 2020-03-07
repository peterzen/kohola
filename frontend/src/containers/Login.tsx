import _ from 'lodash';
import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug } from '@fortawesome/free-solid-svg-icons'

import { IAppConfigurationState } from '../features/appconfiguration/settingsSlice';
import { AppConfiguration } from '../proto/dcrwalletgui_pb';
import EditableEndpointGrid from '../features/app/EditableEndpointGrid';
import { connectWallet } from '../features/app/appSlice';
import { IApplicationState } from '../store/types';


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


