import * as React from 'react';
import _ from 'lodash';

import { Ticket } from '../../models';
import { TransactionHash } from '../Shared/shared';

import TimeAgo from 'react-timeago';
import { Table } from 'react-bootstrap';
import { TicketStatusIcon } from './TicketStatusIcon';
import { TransactionMempoolStatusIcon } from '../Transactions/TransactionTable';

// @ts-ignore
import Fade from 'react-reveal/Fade';

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
				<tbody>
					{this.props.items.length > 0 && (
						<Fade fade cascade>
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
						</Fade>
					)}
				</tbody>
			</Table>
		)
	}
}

interface TicketsTableProps {
	items: Ticket[],
	onItemClick: (ticket: Ticket) => void
}
