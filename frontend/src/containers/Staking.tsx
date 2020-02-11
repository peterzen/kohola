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

class StakingContainer extends React.Component<{}, {}> {

	render() {
		return (
			<div>
				<StakeInfoComponent />
				<Row className="mt-3">
					<Col>
						<TicketsOverviewContainer />
					</Col>
					<Col>
						<StakeStats/>
						<div className="mt-3"/>
						<AgendasComponent />
						<div className="mt-3"/>
						<TicketPriceComponent />
						<div className="mt-3"/>
						<PurchaseTicketForm />
						<TicketBuyerComponent/>
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
