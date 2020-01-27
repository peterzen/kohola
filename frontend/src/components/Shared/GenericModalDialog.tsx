import * as React from 'react';

import { Modal, Button } from 'react-bootstrap';


export default class GenericModalDialog<P, S> extends React.Component<P & Props, InternalState & S> {
	constructor(props: P & Props) {
		super(props)
		this.DialogContent = this.DialogContent.bind(this)
		this.onEntered=this.onEntered.bind(this)
		this.onExit=this.onExit.bind(this)
		this.ModalTitle=this.ModalTitle.bind(this)
	}

	DialogContent() {
		return (
			<span>Default dialog content</span>
		)
	}

	ModalTitle() {
		if (this.props.modalTitle == "") {
			return null
		}
		return (
			<Modal.Title>{this.props.modalTitle}</Modal.Title>
		)
	}

	render() {
		// console.log("GenericModalDialog render")
		return (
			<Modal
				centered
				onEntered={this.onEntered}
				onExit={this.onExit}
				show={this.props.show}
				onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<this.ModalTitle/>
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
	onEntered() {
		// console.log("GenericModalDialog onEntered")
	}
	onExit() {
		// console.log("onExit")
	}
}

interface Props {
	modalTitle: string
	show: boolean
	onHide: () => void
}


interface InternalState {
}
