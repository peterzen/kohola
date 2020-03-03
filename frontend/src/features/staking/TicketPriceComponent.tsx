import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from "../../store/store";
import { Card } from 'react-bootstrap';
import { Amount } from '../../components/Shared/shared';
import { loadTicketPriceAttempt, getTicketPrice } from './stakingSlice';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { TicketPrice } from '../../models';


class TicketPriceComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<Card>
				<Card.Body>
					<h1><Amount amount={this.props.ticketPrice.getTicketPrice()} showCurrency /></h1>
					Ticket price in next block
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
	loadTicketPriceAttempt: () => void
}

type Props = DispatchProps & OwnProps

interface InternalState {
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	return {
		ticketPrice: getTicketPrice(state),
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	loadTicketPriceAttempt: loadTicketPriceAttempt
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TicketPriceComponent)
