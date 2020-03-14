import * as React from 'react';
import { connect } from 'react-redux';

import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTicketAlt, faBlender, faExchangeAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import "./AppSidebar.scss"

// @ts-ignore
import Logo from '../../../images/logo.svg'

import { IApplicationState } from '../../../store/types';
import { isWalletConnected } from '../appSlice';
import BestBlockComponent from '../networkinfo/BestBlockComponent';
import EndpointSelectDropdown from './EndpointSelectDropdown';

interface NavMenuProps {
	isMenuOpened: boolean
}

class NavMenu extends React.Component<NavMenuProps> {
	render() {
		return (
			<>
				<Nav id="sidebar" className={this.props.isMenuOpened ? "collapsed" : ""}>
					<div className="sidebar-nav-inner">
						<div className="sidebar-header">
							<Logo height={36} width={36} />
						</div>

						<Nav.Item>
							<Nav.Link href="/#wallet" title="Transactions">
								<FontAwesomeIcon icon={faExchangeAlt} className="text-secondary" />
								<span>Transactions</span>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="/#staking" title="Staking">
								<FontAwesomeIcon icon={faTicketAlt} className="text-secondary" />
								<span>Staking</span>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="/#mixing" title="Mixing">
								<FontAwesomeIcon icon={faBlender} className="text-secondary" />
								<span>Mixing</span>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="mt-5">
							<Nav.Link href="/#settings" title="Settings">
								<FontAwesomeIcon icon={faCog} className="text-secondary" />
								<span>Settings</span>
							</Nav.Link>
						</Nav.Item>
					</div>
				</Nav>
			</>
		)
	}
}



interface StatusBarProps {
	onMenuToggle: () => void
}

class StatusBar extends React.Component<StatusBarProps>{
	render() {
		return (
			<Navbar bg="light" expand="lg" >
				<Nav className="">
					<Nav.Link
						onClick={() => this.props.onMenuToggle()}
					><FontAwesomeIcon icon={faBars} /></Nav.Link>
					{/* <button
						className="btn btn-dark d-inline-block d-lg-none ml-auto"
						type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<FontAwesomeIcon icon={faBars} />
					</button> */}
				</Nav>
				<Nav className="ml-auto">
					<EndpointSelectDropdown />
					<Nav.Link>
						<BestBlockComponent />
					</Nav.Link>
				</Nav>
			</Navbar >
		)
	}
}

interface AppSidebarProps {
	isEndpointConnected: boolean
}

interface AppSidebarState {
	isMenuOpened: boolean
}

class AppSidebar extends React.Component<AppSidebarProps, AppSidebarState>{
	constructor(props: AppSidebarProps) {
		super(props)
		this.state = {
			isMenuOpened: false
		}
	}

	render() {
		return (
			<div className="wrapper">
				{this.props.isEndpointConnected && <NavMenu isMenuOpened={this.state.isMenuOpened} />}
				<div id="content">
					<StatusBar onMenuToggle={() => this.setState({ isMenuOpened: !this.state.isMenuOpened })} />
					<div>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = function (state: IApplicationState) {
	return {
		isEndpointConnected: isWalletConnected(state),
	}
}

export default connect(mapStateToProps)(AppSidebar)
