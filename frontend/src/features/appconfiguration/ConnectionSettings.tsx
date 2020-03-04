import * as React from 'react';
import _ from 'lodash';

import { AppError } from '../../store/types';
import { Row, Col, Button } from 'react-bootstrap';
import { AppConfiguration } from '../../proto/dcrwalletgui_pb';
import RPCEndpointConfigForm from './DcrdForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faPlus
} from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
import Fade from 'react-reveal/Fade';


export default class SettingsContainer extends React.Component<OwnProps> {
	render() {
		const c = this.props.appConfig
		if (c == null) {
			return null
		}
		// @ts-ignore
		const dcrd: RPCEndpoint = c.getDcrdHost()
		const dcrwallets = c.getDcrwalletHostsList()

		return (
			<div>
				<Row>
					<Col sm={6}>
						<Fade fade cascade>
							{dcrwallets.map((endPoint) => (
								<div className="mb-3">
									<RPCEndpointConfigForm
										onFormComplete={this.props.onFormComplete}
										endPointConfig={endPoint}
										error={this.props.setConfigError}
										title="dcrwallet settings"
										key={endPoint.getLabel()} />
								</div>
							))}
						</Fade>
						<div className="mt-3" >
							<Button variant="outline-secondary" size="sm" onClick={_.bind(this.handleAddWallet, this)}>
								<FontAwesomeIcon icon={faPlus} /> Add wallet host...
							</Button>
						</div>
					</Col>
					<Col sm={6}>
						<Fade fade >
							<RPCEndpointConfigForm
								onFormComplete={this.props.onFormComplete}
								error={this.props.setConfigError}
								endPointConfig={dcrd}
								title="dcrd settings"
							/>
						</Fade>
					</Col>
				</Row>
			</div>
		)
	}

	handleAddWallet() {

	}
}

interface OwnProps {
	appConfig: AppConfiguration
	setConfigError: AppError | null
	onFormComplete: () => void
}

