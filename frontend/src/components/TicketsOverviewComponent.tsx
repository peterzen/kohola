import * as React from 'react';
import { withRouter } from 'react-router-dom';

import TimeAgo from 'react-timeago';

import { Ticket } from '../models';
import { TicketsState } from '../store/staking/types';
import { IApplicationState } from '../store/types';
import { TransactionHash } from './shared';
import { getTickets } from '../store/staking/selectors';
import { connect } from 'react-redux';


interface TicketListItemProps {
	ticket: Ticket
}

export function TicketListItem(props: TicketListItemProps) {
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

class TicketsOverviewComponent extends React.Component<TicketsState, TicketsState> {
	render() {
		const tickets = this.props.tickets;
		return (
			<div>
				<h3>Tickets Overview</h3>
				<TicketListComponent items={tickets} />
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: any) =>{
	return {
		tickets: getTickets(state)
	};
}

export default withRouter(connect(mapStateToProps, {
})(TicketsOverviewComponent));
