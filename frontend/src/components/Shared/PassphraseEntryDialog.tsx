import * as React from 'react';
import _ from 'lodash';

import { Button, Modal, Form } from 'react-bootstrap';

let setState: any | null = null
let promise: Promise<string> | null = null

let dialogComponent: PassphraseEntryDialog | null = null
let dialogResolve, dialogReject;

export const askPassphrase = () => {
	if (setState == null) {
		console.warn("setState==null")
		// return Promise.reject()
	}
	if (dialogComponent == null) {
		console.warn("dialogComponent null")
		return
	}
	dialogComponent.showModal()
	// setState({
	// 	showModal: true
	// })
	promise = new Promise<string>((resolve, reject) => {
		dialogResolve = resolve
		dialogReject = reject
	})

	return promise
}

export const modalTest = () => {
	setState({ showModal: true })
}

export default class PassphraseEntryDialog extends React.Component<Props, InternalState> {

	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
		}
		dialogComponent = this
	}

	render() {
		return (
			<>
				{/* <Button
					variant="primary"
					onClick={_.bind(this.showModal, this)}>Enter passphrase</Button> */}

				<Modal
					centered
					onEntered={this.onEntered}
					onExit={_.bind(this.onExit, this)}
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)}>
					<Modal.Header closeButton>
						Unlock wallet
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Control
									autoComplete="off"
									// required
									name="passphrase"
									type="password"
									placeholder="Wallet passphrase"
									onChange={_.bind(this.onChange, this)}
									defaultValue="" />
							</Form.Group>
							<Button
								type="submit"
								onClick={_.bind(this.handleFormSubmit, this)}
								variant="outline-primary">
								Unlock
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	}
	showModal() {
		this.setState({ showModal: true })
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	componentDidMount() {
		setState = this.setState
	}
	// componentDidUpdate() {
	// 	console.log("####componentDidUpdate")
	// }
	onEntered() {
		// console.log("GenericModalDialog onEntered")
	}
	onExit() {
		// console.log("onExit")
	}
	onChange() {
		this.setState({

		})
	}
	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.stopPropagation()
		e.preventDefault()
		const passphrase = e.currentTarget.form.elements.passphrase.value
		if (promise != null && passphrase !== undefined && passphrase != "") {
			// promise.resolve(passphrase)
			dialogResolve(passphrase)
		}
		this.hideModal()
	}
}

interface OwnProps {
	show: boolean
	onHide: () => void
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = DispatchProps & OwnProps

interface InternalState {
	showModal: boolean
}

