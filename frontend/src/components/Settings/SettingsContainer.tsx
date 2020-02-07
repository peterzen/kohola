import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { IApplicationState } from '../../store/types';
import { getConfiguration } from '../../store/appconfiguration/actions';
import { Row, Col, Table, Form } from 'react-bootstrap';
import { AppConfiguration } from '../../proto/dcrwalletgui_pb';


class SettingsContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
		}
	}
	networkSelectorOptions() {
		return (
			<>
				<option value="0">MAINNET</option>
				<option value="1">TESTNET</option>
				<option value="2">SIMNET</option>
			</>
		)
	}
	render() {
		const c = this.props.configuration
		const dcrd = c.getDcrdHost()
		console.log("CCC", this.props.configuration)

		return (
			<div>
				<h3>Settings</h3>
				<Row>
					<Col sm={6}>
						<h4>dcrd settings</h4>
						<Form>
							<Form.Group as={Row}>
								<Form.Label column sm={2}>Network</Form.Label>
								<Col sm={6}>

									<Form.Control
										tabIndex={0}
										as="select">
										{this.networkSelectorOptions()}
									</Form.Control>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column sm={2}>Host:port</Form.Label>
								<Col sm={6}>
									<Form.Control value={dcrd.getHostname()} />
								</Col>
								<Col sm={4}>
									<Form.Control value={dcrd.getPort()} />
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column sm={2}>RPC username</Form.Label>
								<Col sm={10}>
									<Form.Control value={dcrd.getUsername()} />
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column sm={2}>RPC password</Form.Label>
								<Col sm={10}>
									<Form.Control value={dcrd?.getPassword()} />
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column sm={2}>Certificate</Form.Label>
								<Col sm={10}>
									<Form.Control as="textarea" value={dcrd?.getCertBlob()} />
								</Col>
							</Form.Group>
						</Form>
					</Col>
					<Col sm={6}>
						<h4>dcrwallet</h4>
					</Col>
				</Row>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(getConfiguration());
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: SettingsOwnProps) => {
	return {
		...state.staking,
		configuration: state.appconfiguration.appConfig
	};
}

export default connect(mapStateToProps)(SettingsContainer)

export interface SettingsOwnProps {
	// propFromParent: number
	configuration: AppConfiguration
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = AppConfiguration & DispatchProps & SettingsOwnProps

interface InternalState {
}

