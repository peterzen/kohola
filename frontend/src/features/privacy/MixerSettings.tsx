import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { Row, Col, Form, Button, Card } from "react-bootstrap"

import { AccountSelector } from "../../components/Shared/shared"
import { AppError, IApplicationState } from "../../store/types"
import OnOffIndicator from "../../components/Shared/OnOffIndicator"
import { runAccountMixer, stopAccountMixer } from "./mixerSlice"
import PassphraseEntryDialog, {
    askPassphrase,
} from "../../components/Shared/PassphraseEntryDialog"
import {
    RunAccountMixerRequest,
    RunAccountMixerResponse,
} from "../../proto/api_pb"
import {
    saveAccountMixerRequestDefaults,
    getAppConfig,
} from "../appconfiguration/settingsSlice"
import { ErrorAlert } from "../../components/Shared/FormStatusAlerts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons"
import { getConnectedEndpointId } from "../app/appSlice"

class MixerSettingsForm extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            error: null,
            isDirty: false,
            formRef: React.createRef(),
            formIsValidated: false,
            accountmixerRequest: props.accountmixerRequest,
        }
    }

    render() {
        const onChange = _.bind(this.handleChange, this)
        const request = this.state.accountmixerRequest
        const [csppHost, csppPort] = request.getCsppServer().split(":")
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Row className="mt-3">
                            <Col sm={4}>
                                <Card.Title>Account mixer service</Card.Title>
                            </Col>
                            <Col sm={4} className="text-center pt-2">
                                <OnOffIndicator
                                    status={this.props.isAccountMixerRunning}
                                    onMessage="CSPP++ mixer is running"
                                    offMessage="CSPP++ mixer is not running"
                                />
                                <ErrorAlert
                                    error={this.props.runAccountMixerError}
                                />
                            </Col>
                            <Col sm={4}>
                                <span className="float-right">
                                    <Button
                                        variant="primary"
                                        disabled={
                                            this.props.isAccountMixerRunning
                                        }
                                        onClick={() =>
                                            this.startAccountMixer()
                                        }>
                                        <FontAwesomeIcon icon={faPlay} /> Start
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        disabled={
                                            !this.props.isAccountMixerRunning
                                        }
                                        onClick={() => this.stopAccountMixer()}>
                                        <FontAwesomeIcon icon={faStop} /> Stop
                                    </Button>
                                </span>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>
                        <Form
                            ref={this.state.formRef}
                            validated={this.state.formIsValidated}
                            onSubmit={_.bind(this.handleFormSubmit, this)}
                            className={
                                this.props.inProgress ? "in-progress" : ""
                            }>
                            <fieldset
                                disabled={
                                    this.props.isAccountMixerRunning ||
                                    this.props.runAccountMixerAttempting
                                }>
                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                        <Form.Label>Mixed account</Form.Label>
                                    </Col>
                                    <Col xs={5}>
                                        <AccountSelector
                                            name="mixed_account"
                                            defaultValue={request.getMixedAccount()}
                                            tabIndex={1}
                                            onChange={onChange}
                                        />
                                        <small className="form-text text-muted">
                                            The account where the mixed funds
                                            should end up
                                        </small>
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Control
                                            name="mixed_account_branch"
                                            defaultValue={request.getMixedAccountBranch()}
                                            tabIndex={2}
                                            onChange={onChange}
                                            as="select">
                                            {_.map([0, 1], (n) => (
                                                <option key={n} value={n}>
                                                    {n}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <small className="form-text text-muted">
                                            Branch
                                        </small>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                        <Form.Label>Change account</Form.Label>
                                    </Col>
                                    <Col xs={5}>
                                        <AccountSelector
                                            name="change_account"
                                            tabIndex={3}
                                            defaultValue={request.getChangeAccount()}
                                            onChange={onChange}
                                        />
                                        <small className="form-text text-muted">
                                            The account that will be used for
                                            any unmixed change that is waiting
                                            to be mixed.
                                        </small>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                        <Form.Label>CSPP server</Form.Label>
                                    </Col>
                                    <Col sm={5}>
                                        <Form.Control
                                            autoComplete="off"
                                            required
                                            type="text"
                                            name="cspp_server_host"
                                            placeholder="Hostname or IP"
                                            onChange={onChange}
                                            tabIndex={4}
                                            defaultValue={csppHost}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control
                                            autoComplete="off"
                                            required
                                            name="cspp_server_port"
                                            type="number"
                                            placeholder="Port"
                                            onChange={onChange}
                                            tabIndex={5}
                                            defaultValue={csppPort}
                                        />
                                    </Col>
                                </Form.Group>
                                <div className="text-right mt-5">
                                    <Button
                                        disabled={!this.state.isDirty}
                                        type="submit"
                                        variant="primary">
                                        Save settings
                                    </Button>
                                </div>
                            </fieldset>
                        </Form>
                    </Card.Body>
                </Card>
                <PassphraseEntryDialog show={false} />
            </div>
        )
    }

    startAccountMixer() {
        const request = this.state.accountmixerRequest
        const cancelError = new AppError(
            0,
            "Please unlock wallet with your passphrase"
        )

        askPassphrase()
            .then((passphrase) => {
                if (passphrase == "") {
                    throw cancelError
                }
                return request.setPassphrase(
                    new Uint8Array(Buffer.from(passphrase))
                )
            })
            .then((r) => {
                return this.props.runAccountMixer(request)
            })
            .catch((err) => {
                this.setState({ error: err })
                console.error(err)
                console.log("askPassphrase", request.toObject())
                // debugger
            })
    }

    stopAccountMixer() {
        this.props.stopAccountMixer()
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            formIsValidated: true,
            isDirty: false,
        })
        this.props.saveAccountMixerRequestDefaults(
            this.props.walletEndpointId,
            this.state.accountmixerRequest
        )
        return false
    }

    handleChange() {
        this.setState({
            isDirty: true,
        })
        if (!this.state.formRef.current.checkValidity()) {
            return
        }
        loadFormFields(this.state.formRef, this.state.accountmixerRequest)
    }
}

interface InternalState {
    error: AppError | null
    isDirty: boolean
    formRef: React.RefObject<any>
    formIsValidated: boolean
    accountmixerRequest: RunAccountMixerRequest
}

interface OwnProps {
    error: AppError | null
    inProgress: boolean
    walletEndpointId: string
    accountmixerRequest: RunAccountMixerRequest
    runAccountMixerError: AppError | null
    runAccountMixerResponse: RunAccountMixerResponse
    isAccountMixerRunning: boolean
    runAccountMixerAttempting: boolean
}

interface DispatchProps {
    runAccountMixer: typeof runAccountMixer
    stopAccountMixer: typeof stopAccountMixer
    saveAccountMixerRequestDefaults: typeof saveAccountMixerRequestDefaults
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
    const walletEndpointId = getConnectedEndpointId(state)
    const request =
        getAppConfig(state)
            .getWalletPreferencesMap()
            .get(walletEndpointId)
            ?.getAccountMixerRequestDefaults() || new RunAccountMixerRequest()
    return {
        error: state.appconfiguration.setConfigError,
        inProgress: state.appconfiguration.setConfigAttempting,
        accountmixerRequest: request,
        walletEndpointId: walletEndpointId,
        runAccountMixerResponse: state.mixer.runAccountMixerResponse,
        runAccountMixerError: state.mixer.runAccountMixerError,
        isAccountMixerRunning: state.mixer.isAccountMixerRunning,
        runAccountMixerAttempting: state.mixer.runAccountMixerAttempting,
    }
}

const mapDispatchToProps = {
    runAccountMixer,
    stopAccountMixer,
    saveAccountMixerRequestDefaults,
}

export default connect(mapStateToProps, mapDispatchToProps)(MixerSettingsForm)

const loadFormFields = (
    formRef: React.RefObject<any>,
    obj: RunAccountMixerRequest
) => {
    const f = formRef.current
    const csppServer = `${f.cspp_server_host.value}:${f.cspp_server_port.value}`
    obj.setChangeAccount(f.change_account.value)
    obj.setCsppServer(csppServer)
    obj.setMixedAccount(f.mixed_account.value)
    obj.setMixedAccountBranch(f.mixed_account_branch.value)
    obj.setPassphrase("")
    return obj
}
