import * as React from 'react'

import { Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import "./Staking.scss"

interface IStakingToolsMenuProps {
	menuHandler: (evtKey: string) => void
}

const StakingToolsMenu = (props: IStakingToolsMenuProps) => {
	return (
		<Dropdown
			alignRight
			onSelect={(evtKey: string) => props.menuHandler(evtKey)}>
			<Dropdown.Toggle id={"staking-tools-dropdown"} className="no-arrow mt-3">
				<div className="text-muted">
					<FontAwesomeIcon icon={faCog} />
				</div>
			</Dropdown.Toggle>
			<Dropdown.Menu
			>
				<Dropdown.Header>Tools</Dropdown.Header>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={StakingToolsMenuItems[StakingToolsMenuItems.REVOKE]}>Revoke expired tickets...</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export enum StakingToolsMenuItems {
	REVOKE,
}

export default StakingToolsMenu
