import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { TicketsState } from '../store/staking/types';
import { IApplicationState } from '../store/types';



class TicketPriceComponent extends React.Component<TicketsState, TicketsState> {
	render() {
		return (
			<div>
				<h3>Ticket price in next block: {this.props.ticketPrice.getTicketPrice()}</h3>
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: any) => {
	return {
		ticketPrice: state.tickets.ticketPrice
	};
}

export default withRouter(connect(mapStateToProps, {
})(TicketPriceComponent));
