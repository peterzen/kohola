import * as React from 'react';

import { Modal, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';

export default class GenericModal<P, S> extends React.Component<P & Props, InternalState & S> {
	render() {
		return (
			<Modal
				{...this.props}
				centered
				onEntered={() => this.onEntered()}
				onExit={() => this.onExit()}
				show={this.props.show}
				onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.props.children}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" size="sm" onClick={this.props.onHide}>
						Close
					</Button>
				</Modal.Footer>
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
	title: string
	show: boolean
	onHide: () => void
}


interface InternalState {
}
