
import * as React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import BestBlockComponent from './BestBlockComponent';
import ConnectionStatus from './ConnectionStatus';

export default class NavbarComponent extends React.Component {

	render() {
		return (
			<Navbar bg="light" expand="lg" fixed="top">
				<Navbar.Brand href="/">dcrwalletgui</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/#">Home</Nav.Link>
						<Nav.Link href="/#staking">Staking</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<BestBlockComponent />
				<ConnectionStatus />
			</Navbar>
		)
	}
}

