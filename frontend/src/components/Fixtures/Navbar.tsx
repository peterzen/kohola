import * as React from 'react';
import { connect } from "react-redux";

import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTicketAlt, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import ConnectionStatus from '../../features/networkinfo/ConnectionStatus';

// @ts-ignore
import Logo from '../../images/logo.svg'
import { GRPCEndpoint } from '../../proto/dcrwalletgui_pb';
import { PingResponse } from '../../proto/api_pb';
import { IApplicationState } from '../../store/types';
import { getConnectedEndpoint, isWalletConnected } from '../../features/app/appSlice';

class NavbarComponent extends React.Component<Props> {

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
					{this.props.isEndpointConnected && (
						<>
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
						</>
					)}
					<ConnectionStatus />
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

interface Props {
	connectedEndpoint: GRPCEndpoint
	isEndpointConnected: boolean
}

const mapStateToProps = function (state: IApplicationState) {
	return {
		connectedEndpoint: getConnectedEndpoint(state),
		isEndpointConnected: isWalletConnected(state),
	}
}

export default connect(mapStateToProps)(NavbarComponent)
