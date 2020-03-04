import _ from "lodash"
import * as React from "react"

import { Form, Button, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPaste,
} from '@fortawesome/free-solid-svg-icons'
import { AppError } from "../../../store/types";
import { rawToHex } from "../../../helpers/byteActions";
import { SignTransactionResponse } from "../../../proto/api_pb";

export default class PublishDialog extends React.Component<OwnProps, InternalState>{
	render() {
		return (
			<div>
				<h4>Publish tx?</h4>
				<Form
					onSubmit={_.bind(this.handleFormSubmit, this)}
				>
					<Form.Group controlId="unsignedTxHex">
						<Form.Label>Signed tx</Form.Label>
						<Form.Control
							readOnly
							as="textarea"
							cols="20"
							rows="5"
							value={rawToHex(this.props.signTransactionResponse.getTransaction_asU8())}
						/>
					</Form.Group>
					<Row>
						<Col>
							<Button
								tabIndex={4}
								variant="outline-secondary"
								onClick={this.props.onCancel}
							>Back</Button>
						</Col>
						<Col className="text-right">
							<Button
								tabIndex={4}
								variant="primary"
								type="submit">Publish tx</Button>

						</Col>
					</Row>
				</Form>
			</div>
		)
	}

	handleCancel(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ formIsValidated: true })
		this.props.onFormComplete()
		return false;
	}
}


interface OwnProps {
	error: AppError | null,
	signTransactionResponse: SignTransactionResponse
	onFormComplete: () => void
	onCancel: () => void
}


interface InternalState {
}
