import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { Row, Col, Tabs, Tab } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import StakeStats from '../features/staking/StakeStats';
import AgendasComponent from '../features/staking/Voting/AgendasComponent';
import StakeInfoComponent from '../features/staking/StakeInfoComponent';
import PurchaseTicketForm from '../features/staking/PurchaseTicket/SimplePurchaseTicketForm';
import TicketBuyerComponent from '../features/staking/Ticketbuyer/TicketBuyerComponent';
import TicketsOverviewContainer from '../features/staking/TicketsOverviewContainer';
import { loadTicketsAttempt, revokeExpiredTickets, loadStakingHistory } from '../features/staking/stakingSlice';
import StakingToolsMenu, { StakingToolsMenuItems } from '../features/staking/StakingToolsMenu';
import PassphraseEntryDialog, { askPassphrase } from '../components/Shared/PassphraseEntryDialog';
import StakingHistoryTable from '../features/staking/StakingHistoryTable';

class StakingContainer extends React.Component<Props> {
	render() {
		return (
			<div>
				<div className="float-right">
					<StakingToolsMenu menuHandler={_.bind(this.menuHandler, this)} />
				</div>
				<Tabs
					defaultActiveKey="overview" id="purchaseticketsettings-tabs"
					mountOnEnter={true}
					unmountOnExit={true}
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
								<StakeStats />
								<div className="mt-3" />
								<PurchaseTicketForm />
							</Col>
						</Row>
					</Tab>
					<Tab eventKey="roi" title="Returns">
						<StakingHistoryTable />
					</Tab>
					<Tab eventKey="ticketbuyer" title="Ticketbuyer">
						<TicketBuyerComponent />
					</Tab>
					<Tab eventKey="voting" title="Voting">
						<AgendasComponent />
					</Tab>
				</Tabs>
				<PassphraseEntryDialog show={false} />
			</div>
		)
	}
	componentDidMount() {
		this.props.loadStakingHistory()
		// this.props.loadTicketsAttempt()
	}
	menuHandler(evtKey: keyof StakingToolsMenuItems) {
		switch (evtKey) {
			case StakingToolsMenuItems[StakingToolsMenuItems.REVOKE]:
				askPassphrase()
					.then((passphrase) => {
						if (passphrase == "") {
							throw "empty passphrase"
						}
						this.props.revokeExpiredTickets(passphrase)
					})
		}
	}
}

interface DispatchProps {
	loadStakingHistory: typeof loadStakingHistory
	loadTicketsAttempt: typeof loadTicketsAttempt
	revokeExpiredTickets: typeof revokeExpiredTickets
}

type Props = DispatchProps

const mapStateToProps = () => {
	return {
	}
}

const mapDispatchToProps = {
	loadStakingHistory,
	loadTicketsAttempt,
	revokeExpiredTickets,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StakingContainer));
