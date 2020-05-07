import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { Form, Button, FormControl, Row, Col } from "react-bootstrap"
import { StepWizardChildProps } from "react-step-wizard"

import { AppError } from "../../../store/types"
import DialogAlert from "./DialogAlert"
import { AuthoredTransactionMetadata } from "../models"
import ReviewTransaction from "./ReviewTransaction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignature } from "@fortawesome/free-solid-svg-icons"
import { signTransaction, cancelSignTransaction } from "../actions"

class SignDialog extends React.Component<
    Props & Partial<StepWizardChildProps>,
    InternalState
> {
    inputRef: React.RefObject<any> = React.createRef()

    constructor(props: Props) {
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
                {this.props.txInfo != null && (
                    <ReviewTransaction txInfo={this.props.txInfo} />
                )}
                <hr />
                <Form
                    className="m-0"
                    validated={this.state.formIsValidated && !this.props.error}
                    onSubmit={_.bind(this.handleFormSubmit, this)}>
                    <Form.Group controlId="passphraseControl" as={Row}>
                        <Form.Label column sm={2}>
                            Wallet passphrase
                        </Form.Label>
                        <Col sm={4}>
                            <FormControl
                                required
                                autoComplete="off"
                                tabIndex={0}
                                type="password"
                                placeholder=""
                                ref={this.inputRef}
                                onChange={_.bind(
                                    this.handleWalletPassphraseChange,
                                    this
                                )}
                                name="walletPassphrase"
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid passphrase
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <DialogAlert error={this.props.error} />
                    <Row>
                        <Col>
                            <Button
                                tabIndex={4}
                                variant="secondary"
                                onClick={(
                                    e: React.FormEvent<HTMLButtonElement>
                                ) => this.handleCancel(e)}>
                                Back
                            </Button>
                        </Col>
                        <Col className="text-right">
                            <Button
                                tabIndex={4}
                                variant="primary"
                                type="submit">
                                <FontAwesomeIcon icon={faSignature} /> Sign tx
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

    handleCancel(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.props.cancelSignTransaction()
        this.props.onCancel()
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ formIsValidated: true })
        this.signTransaction()
        this.props.onCompleted()
        return false
    }

    signTransaction() {
        this.props.signTransaction(
            this.props.txInfo?.unsignedTx,
            this.state.passphrase
        )
    }

    componentDidMount() {
        this.props.onStepChangeSubscribe(() => {
            if (this.props.isActive) {
                setTimeout(() => {
                    this.inputRef.current.focus()
                }, 1000)
            }
        })
    }
}

interface OwnProps {
    error: AppError | null
    txInfo: AuthoredTransactionMetadata | null
    isActive?: boolean
    onCancel: () => void
    onCompleted: () => void
    onStepChangeSubscribe: (fn: () => void) => void
}

interface DispatchProps {
    signTransaction: typeof signTransaction
    cancelSignTransaction: typeof cancelSignTransaction
}

interface InternalState {
    error: AppError | null
    formIsValidated: boolean
    passphrase: string
}

type Props = OwnProps & DispatchProps

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = {
    signTransaction,
    cancelSignTransaction,
}

export interface ISignDialogFormData {
    passphrase: string
}

export default connect(mapStateToProps, mapDispatchToProps)(SignDialog)
