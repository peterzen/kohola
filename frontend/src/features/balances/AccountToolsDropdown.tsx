import * as React from 'react'

import { Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { WalletAccount } from "../../api/models"

const AccountToolsDropdown = (props: { account: WalletAccount, menuHandler: any }) => {
	return (
		<Dropdown
			alignRight
			onSelect={(evtKey: string) => props.menuHandler(evtKey, props.account)}>
			<Dropdown.Toggle variant="secondary" id={"dropdown-" + props.account.getAccountNumber()}>
				<FontAwesomeIcon icon={faEllipsisH} />
			</Dropdown.Toggle>

			<Dropdown.Menu
			>
				<Dropdown.Header>{props.account.getAccountName()}</Dropdown.Header>
				<Dropdown.Item eventKey={""} disabled>Account details</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={MenuItems[MenuItems.NEWADDRESS]}>Send</Dropdown.Item>
				<Dropdown.Item eventKey={MenuItems[MenuItems.NEWADDRESS]}>Receive</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={""} disabled>Transfer...</Dropdown.Item>
				<Dropdown.Item eventKey={""} disabled>Sweep...</Dropdown.Item>
				<Dropdown.Item eventKey={""} disabled>Consolidate...</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export enum MenuItems {
	NEWADDRESS,
	DETAILSVIEW
}

export default AccountToolsDropdown
