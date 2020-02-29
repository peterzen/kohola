import _ from 'lodash';
import * as React from 'react';

import { Modal, Button } from 'react-bootstrap';
import SendDialogContainer from './SendDialogContainer';


export default class SendTransactionModal extends React.Component<Props, InternalState> {
	render() {
		// console.log("GenericModalDialog render")
		return (
			<Modal
				centered
				onEntered={() => this.onEntered()}
				onExit={() => this.onExit()}
				show={this.props.show}
				onHide={() => this.props.onHide()}
				size="lg">
				<Modal.Header closeButton>
					Send funds
				</Modal.Header>
				<Modal.Body>
					<SendDialogContainer />
				</Modal.Body>
			</Modal>
		)
	}
	onEntered() {
		// console.log("GenericModalDialog onEntered")
	}
	onExit() {
		// console.log("onExit")
	}
}

interface Props {
	show: boolean
	onHide: () => void
}


interface InternalState {
}
