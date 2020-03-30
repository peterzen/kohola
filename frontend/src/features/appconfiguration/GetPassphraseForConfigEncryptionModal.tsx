import _ from 'lodash';
import * as React from 'react';
import GenericModal, { GenericModalProps } from '../../components/Shared/GenericModal';
import { Form, Button } from 'react-bootstrap';

export class GetPassphraseForConfigEncryptionModal extends React.Component<GenericModalProps & OwnProps, InternalState>{
    constructor(props: GenericModalProps & OwnProps) {
        super(props)
        this.state = {
            passphrasesAreNotTheSameErrorMsg: "",
            passphraseInnerRef: React.createRef()
        }
    }

    render() {
        return (
            <GenericModal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Form>
                    <Form.Group>
                        <Form.Control
                            required
                            ref={this.state.passphraseInnerRef}
                            autoComplete="off"
                            name="passphrase"
                            type="password"
                            onFocus={_.bind(this.handleFocus, this)}
                            placeholder="New passphrase"
                            defaultValue="" />
                        {this.props.passphraseModalNeedVerify &&
                            <Form.Control
                                required
                                autoComplete="off"
                                name="verifyPassphrase"
                                type="password"
                                placeholder="Verify passphrase"
                                onFocus={_.bind(this.handleFocus, this)}
                                defaultValue="" />
                        }
                        <span className="help-block">{this.state.passphrasesAreNotTheSameErrorMsg}</span>
                    </Form.Group>
                    <Form.Group>
                        <div className="text-right pr-4">
                            <Button
                                variant="secondary"
                                onClick={this.props.onHide}
                            >
                                Cancel
							</Button>
                            <Button
                                type="submit"
                                onClick={_.bind(this.handleFormSubmit, this)}
                                variant="primary">
                                Submit
							</Button>
                        </div>

                    </Form.Group>
                </Form>
            </GenericModal>
        )
    }

    handleFocus(e: React.FormEvent<HTMLFormElement>) {
        this.setState({
            passphrasesAreNotTheSameErrorMsg: ""
        })
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.stopPropagation();
        e.preventDefault();

        this.setState({
            passphrasesAreNotTheSameErrorMsg: ""
        })

        const passphrase = e.currentTarget.form.elements.passphrase.value;

        if (this.props.passphraseModalNeedVerify) {
            const verifyPassphrase = e.currentTarget.form.elements.verifyPassphrase.value;

            if (passphrase != verifyPassphrase) {
                this.setState({
                    passphrasesAreNotTheSameErrorMsg: "Your new passphrase is not the same as the verify passphrase"
                })
            } else {
                this.props.passphraseModalCallback(passphrase)
            }
        } else {
            this.props.passphraseModalCallback(passphrase)
        }
    }
}

interface InternalState {
    passphrasesAreNotTheSameErrorMsg: string
    passphraseInnerRef: React.RefObject<any>
}

interface OwnProps {
    passphraseModalCallback: ((result: string) => void)
    passphraseModalNeedVerify: boolean
}

export default GetPassphraseForConfigEncryptionModal