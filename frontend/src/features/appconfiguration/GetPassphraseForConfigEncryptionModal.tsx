import _ from 'lodash';
import * as React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import GenericModal from '../../components/Shared/GenericModal';

export class GetPassphraseForConfigEncryptionModal extends React.Component<OwnProps, InternalState>{
	constructor(props: OwnProps) {
		super(props)
		this.state = {
			passphrasesAreNotTheSameErrorMsg: "",
			passphraseInnerRef: React.createRef()
		}
	}

	render() {
		return (
			<GenericModal
				title="Enter passphrase"
				show={this.props.show}
				onEntered={() => this.state.passphraseInnerRef.current.focus()}
				onHide={this.props.onHide}
			>
				<Form>
					<Form.Group>
						<Form.Control
							required
							ref={this.state.passphraseInnerRef}
							autoComplete="off"
							name="passphrase"
							type="password"
							onFocus={_.bind(this.handleFocus, this)}
							placeholder="New passphrase"
							defaultValue="" />
					</Form.Group>
					<Form.Group>
						<Form.Control
							required
							autoComplete="off"
							name="verifyPassphrase"
							type="password"
							placeholder="Verify passphrase"
							onFocus={_.bind(this.handleFocus, this)}
							defaultValue="" />

						{this.state.passphrasesAreNotTheSameErrorMsg != "" && (
							<Alert variant="danger">
								{this.state.passphrasesAreNotTheSameErrorMsg}
							</Alert>
						)}
					</Form.Group>

					<Form.Group>
						<div className="text-right pr-4">
							<Button
								variant="secondary"
								onClick={this.props.onHide}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								onClick={_.bind(this.handleFormSubmit, this)}
								variant="primary">
								Submit
							</Button>
						</div>
					</Form.Group>
				</Form>
			</GenericModal>
		)
	}

	handleFocus(e: React.FormEvent<HTMLFormElement>) {
		this.setState({
			passphrasesAreNotTheSameErrorMsg: ""
		})
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.stopPropagation();
		e.preventDefault();

		const passphrase = e.currentTarget.form.elements.passphrase.value;
		const verifyPassphrase = e.currentTarget.form.elements.verifyPassphrase.value;

		if (passphrase != verifyPassphrase) {
			this.setState({
				passphrasesAreNotTheSameErrorMsg: "Your new passphrase is not the same as the verify passphrase"
			})
		} else {
			this.setState({
				passphrasesAreNotTheSameErrorMsg: ""
			})
			this.props.passphraseModalCallback(passphrase)
		}
	}
}

interface InternalState {
	passphrasesAreNotTheSameErrorMsg: string
	passphraseInnerRef: React.RefObject<any>
}

interface OwnProps {
	show: boolean
	onHide: () => void
	passphraseModalCallback: ((result: string) => void)
}

export default GetPassphraseForConfigEncryptionModal
