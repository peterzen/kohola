import _ from 'lodash';
import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { AppError } from '../store/types';
import { IApplicationState } from '../store/store';
import { AppConfiguration } from '../proto/dcrwalletgui_pb';
import { Alert, Tabs, Tab, Card } from 'react-bootstrap';
import { saveConfigurationAttempt } from '../features/appconfiguration/settingsSlice';
import ConnectionSettings from '../features/appconfiguration/ConnectionSettings';
import AccountsSetup from '../features/accounts/AccountsSetup';
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
							<ConnectionSettings
								appConfig={this.props.appConfig}
								setConfigError={this.props.setConfigError}
								onFormComplete={_.bind(this.handleFormComplete, this)}
							/>
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

	handleFormComplete() {
		this.props.saveConfigurationAttempt()
	}
}

interface DispatchProps {
	saveConfigurationAttempt: (...arguments: any) => void
}

interface OwnProps {
	appConfig: AppConfiguration
	setConfigError: AppError | null
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.appconfiguration
	};
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	saveConfigurationAttempt: saveConfigurationAttempt,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer));
