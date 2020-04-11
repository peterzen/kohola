import * as React from "react"
import { connect } from "react-redux"

import { Dropdown, Badge } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"

import { IApplicationState } from "../../store/types"

class DeviceOptionsDropdown extends React.Component<Props> {
    render() {
        return (
            <Dropdown
                alignRight
                onSelect={(evtKey: string) => this.menuHandler(evtKey)}
            >
                <Dropdown.Toggle
                    id={"trezor-device-options-dropdown"}
                    className="no-arrow mt-3"
                >
                    <div className="text-muted">
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        eventKey={
                            StakingToolsMenuItems[StakingToolsMenuItems.REVOKE]
                        }
                        disabled={true}
                    >
                        Forget device
                    </Dropdown.Item>

                    <Dropdown.Item
                        eventKey={
                            StakingToolsMenuItems[StakingToolsMenuItems.REVOKE]
                        }
                        disabled={true}
                    >
                        Settings...
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    menuHandler(evtKey: string) {
        // switch (evtKey) {
        // 	case StakingToolsMenuItems[StakingToolsMenuItems.REVOKE]:
        // 		askPassphrase()
        // 			.then((passphrase) => {
        // 				if (passphrase == "") {
        // 					throw "empty passphrase"
        // 				}
        // 				this.props.revokeExpiredTickets(passphrase)
        // 			})
        // }
    }
}

export enum StakingToolsMenuItems {
    REVOKE,
}

interface OwnProps {}

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
