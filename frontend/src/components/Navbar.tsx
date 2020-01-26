
import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../store/types';

import { Navbar, Nav } from 'react-bootstrap';

class NavbarComponent extends React.Component {

	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="/">dcrwalletgui</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/staking">Staking</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}



const mapStateToProps = (state: IApplicationState, ownProps: any) => {
	return {
		...state
	};
}

export default withRouter(connect(mapStateToProps)(NavbarComponent));
