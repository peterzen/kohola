import * as React from 'react';

import { Modal } from 'react-bootstrap'

export default class GenericModal<P, S> extends React.Component<P & GenericModalProps, S> {
	static defaultProps = {
		onEntered: () => { },
		onExit: () => { },
	}

	render() {
		return (
			<Modal
				{...this.props}
				centered
				onEntered={() => this.props.onEntered()}
				onExit={() => this.props.onExit()}
				show={this.props.show}
				onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.props.children}
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="secondary" size="sm" onClick={this.props.onHide}>
						Close
					</Button>
				</Modal.Footer> */}
			</Modal>
		)
	}
}

export interface GenericModalProps {
	title: string
	show: boolean
	onExit: () => void
	onHide: () => void
	onEntered: () => void
}

