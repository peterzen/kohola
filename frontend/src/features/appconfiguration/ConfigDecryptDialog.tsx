import { connect } from "react-redux"
import React from "react"
import _ from "lodash"

import { Form, Button } from "react-bootstrap"

import GenericModal from "../../components/Shared/GenericModal"
import { IApplicationState } from "../../store/types"
import { requestConfigurationDecryptionKeySuccess } from "./settingsSlice"

class ConfigDecryptDialog extends React.Component<Props, InternalState> {
    private passphraseInnerRef: React.RefObject<any> = React.createRef<any>()

    constructor(props: Props) {
        super(props)
        this.state = {
            passphrase: "",
        }
    }

    render() {
        return (
            <GenericModal
                title="Unlock configuration"
                show={this.props.modalShown}
                onEntered={() => this.passphraseInnerRef.current!.focus()}
                onHide={() => {}} // no need for this, the dialog must be fully modal, i.e. no [X] Close button
            >
                <Form onSubmit={_.bind(this.handleFormSubmit, this)}>
                    <Form.Group>
                        <Form.Control
                            autoComplete="off"
                            name="password"
                            type="password"
                            placeholder="Passphrase"
                            ref={this.passphraseInnerRef}
                            value={this.state.passphrase}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => this.handleChange(e.currentTarget.value)}
                        />
                        <Form.Text className="text-muted">
                            This passphrase will be used to decrypt your
                            application configuration.
                        </Form.Text>
                    </Form.Group>
                    <div className="text-right">
                        <Button className="primary" type="submit">
                            Unlock
                        </Button>
                    </div>
                </Form>
            </GenericModal>
        )
    }

    handleChange(passphrase: string) {
        this.setState({
            passphrase: passphrase,
        })
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.props.requestConfigurationDecryptionKeySuccess(
            this.state.passphrase
        )
        return false
    }
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        modalShown: state.appconfiguration.appConfigDecryptionKeyRequested,
    }
}

interface InternalState {
    passphrase: string
}

interface OwnProps {
    modalShown: boolean
}

interface DispatchProps {
    requestConfigurationDecryptionKeySuccess: typeof requestConfigurationDecryptionKeySuccess
}

const mapDispatchToProps = {
    requestConfigurationDecryptionKeySuccess,
}

type Props = OwnProps & DispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(ConfigDecryptDialog)
