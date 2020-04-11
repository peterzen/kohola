import _ from "lodash"
import * as React from "react"

import { Form, Button, FormControl, Table, Row, Col } from "react-bootstrap"

import { AppError } from "../../../store/types"
import { rawToHex } from "../../../helpers/byteActions"
import DialogAlert from "./DialogAlert"
import { AuthoredTransactionMetadata } from "../transactionsSlice"
import { TxHash } from "../../../components/Shared/shared"
import { Amount } from "../../../components/Shared/Amount"

const ReviewTx = (props: { txInfo: AuthoredTransactionMetadata }) => {
    const txInfo = props.txInfo
    return (
        <div>
            <Table>
                <tbody>
                    {txInfo.sourceAccount && (
                        <tr>
                            <th>Source account:</th>
                            <td>{txInfo.sourceAccount.getAccountName()}</td>
                        </tr>
                    )}
                    <tr>
                        <th>Total amount:</th>
                        <td>
                            <Amount
                                amount={txInfo.totalOutputAmount}
                                showCurrency
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Fee</th>
                        <td>
                            Fee rate: {txInfo.feeRate}
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Inputs ({txInfo.decodedTx.getInputsList().length}):
                        </th>
                        <td>
                            {txInfo.decodedTx.getInputsList().map((i) => (
                                <div key={i.getPreviousTransactionHash_asB64()}>
                                    <TxHash
                                        hash={i.getPreviousTransactionHash_asU8()}
                                    />
                                    :{i.getPreviousTransactionIndex()}
                                </div>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <th>Outputs:</th>
                        <td>
                            <Table>
                                <tbody>
                                    {txInfo.nonChangeOutputs.map((o) => {
                                        return (
                                            <tr key={o.address}>
                                                <td>{o.address}</td>
                                                <td>
                                                    <Amount
                                                        amount={o.amount}
                                                        showCurrency
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                            {txInfo.changeAddress && (
                                <div>
                                    Change destination: {txInfo.changeAddress}
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Form>
                <Form.Group controlId="unsignedTxHex">
                    <Form.Label>Unsigned tx</Form.Label>
                    <Form.Control
                        readOnly
                        as="textarea"
                        cols="20"
                        rows="3"
                        value={rawToHex(txInfo.unsignedTx)}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}
export default class SignDialog extends React.Component<
    OwnProps,
    InternalState
> {
    constructor(props: OwnProps) {
        super(props)
        this.state = {
            error: null,
            formIsValidated: false,
            passphrase: "",
        }
    }

    render() {
        return (
            <div>
                <h4>Review and confirm transaction</h4>
                {this.props.txInfo != null && (
                    <ReviewTx txInfo={this.props.txInfo} />
                )}
                <Form
                    validated={this.state.formIsValidated && !this.props.error}
                    onSubmit={_.bind(this.handleFormSubmit, this)}
                >
                    <Form.Group controlId="destinationAddressControl">
                        <Form.Label>Wallet passphrase:</Form.Label>
                        <FormControl
                            required
                            autoComplete="off"
                            tabIndex={0}
                            type="password"
                            placeholder=""
                            onChange={_.bind(
                                this.handleWalletPassphraseChange,
                                this
                            )}
                            name="walletPassphrase"
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid passphrase
                        </Form.Control.Feedback>
                    </Form.Group>
                    <DialogAlert error={this.props.error} />
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
                                Sign tx
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

    handleWalletPassphraseChange(e: React.ChangeEvent<HTMLInputElement>) {
        const passphrase = e.currentTarget.value
        if (!passphrase.length) {
            return
        }
        this.setState({
            passphrase: passphrase,
        })
        return true
    }

    handleCancel(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ formIsValidated: true })
        this.props.onFormComplete(this.state)
        return false
    }
}

interface OwnProps {
    error: AppError | null
    txInfo: AuthoredTransactionMetadata | null
    onFormComplete: (formData: ISignDialogFormData) => void
    onCancel: () => void
}

interface InternalState {
    error: AppError | null
    formIsValidated: boolean
    passphrase: string
}

export interface ISignDialogFormData {
    passphrase: string
}
