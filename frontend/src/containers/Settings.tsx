import _ from 'lodash';
import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { AppError } from '../store/types';
import { IApplicationState } from '../store/store';
import { AppConfiguration } from '../proto/dcrwalletgui_pb';
import { Alert, Tabs, Tab, Card } from 'react-bootstrap';
import { saveConfigurationAttempt, IAppConfigurationState } from '../features/appconfiguration/settingsSlice';
import ConnectionSettings from '../features/appconfiguration/ConnectionSettings';
import AccountsSetup from '../features/balances/AccountsSetup';
import Preferences from '../features/appconfiguration/Preferences';

class SettingsContainer extends React.Component<Props> {

	render() {
		return (
			<div>
				{this.props.setConfigError != null && (
					<Alert variant="danger">{this.props.setConfigError}</Alert>
				)}
				<Tabs defaultActiveKey="connections" id="appconfiguration-tabs">
					<Tab eventKey="connections" title="Connections">
						<Tab.Content>
							<ConnectionSettings />
						</Tab.Content>
					</Tab>
					<Tab eventKey="accounts" title="Accounts">
						<Card>
							<Card.Body>
								<AccountsSetup />
							</Card.Body>
						</Card>
					</Tab>
					<Tab eventKey="preferences" title="Preferences">
						<Card>
							<Card.Body>
								<Preferences />
							</Card.Body>
						</Card>
					</Tab>
				</Tabs>
			</div>
		)
	}
}

interface OwnProps {
	appConfig: AppConfiguration
	setConfigError: AppError | null
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): IAppConfigurationState => {
	return {
		...state.appconfiguration
	}
}

interface DispatchProps {
	saveConfigurationAttempt: typeof saveConfigurationAttempt
}

const mapDispatchToProps = {
	saveConfigurationAttempt,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer))
