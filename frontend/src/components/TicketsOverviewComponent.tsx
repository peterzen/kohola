import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { Ticket } from '../models';
import { IStakingState } from '../store/staking/types';
import { IApplicationState } from '../store/types';
import { TransactionHash } from './shared';
import { getTickets } from '../store/staking/selectors';
import { loadTicketsAttempt } from '../store/staking/actions';

import TimeAgo from 'react-timeago';

interface TicketListItemProps {
	ticket: Ticket
}

function TicketListItem(props: TicketListItemProps) {
	const ticket = props.ticket;
	const tx = ticket.getTx();
	return (
		<tr>
			<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
			<td>{ticket.getStatusLabel()}</td>
			<td><TransactionHash tx={tx} /></td>
		</tr>
	);
}


interface TicketListComponentProps {
	items: Ticket[]
}

export function TicketListComponent(props: TicketListComponentProps) {
	const list = props.items.map((ticket) => {
		return (
			<TicketListItem ticket={ticket} key={ticket.getTx().getHash()} />
		)
	});
	return (
		<table>
			<thead>
				<tr>
					<th>timestamp</th>
					<th>status</th>
					<th>hash</th>
				</tr>
			</thead>
			<tbody>
				{list}
			</tbody>
		</table>
	)
}

class TicketsOverviewComponent extends React.Component<IStakingState, IStakingState> {
	render() {
		const tickets = this.props.tickets
		return (
			<div>
				<h3>Tickets Overview</h3>
				<TicketListComponent items={tickets} />
			</div>
		)
	}
	componentDidMount() {
		this.props.dispatch(loadTicketsAttempt());

	}
}

const mapStateToProps = (state: IApplicationState, ownProps: any) => {
	return {
		tickets: getTickets(state)
	};
}

export default withRouter(connect(mapStateToProps)(TicketsOverviewComponent));
