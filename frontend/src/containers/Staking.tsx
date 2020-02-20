import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../store/types';
import StakeStats from '../components/Staking/StakeStats';
import TicketPriceComponent from '../components/Staking/TicketPriceComponent';
import StakeInfoComponent from '../components/Staking/StakeInfoComponent';
import AgendasComponent from '../components/Staking/AgendasComponent';
import { IStakingState } from '../store/staking/types';
import TicketsOverviewContainer from '../components/Staking/TicketsOverviewContainer';
import { Row, Col } from 'react-bootstrap';
import PurchaseTicketForm from '../components/Staking/PurchaseTicketForm';
import TicketBuyerComponent from '../components/Staking/TicketBuyerComponent';


import Fade from 'react-reveal/Fade';
import { TransitionGroup } from 'react-transition-group';


class StakingContainer extends React.PureComponent<{}, {}> {

	render() {
		return (
			<div>
				<Fade>
					<StakeInfoComponent />
				</Fade>
				<Row className="mt-3">
					<Col>
						<TicketsOverviewContainer />
					</Col>
					<Col>
					<Fade><PurchaseTicketForm /></Fade>
						<div className="mt-3" />
						<Fade><StakeStats /></Fade>
						<div className="mt-3" />
						<Fade><TicketPriceComponent /></Fade>
						<div className="mt-3" />
						<Fade><TicketBuyerComponent /></Fade>
						<div className="mt-3" />
						<Fade><AgendasComponent /></Fade>
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
