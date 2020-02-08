
import * as React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import BestBlockComponent from './BestBlockComponent';
import ConnectionStatus from './ConnectionStatus';

import Logo from '../../images/logo.svg'

export default class NavbarComponent extends React.Component {

	render() {
		return (
			<Navbar bg="light" expand="lg" fixed="top">
				<Navbar.Brand href="/">
					<Logo height={36} width={36}/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/#">Home</Nav.Link>
						<Nav.Link href="/#staking">Staking</Nav.Link>
						<Nav.Link href="/#settings">Settings</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<BestBlockComponent />
				<ConnectionStatus />
			</Navbar>
		)
	}
}

