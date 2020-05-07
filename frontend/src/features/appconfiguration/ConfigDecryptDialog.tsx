import { connect } from "react-redux"
import React from "react"
import _ from "lodash"

import { Form, Button } from "react-bootstrap"

import GenericModal from "../../components/Shared/GenericModal"
import { AppError, IApplicationState } from "../../store/types"
import { requestConfigurationDecryptionKeySubmit } from "./settingsSlice"
import { ErrorAlert } from "../../components/Shared/FormStatusAlerts"

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
                onEntered={() => this.passphraseInnerRef.current!.focus()}>
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
                        <ErrorAlert error={this.props.getConfigError} />
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
        this.setState({
            passphrase: "",
        })
        this.props.requestConfigurationDecryptionKeySubmit(
            this.state.passphrase
        )
        return false
    }
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        modalShown: state.appconfiguration.appConfigDecryptionKeyRequested,
        getConfigError: state.appconfiguration.getConfigError,
    }
}

interface InternalState {
    passphrase: string
}

interface OwnProps {
    modalShown: boolean
    getConfigError: AppError | null
}

interface DispatchProps {
    requestConfigurationDecryptionKeySubmit: typeof requestConfigurationDecryptionKeySubmit
}

const mapDispatchToProps = {
    requestConfigurationDecryptionKeySubmit,
}

type Props = OwnProps & DispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(ConfigDecryptDialog)
