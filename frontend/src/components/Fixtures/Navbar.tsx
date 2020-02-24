
import * as React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import BestBlockComponent from '../../features/networkinfo/BestBlockComponent';
import ConnectionStatus from '../../features/networkinfo/ConnectionStatus';

import Logo from '../../images/logo.svg'
import SendTransaction from '../Transactions/SendTransaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faCog, faTicketAlt
} from '@fortawesome/free-solid-svg-icons'
export default class NavbarComponent extends React.Component {

	render() {
		return (
			<Navbar bg="light" expand="lg" fixed="top">
				<Navbar.Brand href="/">
					<Logo height={36} width={36} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					className="justify-content-end"
					id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/#">Home</Nav.Link>
						<Nav.Link href="/#staking"><FontAwesomeIcon icon={faTicketAlt} /> Staking</Nav.Link>
					</Nav>
					<Nav className="mr-auto">
						<Nav.Link eventKey={2}>
						</Nav.Link>
						<SendTransaction />
					</Nav>
					<Nav>
						<Nav.Link href="/#settings">
							<FontAwesomeIcon icon={faCog} />
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<BestBlockComponent />
				<ConnectionStatus />
			</Navbar>
		)
	}
}

