import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import StakeStats from '../components/Staking/StakeStats';
import TicketPriceComponent from '../components/Staking/TicketPriceComponent';
import StakeInfoComponent from '../components/Staking/StakeInfoComponent';
import AgendasComponent from '../components/Staking/AgendasComponent';
import { IStakingState } from '../store/staking/types';
import TicketsOverviewContainer from '../components/Staking/TicketsOverviewContainer';
import { Row, Col } from 'react-bootstrap';
import PurchaseTicketForm from '../components/Staking/PurchaseTicket/SimplePurchaseTicketForm';
import TicketBuyerComponent from '../components/Staking/TicketBuyerComponent';


import Fade from 'react-reveal/Fade';
import { TransitionGroup } from 'react-transition-group';
import { IApplicationState } from '../store/store';


class StakingContainer extends React.PureComponent<{}, {}> {

	render() {
		return (
			<div>
				<Fade fade>
					<StakeInfoComponent />
				</Fade>
				<Row className="mt-3">
					<Col>
						<Fade fade><TicketsOverviewContainer /></Fade>
					</Col>
					<Col>
						<Fade fade cascade>
							<PurchaseTicketForm />
							<div className="mt-3" />
							<StakeStats />
							<div className="mt-3" />
							<TicketPriceComponent />
							<div className="mt-3" />
							<TicketBuyerComponent />
							<div className="mt-3" />
							<AgendasComponent />
						</Fade >
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState): IStakingState => {
	return {
		...state.staking,
	};
}

export default withRouter(connect(mapStateToProps)(StakingContainer));
