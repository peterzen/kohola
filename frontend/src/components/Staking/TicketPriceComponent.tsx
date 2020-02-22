import * as React from 'react';
import { connect } from 'react-redux';

import { ITicketPriceState } from '../../store/staking/types';
import { IApplicationState } from '../../store/types';
import { loadTicketPriceAttempt } from '../../store/staking/actions';
import { Card } from 'react-bootstrap';
import { Amount } from '../Shared/shared';
import { getTicketPrice } from '../../store/staking/selectors';

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
			<Card>
				<Card.Body>
					<Card.Title></Card.Title>
					<h1><Amount amount={this.props.ticketPrice.getTicketPrice()} showCurrency /></h1>
					Ticket price in next block
				</Card.Body>
			</Card>
		)
	}
	componentDidMount() {
		this.props.dispatch(loadTicketPriceAttempt())
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: TicketPriceOwnProps): ITicketPriceState => {
	return {
		ticketPrice: getTicketPrice(state),
		getTicketPriceRequest: state.staking.getTicketPriceRequest
	}
}

export default connect(mapStateToProps)(TicketPriceComponent)
