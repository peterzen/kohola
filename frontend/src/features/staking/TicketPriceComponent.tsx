import * as React from 'react';
import { connect } from 'react-redux';

import { Card } from 'react-bootstrap';

import { TicketPrice } from '../../middleware/models';
import { loadTicketPriceAttempt, getTicketPrice } from './stakingSlice';
import { IApplicationState } from "../../store/types";
import { Amount } from '../../components/Shared/Amount';


class TicketPriceComponent extends React.Component<Props> {
	render() {
		return (
			<Card>
				<Card.Body>
					<h1><Amount amount={this.props.ticketPrice.getTicketPrice()} showCurrency /></h1>
					<h6 className="text-muted">Ticket price in next block</h6>
				</Card.Body>
			</Card>
		)
	}
	componentDidMount() {
		this.props.loadTicketPriceAttempt()
	}
}


interface OwnProps {
	ticketPrice: TicketPrice
}

interface DispatchProps {
	loadTicketPriceAttempt: typeof loadTicketPriceAttempt
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		ticketPrice: getTicketPrice(state),
	}
}

const mapDispatchToProps = {
	loadTicketPriceAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketPriceComponent)
