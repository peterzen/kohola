import _ from "lodash"
import * as React from "react"

import { Form, Button, Row, Col } from "react-bootstrap"

import { AppError } from "../../../store/types"
import { rawToHex } from "../../../helpers/byteActions"
import { SignTransactionResponse } from "../../../proto/api_pb"

export default class PublishDialog extends React.Component<OwnProps> {
    render() {
        const txHash = rawToHex(
            this.props.signTransactionResponse.getTransaction_asU8()
        )
        return (
            <div>
                <h4>Broadcast transaction</h4>
                <Form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        this.handleFormSubmit(e)
                    }
                >
                    <Form.Group controlId="unsignedTxHex">
                        <Form.Label>Signed tx</Form.Label>
                        <Form.Control
                            readOnly
                            as="textarea"
                            cols="20"
                            rows="5"
                            value={txHash}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button
                                tabIndex={4}
                                variant="secondary"
                                onClick={this.props.onCancel}
                            >
                                Back
                            </Button>
                        </Col>
                        <Col className="text-right">
                            <Button
                                tabIndex={4}
                                variant="primary"
                                type="submit"
                            >
                                Broadcast tx
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.props.onFormComplete()
        return false
    }
}

interface OwnProps {
    error: AppError | null
    signTransactionResponse: SignTransactionResponse
    onFormComplete: () => void
    onCancel: () => void
}
