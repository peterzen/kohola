import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, Image } from 'react-bootstrap';

import { IApplicationState, AppError } from '../../store/types';
import { loadDeviceList, ITrezorState, reloadTrezorDeviceList, changeLabel, connectDevice, trezorIsConnected, getWalletCreationMasterPubKey, changeToDecredHomeScreen } from './trezorSlice';
import { ErrorAlert } from '../../components/Shared/FormStatusAlerts';
import { faArrowCircleLeft, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DeviceOptionsDropdown, { MenuItems } from './DeviceOptionsDropdown';

// @ts-ignore
import modelOneImg from "./images/T1.png"
// @ts-ignore
import modelTImg from './images/T2.png'
import OnOffIndicator from '../../components/Shared/OnOffIndicator';

class TrezorSettings extends React.Component<Props> {

	render() {

		return (
			<div>
				<div className="text-right">
					<Button onClick={() => this.reloadDevices()} variant="secondary">
						<FontAwesomeIcon icon={faSyncAlt} />{" "}
					Refresh
				</Button>
				</div>
				<ErrorAlert error={this.props.error} />
				<ErrorAlert error={this.props.transportError} />
				{this.props.deviceList != null && (
					<Row>
						{_.map(this.props.deviceList.devices, device => {
							const f = device.features
							return (
								<Col key={f.device_id} sm={6}>
									<Row>
										<Col xs={3}>
											<Image src={modelTImg} fluid />
										</Col>
										<Col xs={9}>
											<div className="float-right">
												<DeviceOptionsDropdown menuHandler={(evtKey: string) => this.menuHandler(device, evtKey)} />
											</div>
											<div>
												<div className="float-left pt-1 mr-1">
													<OnOffIndicator status={this.props.isConnected} />
												</div>
												<h5>
													{f.label}
												</h5>
											</div>
											<div className="text-muted">{f.device_id}</div>
											<div className="text-muted">Version: {`${f.major_version}.${f.minor_version}.${f.patch_version}`}</div>
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
		// this.props.loadDeviceList()
	}

	menuHandler(device, evtKey: string) {
		switch (evtKey) {
			case MenuItems[MenuItems.CONNECT]:
				this.props.connectDevice(device)
				break

			case MenuItems[MenuItems.SETTINGS]:
				// this.props.getWalletCreationMasterPubKey()
				// this.props.changeLabel("blah")
				// this.props.changeToDecredHomeScreen()
				break
		}
	}
}

interface OwnProps {
	isConnected:boolean
	device: any
	deviceList: any
}


const mapStateToProps = function (state: IApplicationState): OwnProps {
	return {
		isConnected: trezorIsConnected(state),
		device: state.trezor.device,
		deviceList: state.trezor.deviceList,
	}
}

interface DispatchProps {
	loadDeviceList: typeof loadDeviceList
	reloadTrezorDeviceList: typeof reloadTrezorDeviceList
	connectDevice: typeof connectDevice
	changeLabel: typeof changeLabel
	getWalletCreationMasterPubKey: typeof getWalletCreationMasterPubKey
	changeToDecredHomeScreen:typeof changeToDecredHomeScreen
}

const mapDispatchToProps = {
	loadDeviceList,
	reloadTrezorDeviceList,
	connectDevice,
	changeLabel,
	getWalletCreationMasterPubKey,
	changeToDecredHomeScreen
}

type Props = ITrezorState & OwnProps & DispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(TrezorSettings)
