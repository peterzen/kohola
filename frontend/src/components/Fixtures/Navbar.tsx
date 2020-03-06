
import * as React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faCog,
	faTicketAlt,
	faExchangeAlt
} from '@fortawesome/free-solid-svg-icons'

import ConnectionStatus from '../../features/networkinfo/ConnectionStatus';

// @ts-ignore
import Logo from '../../images/logo.svg'

export default class NavbarComponent extends React.Component {

	render() {
		return (
			<Navbar bg="light" expand="lg" fixed="top">
				<Navbar.Brand href="/#">
					<Logo height={36} width={36} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					className="justify-content-end"
					id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/#wallet">
							<FontAwesomeIcon icon={faExchangeAlt} className="text-secondary" /> Transactions
						</Nav.Link>
						<Nav.Link href="/#staking">
							<FontAwesomeIcon icon={faTicketAlt} className="text-secondary" /> Staking
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="/#settings">
							<FontAwesomeIcon icon={faCog} />
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<ConnectionStatus />
			</Navbar>
		)
	}
}

