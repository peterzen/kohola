import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

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

class StakingContainer extends React.PureComponent<{}, {}> {

	render() {
		return (
			<div>
				<Tabs defaultActiveKey="overview" id="purchaseticketsettings-tabs">
					<Tab eventKey="overview" title="Overview">
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
					</Tab>
					<Tab eventKey="ticketbuyer" title="Tickerbuyer">
						<TicketBuyerComponent />
					</Tab>
					<Tab eventKey="voting" title="Voting">
						<AgendasComponent />
					</Tab>
				</Tabs>
			</div>
		)
	}
}

const mapStateToProps = () => {
	return {
	}
}

export default withRouter(connect(mapStateToProps)(StakingContainer));
