import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import StakeStats from '../features/staking/StakeStats';
import TicketPriceComponent from '../features/staking/TicketPriceComponent';
import StakeInfoComponent from '../features/staking/StakeInfoComponent';
import AgendasComponent from '../features/staking/AgendasComponent';
import TicketsOverviewContainer from '../features/staking/TicketsOverviewContainer';
import { Row, Col } from 'react-bootstrap';
import PurchaseTicketForm from '../features/staking/PurchaseTicket/SimplePurchaseTicketForm';
import TicketBuyerComponent from '../features/staking/TicketBuyerComponent';
import { IApplicationState } from '../store/store';

// @ts-ignore
import Fade from 'react-reveal/Fade';


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
