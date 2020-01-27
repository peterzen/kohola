
import * as React from 'react'

import { WalletAccount } from "../../models"
import { Dropdown } from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCogs,
} from '@fortawesome/free-solid-svg-icons'

const AccountToolsDropdown = (props: { account: WalletAccount, menuHandler: any }) => {
	return (
		<Dropdown
			alignRight
			onSelect={(evtKey: string) => props.menuHandler(evtKey, props.account)}>
			<Dropdown.Toggle variant="light" id={"dropdown-" + props.account.getAccountNumber()}>
				<FontAwesomeIcon icon={faCogs} />
			</Dropdown.Toggle>

			<Dropdown.Menu
			>
				<Dropdown.Header>{props.account.getAccountName()}</Dropdown.Header>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={MenuItems[MenuItems.NEWADDRESS]}>Get new address</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export enum MenuItems {
	NEWADDRESS 
}

export default AccountToolsDropdown
