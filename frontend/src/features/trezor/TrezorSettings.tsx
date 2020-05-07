import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { Form, Row, Col, Button, Image } from "react-bootstrap"

import { IApplicationState, AppError } from "../../store/types"
import {
    trezorDevices,
    loadDeviceListAttempt,
    loadDeviceList,
    ITrezorState,
    reloadTrezorDeviceList,
} from "./trezorSlice"
import { ErrorAlert } from "../../components/Shared/FormStatusAlerts"
import { faArrowCircleLeft, faSyncAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import DeviceOptionsDropdown from "./DeviceOptionsDropdown"

// @ts-ignore
import modelOneImg from "./images/T1.png"
// @ts-ignore
import modelTImg from "./images/T2.png"

class TrezorSettings extends React.Component<Props> {
    render() {
        return (
            <div>
                <div className="text-right">
                    <Button
                        onClick={() => this.reloadDevices()}
                        variant="secondary">
                        <FontAwesomeIcon icon={faSyncAlt} /> Refresh
                    </Button>
                </div>
                <ErrorAlert error={this.props.error} />
                <ErrorAlert error={this.props.transportError} />
                {this.props.deviceList != null && (
                    <Row>
                        {_.map(this.props.deviceList.devices, (device) => {
                            const f = device.features
                            return (
                                <Col key={f.device_id} sm={6}>
                                    <Row>
                                        <Col xs={3}>
                                            <Image src={modelTImg} fluid />
                                        </Col>
                                        <Col xs={9}>
                                            <div className="float-right">
                                                <DeviceOptionsDropdown />
                                            </div>
                                            <h5>{f.label}</h5>
                                            <div className="text-muted">
                                                {f.device_id}
                                            </div>
                                            <div className="text-muted">
                                                Version:{" "}
                                                {`${f.major_version}.${f.minor_version}.${f.patch_version}`}
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        })}
                    </Row>
                )}
            </div>
        )
    }

    reloadDevices() {
        this.props.reloadTrezorDeviceList()
    }

    componentDidMount() {
        // trezorDevices()

        this.props.loadDeviceList()
    }
}

interface OwnProps {}

const mapStateToProps = function (state: IApplicationState): ITrezorState {
    return state.trezor
}

interface DispatchProps {
    loadDeviceList: typeof loadDeviceList
    reloadTrezorDeviceList: typeof reloadTrezorDeviceList
}

const mapDispatchToProps = {
    loadDeviceList,
    reloadTrezorDeviceList,
}

type Props = ITrezorState & OwnProps & DispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(TrezorSettings)
