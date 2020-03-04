import * as React from 'react';
import _ from 'lodash';

import { Ticket } from '../../models';
import { TransactionHash } from '../../components/Shared/shared';

import TimeAgo from 'react-timeago';
import { Table } from 'react-bootstrap';
import { TicketStatusIcon } from './TicketStatusIcon';

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { TransactionMempoolStatusIcon } from '../transactions/TransactionTable';

export default class TicketsTable extends React.Component<TicketsTableProps> {

	render() {
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
				{this.props.items.length > 0 && (
					<tbody>
						{this.props.items.map((ticket) => {
							const tx = ticket.getTx()
							return (
								<tr className="clickable" key={tx.getHash()} onClick={() => this.props.onItemClick(ticket)}>
									<td><TransactionMempoolStatusIcon isMined={tx.isMined()} /></td>
									<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
									<td><TicketStatusIcon status={ticket.getStatus()} /></td>
									<td><TransactionHash tx={tx} /></td>
								</tr>
							)
						})}
					</tbody>
				)}
			</Table>
		)
	}
}

interface TicketsTableProps {
	items: Ticket[]
	onItemClick: (ticket: Ticket) => void
}
