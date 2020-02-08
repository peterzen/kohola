import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { IApplicationState, AppError } from '../../store/types';
import { getConfiguration, saveConfigurationAttempt } from '../../store/appconfiguration/actions';
import { Row, Col, Button } from 'react-bootstrap';
import { AppConfiguration } from '../../proto/dcrwalletgui_pb';
import RPCEndpointConfigForm from './DcrdForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faPlus
} from '@fortawesome/free-solid-svg-icons'


class SettingsContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			appConfig: props.appConfig,
			error: props.setConfigError,
		}
	}

	render() {
		const c = this.state.appConfig
		const dcrd = c.getDcrdHost()
		const dcrwallets = c.getDcrwalletHostsList()

		return (
			<div>
				<h3>Settings</h3>
				<Row>
					<Col sm={6}>
						<RPCEndpointConfigForm
							onFormComplete={_.bind(this.handleFormComplete, this)}
							endPointConfig={dcrd}
							title="dcrd settings"
						/>
					</Col>
					<Col sm={6}>
						{dcrwallets.map((endPoint) => (
							<RPCEndpointConfigForm
								onFormComplete={_.bind(this.handleFormComplete, this)}
								endPointConfig={endPoint}
								title="dcrwallet settings"
								key={endPoint.getLabel()} />
						))}
						<div className="text-right" >
							<Button variant="outline-secondary" size="sm" onClick={_.bind(this.handleAddWallet, this)}>
								<FontAwesomeIcon icon={faPlus} /> Add wallet host...
							</Button>
						</div>
					</Col>
				</Row>
				<hr />
			</div>
		)
	}

	handleFormComplete() {
		this.props.saveConfigurationAttempt(this.props.appConfig)
	}


	handleAddWallet() {

	}

}

const mapStateToProps = (state: IApplicationState, ownProps: SettingsOwnProps) => {
	return {
		...state.appconfiguration,
	};
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	saveConfigurationAttempt: saveConfigurationAttempt,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)

export interface SettingsOwnProps {
	// propFromParent: number
	appConfig: AppConfiguration
}


interface DispatchProps {
	saveConfigurationAttempt: (...arguments: any) => void
}

type Props = AppConfiguration & DispatchProps & SettingsOwnProps

interface InternalState {
	appConfig: AppConfiguration
	error?: AppError
}

