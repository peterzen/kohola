import * as React from "react"
import { connect } from "react-redux"

import { Navbar, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBars,
    faTicketAlt,
    faExchangeAlt,
    faCog,
    faShieldAlt,
    IconDefinition,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons"
// @ts-ignore
import Fade from "react-reveal/Fade"

import "./AppSidebar.scss"

// @ts-ignore
import Logo from "../../../images/logo.svg"

import { IApplicationState } from "../../../store/types"
import { isWalletConnected } from "../appSlice"
import BestBlockComponent from "../networkinfo/BestBlockComponent"
import EndpointSelectDropdown from "./EndpointSelectDropdown"

interface NavMenuProps {
    isNavigable: boolean
    isMenuOpened: boolean
}

const menuItems: MenuItemProps[] = [
    {
        title: "Transactions",
        icon: faExchangeAlt,
        href: "/#wallet",
    },
    {
        title: "Staking",
        icon: faTicketAlt,
        href: "/#staking",
    },
    {
        title: "Privacy",
        icon: faShieldAlt,
        href: "/#mixing",
    },
    {
        title: "Market",
        icon: faChartLine,
        href: "/#market",
    },
    {
        title: "Settings",
        icon: faCog,
        href: "/#settings",
        style: {
            position: "absolute",
            bottom: "0.5rem",
            left: "1rem",
        },
    },
]

class NavMenu extends React.Component<NavMenuProps> {
    render() {
        const isNavigable = this.props.isNavigable
        return (
            <>
                <Nav
                    id="sidebar"
                    className={this.props.isMenuOpened ? "collapsed" : ""}>
                    <div className="sidebar-nav-inner">
                        <div className="sidebar-header">
                            <Logo height={36} width={36} />
                        </div>
                        <Fade fade slide left cascade>
                            <div>
                                {menuItems.map((m) => (
                                    <div
                                        key={m.href}
                                        hidden={!isNavigable}
                                        style={m.style}>
                                        {m.title != "" && (
                                            <SidebarNavItem {...m} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Fade>
                    </div>
                </Nav>
            </>
        )
    }
}

type MenuItemProps = {
    title: string
    href?: string
    icon?: IconDefinition
    style?: any
}

const SidebarNavItem = (props: MenuItemProps) => {
    return (
        <Nav.Item>
            <Nav.Link href={props.href} title={props.title}>
                {props.icon && (
                    <FontAwesomeIcon
                        icon={props.icon}
                        className="text-secondary"
                    />
                )}
                <span>{props.title}</span>
            </Nav.Link>
        </Nav.Item>
    )
}

interface StatusBarProps {
    onMenuToggle: () => void
}

class StatusBar extends React.Component<StatusBarProps> {
    render() {
        return (
            <Navbar bg="light" expand="sm">
                <Nav className="">
                    <Nav.Link onClick={() => this.props.onMenuToggle()}>
                        <FontAwesomeIcon icon={faBars} />
                    </Nav.Link>
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
            </Navbar>
        )
    }
}

interface AppSidebarProps {
    isEndpointConnected: boolean
}

interface AppSidebarState {
    isMenuOpened: boolean
}

class AppSidebar extends React.Component<AppSidebarProps, AppSidebarState> {
    constructor(props: AppSidebarProps) {
        super(props)
        this.state = {
            isMenuOpened: true,
        }
    }

    render() {
        return (
            <div className="wrapper">
                {
                    <NavMenu
                        isNavigable={this.props.isEndpointConnected}
                        isMenuOpened={this.state.isMenuOpened}
                    />
                }
                <div id="content">
                    <StatusBar
                        onMenuToggle={() =>
                            this.setState({
                                isMenuOpened: !this.state.isMenuOpened,
                            })
                        }
                    />
                    <div className="content-wrapper">{this.props.children}</div>
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
