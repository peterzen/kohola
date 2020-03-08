import * as React from 'react';
import { connect } from "react-redux";
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import { Row, Col, Tabs, Tab } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import StakeStats from '../features/staking/StakeStats';
import AgendasComponent from '../features/staking/Voting/AgendasComponent';
import StakeInfoComponent from '../features/staking/StakeInfoComponent';
import PurchaseTicketForm from '../features/staking/PurchaseTicket/SimplePurchaseTicketForm';
import TicketBuyerComponent from '../features/staking/Ticketbuyer/TicketBuyerComponent';
import TicketPriceComponent from '../features/staking/TicketPriceComponent';
import TicketsOverviewContainer from '../features/staking/TicketsOverviewContainer';

class StakingContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			activeTab: "overview"
		}
	}

	render() {
		return (
			<div>
				<Tabs defaultActiveKey="overview" id="purchaseticketsettings-tabs"
					onSelect={(tab: string) => this.handleSelect(tab)}>
					<Tab eventKey="overview" title="Overview">
						{this.state.activeTab == "overview" && (
							<div>
								<Fade fade>
									<StakeInfoComponent />
								</Fade>
								<Row className="mt-3">
									<Col>
										<Fade fade><TicketsOverviewContainer /></Fade>
									</Col>
									<Col>
										<TicketPriceComponent />
										<div className="mt-3" />
										<PurchaseTicketForm />
										<div className="mt-3" />
										<StakeStats />
									</Col>
								</Row>
							</div>
						)}
					</Tab>
					<Tab eventKey="ticketbuyer" title="Tickerbuyer">
						{this.state.activeTab == "ticketbuyer" && <TicketBuyerComponent />}
					</Tab>
					<Tab eventKey="voting" title="Voting">
						{this.state.activeTab == "voting" && <AgendasComponent />}
					</Tab>
				</Tabs>
			</div>
		)
	}
	handleSelect(currentTab: string) {
		this.setState({
			activeTab: currentTab
		})
	}
}

type Props = {}

interface InternalState {
	activeTab: string
}

const mapStateToProps = () => {
	return {
	}
}

export default withRouter(connect(mapStateToProps)(StakingContainer));
