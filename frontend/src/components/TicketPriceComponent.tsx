import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { StakingState } from '../store/staking/types';
import { IApplicationState } from '../store/types';
import { loadTicketPriceAttempt } from '../store/staking/actions';



class TicketPriceComponent extends React.Component<StakingState, StakingState> {
	render() {
		return (
			<div>
				<h3>Ticket price in next block: {this.props.ticketPrice.getTicketPrice()}</h3>
			</div>
		)
	}
	componentDidMount() {
		this.props.dispatch(loadTicketPriceAttempt())
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: any) => {
	return {
		ticketPrice: state.staking.ticketPrice
	};
}

export default withRouter(connect(mapStateToProps)(TicketPriceComponent));
