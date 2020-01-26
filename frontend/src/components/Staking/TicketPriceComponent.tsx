import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IStakingState, ITicketPriceState } from '../../store/staking/types';
import { IApplicationState } from '../../store/types';
import { loadTicketPriceAttempt } from '../../store/staking/actions';

export interface TicketPriceOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = ITicketPriceState & DispatchProps & TicketPriceOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class TicketPriceComponent extends React.Component<Props, InternalState> {
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

const mapStateToProps = (state: IApplicationState, ownProps: TicketPriceOwnProps): ITicketPriceState => {
	return {
		ticketPrice: state.staking.ticketPrice,
		getTicketPriceRequest: state.staking.getTicketPriceRequest
	};
}

export default withRouter(connect(mapStateToProps)(TicketPriceComponent));
