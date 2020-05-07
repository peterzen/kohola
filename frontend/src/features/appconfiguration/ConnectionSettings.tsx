import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import * as React from "react"
import { connect } from "react-redux"

import { AppError, IApplicationState, AppDispatch } from "../../store/types"
import { Row, Col, Button } from "react-bootstrap"
import { RPCEndpoint, GRPCEndpoint } from "../../proto/walletgui_pb"
import RPCEndpointConfigForm from "./RPCEndpointConfigForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

// @ts-ignore
import Fade from "react-reveal/Fade"
import { updateEndpoint, saveConfigurationAttempt } from "./settingsSlice"

class ConnectionSettings extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            walletEndpoints: props.walletEndpoints,
        }
    }

    render() {
        const walletEndpoints = this.state.walletEndpoints
        return (
            <div>
                <div className="mt-3 mb-3">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => this.createNewEndpoint()}>
                        <FontAwesomeIcon icon={faPlus} /> Add wallet host...
                    </Button>
                </div>
                <Fade fade cascade>
                    <Row>
                        {walletEndpoints.map((endPoint) => (
                            <Col sm={6} key={endPoint.getId()} className="mb-4">
                                <RPCEndpointConfigForm
                                    onCancel={() => this.cancelEdit}
                                    onFormComplete={_.bind(
                                        this.finishEdit,
                                        this
                                    )}
                                    endPointConfig={endPoint}
                                    error={this.props.setConfigError}
                                    title={endPoint.getLabel()}
                                />
                            </Col>
                        ))}
                    </Row>
                </Fade>
            </div>
        )
    }

    createNewEndpoint() {
        const endPoints = this.state.walletEndpoints
        const newEndpoint = new GRPCEndpoint()
        newEndpoint.setId(uuidv4())
        endPoints.push(newEndpoint)
        this.setState({
            walletEndpoints: endPoints,
        })
    }

    finishEdit(endpoint: GRPCEndpoint | RPCEndpoint) {
        this.props.updateEndpoint(endpoint)
        this.cancelEdit()
    }

    cancelEdit() {
        debugger
        this.setState({
            walletEndpoints: [],
        })
    }
}

interface OwnProps {
    walletEndpoints: GRPCEndpoint[]
    setConfigError: AppError | null
}

interface InternalState {
    walletEndpoints: GRPCEndpoint[]
}

interface DispatchProps {
    updateEndpoint: (endpoint: GRPCEndpoint | RPCEndpoint) => void
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
    return {
        walletEndpoints: state.appconfiguration.appConfig.getWalletEndpointsList(),
        setConfigError: state.appconfiguration.setConfigError,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        updateEndpoint: (endpoint: GRPCEndpoint) => {
            dispatch(updateEndpoint(endpoint))
            dispatch(saveConfigurationAttempt())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionSettings)
