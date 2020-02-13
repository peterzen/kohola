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

import Fade from 'react-reveal/Fade';
import { Transition } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';

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
						<TransitionGroup>
							{dcrwallets.map((endPoint) => (
								<Fade>
									<div className="mb-3">
										<RPCEndpointConfigForm
											onFormComplete={_.bind(this.handleFormComplete, this)}
											endPointConfig={endPoint}
											title="dcrwallet settings"
											key={endPoint.getLabel()} />
									</div>
								</Fade>
							))}
						</TransitionGroup>
						<div className="mt-3" >
							<Button variant="outline-secondary" size="sm" onClick={_.bind(this.handleAddWallet, this)}>
								<FontAwesomeIcon icon={faPlus} /> Add wallet host...
							</Button>
						</div>
					</Col>
					<Col sm={6}>
						<Fade fade >
							<RPCEndpointConfigForm
								onFormComplete={_.bind(this.handleFormComplete, this)}
								endPointConfig={dcrd}
								title="dcrd settings"
							/>
						</Fade>
					</Col>
				</Row>
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

