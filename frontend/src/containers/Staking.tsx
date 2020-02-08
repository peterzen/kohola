import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../store/types';
import TicketPriceComponent from '../components/Staking/TicketPriceComponent';
import StakeInfoComponent from '../components/Staking/StakeInfoComponent';
import AgendasComponent from '../components/Staking/AgendasComponent';
import { IStakingState } from '../store/staking/types';
import TicketsOverviewContainer from '../components/Staking/TicketsOverviewContainer';
import { Row, Col } from 'react-bootstrap';

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
						<TicketPriceComponent />
						<AgendasComponent />
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState): IStakingState => {
	return {
		...state.staking
	};
}

export default withRouter(connect(mapStateToProps)(StakingContainer));
