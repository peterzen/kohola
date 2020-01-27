import * as React from 'react';

import { Modal, Button } from 'react-bootstrap';


export default class GenericModalDialog extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			show: props.show
		}
	}

	DialogContent() {
		return (
			<span>Default dialog content</span>
		)
	}

	render() {

		return (
			<Modal
				centered
				show={this.props.show}
				onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.modalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<this.DialogContent />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.onHide}>
						Close
						</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}




interface Props {
	modalTitle: string
	show: boolean
	onHide: () => void
}


interface InternalState {
	show: boolean
}
