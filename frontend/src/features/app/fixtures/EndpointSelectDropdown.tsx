import * as React from 'react';
import { connect } from "react-redux";


import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEye } from '@fortawesome/free-solid-svg-icons'

import { connectWallet, getEndpointById } from '../appSlice';
import { GRPCEndpoint } from '../../../proto/dcrwalletgui_pb';
import { IApplicationState } from '../../../store/types';
import { SelectedDropdownItemLabel } from '../../../components/Shared/shared';
import ConnectionStatus from '../ConnectionStatus';
import { Networks } from '../../../constants';


class EndpointSelectDropdown extends React.Component<Props>{

	render() {
		const currentEndpoint = this.props.currentEndpoint
		return (
			<>
				{currentEndpoint != null && (
					<NavDropdown
						onSelect={(evtKey: string) => this.connectWallet(evtKey)}
						title={<ConnectionStatus />}
						id="endpoint-nav-dropdown">

						{this.props.walletEndpoints.map(endpoint => {
							const isCurrent = currentEndpoint.getId() == endpoint.getId()
							return (
								<NavDropdown.Item
									key={endpoint.getId()}
									active={false}
									disabled={currentEndpoint.getId() == endpoint.getId()}
									eventKey={endpoint.getId()}>

									<SelectedDropdownItemLabel isSelected={isCurrent}>
										<div>
											{endpoint.getLabel()}
										</div>
										{isCurrent && (
											<div className="text-muted mt-2">
												<small>
													{currentEndpoint.getIsWatchingOnly() && (
														<span title="Watching only">
															<FontAwesomeIcon icon={faEye} />{" "}
														</span>
													)}
													{Networks[endpoint.getNetwork()]}
												</small>
											</div>
										)}
									</SelectedDropdownItemLabel>
								</NavDropdown.Item>
							)
						})}
						<NavDropdown.Divider />
						<NavDropdown.Item href="/#login">
							<span>
								<FontAwesomeIcon icon={faCog} className="text-muted" />&nbsp;
								Manage connections...
							</span>
						</NavDropdown.Item>
					</NavDropdown>
				)}
			</>
		)
	}
	connectWallet(endpointId: string) {
		if (endpointId == "/#login") return
		const ep = this.props.getEndpointById(endpointId)
		this.props.connectWallet(ep)
	}
}


interface OwnProps {
	currentEndpoint: GRPCEndpoint
	walletEndpoints: GRPCEndpoint[]
	getEndpointById: (endpointId: string) => GRPCEndpoint

}

const mapStateToProps = (state: IApplicationState) => {
	return {
		walletEndpoints: state.appconfiguration.appConfig.getWalletEndpointsList(),
		currentEndpoint: state.app.currentWalletEndpoint,
		getEndpointById: (endpointId: string) => {
			return getEndpointById(state, endpointId)
		}
	}
}

interface DispatchProps {
	connectWallet: typeof connectWallet
}

const mapDispatchToProps = {
	connectWallet
}

type Props = OwnProps & DispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(EndpointSelectDropdown)
