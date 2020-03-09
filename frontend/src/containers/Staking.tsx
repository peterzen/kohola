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
import { loadTicketsAttempt } from '../features/staking/stakingSlice';

class StakingContainer extends React.Component<Props> {
	render() {
		return (
			<Tabs
				defaultActiveKey="overview" id="purchaseticketsettings-tabs"
				mountOnEnter={true}
				unmountOnExit={false}
			>
				<Tab eventKey="overview" title="Overview">
					<Fade fade>
						<StakeInfoComponent />
					</Fade>
					<Row className="mt-3">
						<Col>
							<Fade fade>
								<TicketsOverviewContainer />
							</Fade>
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
		)
	}
	componentDidMount() {
		// this.props.loadTicketsAttempt()
	}
}

interface DispatchProps {
	loadTicketsAttempt: typeof loadTicketsAttempt
}

type Props = DispatchProps

const mapStateToProps = () => {
	return {
	}
}

const mapDispatchToProps = {
	loadTicketsAttempt,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StakingContainer));
