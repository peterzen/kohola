import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { Form, Button, Row, Col } from "react-bootstrap"

import { AppError, IApplicationState } from "../../../store/types"
import { rawToHex } from "../../../helpers/byteActions"
import { SignTransactionResponse } from "../../../proto/api_pb"
import { publishTransaction } from "../actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons"

class PublishDialog extends React.Component<Props> {
    render() {
        if (this.props.signTransactionResponse == null) return null
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
                                <FontAwesomeIcon icon={faBroadcastTower} /> Broadcast tx
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
        this.props.publishTransaction()
        this.props.onCompleted()

        return false
    }
}

interface OwnProps {
    error: AppError | null
    signTransactionResponse?: SignTransactionResponse | null
    onCancel: () => void
    onCompleted: () => void
    onStepChangeSubscribe: (fn: () => void) => void
}


interface DispatchProps {
    publishTransaction: typeof publishTransaction
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
    return {
    }
}

const mapDispatchToProps = {
    publishTransaction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishDialog)
