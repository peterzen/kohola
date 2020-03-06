import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import * as React from 'react';
import { connect } from "react-redux";

import { AppError } from '../../store/types';
import { Row, Col, Button } from 'react-bootstrap';
import { AppConfiguration, RPCEndpoint, GRPCEndpoint } from '../../proto/dcrwalletgui_pb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faPlus, faCog, faCheck
} from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { IApplicationState, AppDispatch } from '../../store/store';
import WalletEndpointGrid from './WalletEndpointGrid';
import { EditEndpointModal } from '../appconfiguration/RPCEndpointConfigForm';
import { updateEndpoint, saveConfigurationAttempt, deleteEndpoint } from '../appconfiguration/settingsSlice';
import { confirmDialog } from '../../components/Shared/ConfirmDialog';
import { sprintf } from 'sprintf-js';



class EditableEndpointGrid extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			editable: false,
			selectedItem: null,
			modal: null
		}
	}

	render() {
		return (
			<div>
				<div className="text-right">
					{this.state.editable ?
						<Button variant="primary" onClick={() => this.toggleEditable()}>
							<FontAwesomeIcon icon={faCheck} /> Done
						</Button> :
						<Button variant="secondary" onClick={() => this.toggleEditable()}>
							<FontAwesomeIcon icon={faCog} /> Settings
						</Button>
					}
				</div>
				<WalletEndpointGrid
					editable={this.state.editable}
					endpoints={this.props.walletEndpoints}
					onEdit={_.bind(this.editEndpoint, this)}
					onDelete={_.bind(this.deleteEndpoint, this)}
					onSelect={this.props.onSelect}
					onAdd={() => { this.createNewEndpoint() }}
				/>
				{this.state.selectedItem != null && (
					<EditEndpointModal
						show={this.state.showModal}
						onHide={() => this.hideModal()}
						title={this.state.selectedItem.getLabel()}

						onCancel={() => this.cancelEdit()}
						onFormComplete={_.bind(this.finishEdit, this)}
						endPointConfig={this.state.selectedItem}
						error={this.props.setConfigError}
					/>
				)}
				<div>{this.state.modal}</div>
			</div>
		)
	}

	toggleEditable() {
		this.setState({ editable: !this.state.editable })
	}
	editEndpoint(endpoint: GRPCEndpoint) {
		this.setState({
			showModal: true,
			selectedItem: endpoint
		})
	}
	deleteEndpoint(endpoint: GRPCEndpoint) {
		const done = (result: boolean) => {
			this.setState({
				modal: null
			})
			if (result == true) {
				this.props.deleteEndpoint(endpoint)
			}
		}
		const confirmComp = confirmDialog(
			sprintf("Are you sure you want to delete %s?", endpoint.getLabel()),
			"OK", "Cancel", done
		)
		this.setState({
			modal: confirmComp
		})
	}
	createNewEndpoint() {
		const newEndpoint = new GRPCEndpoint()
		newEndpoint.setId(uuidv4())
		newEndpoint.setLabel("New connection")
		this.setState({
			selectedItem: newEndpoint
		})
		this.showModal()
	}
	finishEdit(endpoint: GRPCEndpoint | RPCEndpoint) {
		this.props.updateEndpoint(endpoint)
		this.hideModal()
	}
	cancelEdit() {
		this.hideModal()
	}
	showModal() {
		this.setState({ showModal: true })
	}
	hideModal() {
		this.setState({
			showModal: false,
			selectedItem: null,
		})
	}
}

interface OwnProps {
	walletEndpoints: GRPCEndpoint[]
	setConfigError: AppError | null
	onSelect: (endpoint: GRPCEndpoint) => void
}

interface InternalState {
	editable: boolean
	selectedItem: GRPCEndpoint | null
	showModal: boolean
	modal: any
}

interface DispatchProps {
	updateEndpoint: (endpoint: GRPCEndpoint | RPCEndpoint) => void
	deleteEndpoint: (endpoint: GRPCEndpoint | RPCEndpoint) => void
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		walletEndpoints: state.appconfiguration.appConfig.getWalletEndpointsList(),
		setConfigError: state.appconfiguration.setConfigError,
	}
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		updateEndpoint: (endpoint: GRPCEndpoint | RPCEndpoint) => {
			dispatch(updateEndpoint(endpoint))
			dispatch(saveConfigurationAttempt())
		},
		deleteEndpoint: (endpoint: GRPCEndpoint) => {
			dispatch(deleteEndpoint(endpoint))
			dispatch(saveConfigurationAttempt())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableEndpointGrid)
