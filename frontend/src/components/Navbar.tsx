
import * as React from 'react';

import { IApplicationState } from '../store/types';

import { Navbar, Nav } from 'react-bootstrap';

export default class NavbarComponent extends React.Component {

	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="/">dcrwalletgui</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/#">Home</Nav.Link>
						<Nav.Link href="/#staking">Staking</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

