import * as React from 'react';

import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';


export default class NewAddressModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: props.show
		}
	}

	handleClose = () => {
		this.setState({ show: false })
	}

	handleShow = () => {
		this.setState({ show: true })
	}

	render() {


		const handleClose = this.handleClose.bind(this);
		const handleShow = this.handleShow.bind(this);

		return (
			<>
				<Button variant="primary" onClick={handleShow}>
					Launch demo modal
      </Button>
				<Modal show={this.state.show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
			</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
			</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}
