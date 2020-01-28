import * as React from 'react';
import _ from 'lodash';

import { Ticket } from '../../models';
import { TransactionHash } from '../Shared/shared';

import TimeAgo from 'react-timeago';
import { Table } from 'react-bootstrap';
import { TicketStatusIcon } from './TicketStatusIcon';
import { TransactionMempoolStatusIcon } from '../Transactions/TransactionTable';


export default class TicketsTable extends React.Component<TicketsTableProps> {

	renderItem(ticket: Ticket) {
		const tx = ticket.getTx();
		return (
			<tr className="clickable" key={tx.getHash()} onClick={this.clickHandler(ticket)}>
				<td><TransactionMempoolStatusIcon isMined={tx.isMined()} /></td>
				<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
				<td><TicketStatusIcon status={ticket.getStatus()} /></td>
				<td><TransactionHash tx={tx} /></td>
			</tr>
		)
	}
	render() {
		const list = this.props.items.map((ticket) => this.renderItem(ticket))
		return (
			<Table hover>
				<thead>
					<tr>
						<th></th>
						<th>timestamp</th>
						<th>status</th>
						<th>hash</th>
					</tr>
				</thead>
				<tbody>
					{list}
				</tbody>
			</Table>
		)
	}

	clickHandler(ticket: Ticket) {
		return _.bind((evt: React.MouseEvent) => {
			this.props.onItemClick(ticket)
		}, this)
	}
}

interface TicketsTableProps {
	items: Ticket[],
	onItemClick: (ticket: Ticket) => void
}
