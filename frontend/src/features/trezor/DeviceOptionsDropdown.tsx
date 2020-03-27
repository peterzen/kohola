import * as React from "react"
import { connect } from "react-redux"

import { Dropdown, Badge } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"

import { IApplicationState } from "../../store/types"


class DeviceOptionsDropdown extends React.Component<Props>{
	render() {
		return (
			<Dropdown
				alignRight
				onSelect={(evtKey: string) => this.props.menuHandler(evtKey)}>
				<Dropdown.Toggle id={"trezor-device-options-dropdown"} className="no-arrow">
					<div className="text-muted">
						<FontAwesomeIcon icon={faEllipsisV} />
					</div>
				</Dropdown.Toggle>
				<Dropdown.Menu
				>
					<Dropdown.Item
						eventKey={MenuItems[MenuItems.CONNECT]}
						disabled={false}>
						Connect
					</Dropdown.Item>

					<Dropdown.Item
						eventKey={MenuItems[MenuItems.FORGET_DEVICE]}
						disabled={true}>
						Forget device
					</Dropdown.Item>

					<Dropdown.Item
						eventKey={MenuItems[MenuItems.SETTINGS]}
						disabled={false}>
						Settings...
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}

export enum MenuItems {
	CONNECT,
	FORGET_DEVICE,
	SETTINGS,
	CHANGE_LABEL,
}

interface OwnProps {
	menuHandler:(evtKey:string)=>void
}

interface DispatchProps {}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
    return {}
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceOptionsDropdown)
