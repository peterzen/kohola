import React from "react"
import _ from "lodash"

import { Form, Button } from "react-bootstrap"

import GenericModal from "../../components/Shared/GenericModal"
import { connect } from "react-redux"
import { IApplicationState } from "../../store/types"
import { requestConfigurationDecryptionKeySuccess } from "./settingsSlice"


interface ConfigDecryptDialogProps {
	onCompleted: (passphrase: string) => void
}

interface ConfigDecryptDialogState {
	passphrase: string
}

class ConfigDecryptDialog extends React.Component<ConfigDecryptDialogProps, ConfigDecryptDialogState> {
	constructor(props: ConfigDecryptDialogProps) {
		super(props)
		this.state = {
			passphrase: "",
		}
	}

	render() {
		return (
			<Form
				onSubmit={_.bind(this.handleFormSubmit, this)}
			>
				<Form.Group>
					<Form.Control
						autoComplete="off"
						name="password"
						type="password"
						placeholder="Passphrase"
						value={this.state.passphrase}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e.currentTarget.value)} />
					<Form.Text className="text-muted">
						This passphrase will be used to decrypt your application configuration.
					</Form.Text>
				</Form.Group>
				<div className="text-right">
					<Button
						className="primary"
						type="submit">Unlock</Button>
				</div>
			</Form>
		)
	}

	handleChange(passphrase: string) {
		this.setState({
			passphrase: passphrase
		})
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			passphrase: ""
		})		
		this.props.onCompleted(this.state.passphrase)
		return false;
	}
}



class ConfigDecryptContainer extends React.Component<ConfigDecryptContainerProps> {
	render() {
		return (
			<GenericModal
				title="Unlock configuration"
				show={this.props.modalShown}
				onHide={() => { }} // no need for this, the dialog must be fully modal, i.e. no [X] Close button
			>
				<ConfigDecryptDialog
					onCompleted={(passphrase: string) => this.props.requestConfigurationDecryptionKeySuccess(passphrase)}
				/>
			</GenericModal>
		)
	}
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		modalShown: state.appconfiguration.appConfigDecryptionKeyRequested
	}
}



interface OwnProps {
	modalShown: boolean
}

interface DispatchProps {
	requestConfigurationDecryptionKeySuccess: typeof requestConfigurationDecryptionKeySuccess
}

const mapDispatchToProps = {
	requestConfigurationDecryptionKeySuccess
}

type ConfigDecryptContainerProps = OwnProps & DispatchProps


export default connect(mapStateToProps, mapDispatchToProps)(ConfigDecryptContainer)
