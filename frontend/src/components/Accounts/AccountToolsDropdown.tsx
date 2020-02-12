
import * as React from 'react'

import { WalletAccount } from "../../models"
import { Dropdown } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faEllipsisH,
} from '@fortawesome/free-solid-svg-icons'

const AccountToolsDropdown = (props: { account: WalletAccount, menuHandler: any }) => {
	return (
		<Dropdown
			alignRight
			onSelect={(evtKey: string) => props.menuHandler(evtKey, props.account)}>
			<Dropdown.Toggle variant="light" id={"dropdown-" + props.account.getAccountNumber()}>
				<FontAwesomeIcon icon={faEllipsisH} />
			</Dropdown.Toggle>

			<Dropdown.Menu
			>
				<Dropdown.Header>{props.account.getAccountName()}</Dropdown.Header>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={MenuItems[MenuItems.NEWADDRESS]}>Send</Dropdown.Item>
				<Dropdown.Item eventKey={MenuItems[MenuItems.NEWADDRESS]}>Receive</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={""}>Account details</Dropdown.Item>
				<Dropdown.Item eventKey={""}>Transfer...</Dropdown.Item>
				<Dropdown.Item eventKey={""}>Sweep...</Dropdown.Item>
				<Dropdown.Item eventKey={""}>Consolidate...</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export enum MenuItems {
	NEWADDRESS 
}

export default AccountToolsDropdown
