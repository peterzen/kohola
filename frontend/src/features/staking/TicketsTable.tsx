import * as React from 'react';
import _ from 'lodash';

import { Ticket } from '../../models';
import { TransactionHash } from '../../components/Shared/shared';

import TimeAgo from 'react-timeago';
import { Table } from 'react-bootstrap';
import { TicketStatusIcon } from './TicketStatusIcon';

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { TransitionGroup } from 'react-transition-group';

const transitionGroupProps = {
	appear: true,
	enter: true,
	exit: true,
}

export default class TicketsTable extends React.Component<TicketsTableProps> {

	render() {
		
		return (
			<Table hover>
				<thead>
					<tr>
						<th></th>
						<th>timestamp</th>
						<th>hash</th>
					</tr>
				</thead>
				{this.props.items.length > 0 && (
					<TransitionGroup {...transitionGroupProps} component="tbody">
						{this.props.items.map((ticket) => {
							const tx = ticket.getTx()
							return (
								<Fade slide cascade key={tx.getHash()}>
									<tr className="clickable" onClick={() => this.props.onItemClick(ticket)}>
										<td><TicketStatusIcon status={ticket.getStatus()} /></td>
										<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
										<td><TransactionHash tx={tx} /></td>
									</tr>
								</Fade>
							)
						})}
					</TransitionGroup>
				)}
			</Table>
		)
	}
}

interface TicketsTableProps {
	items: Ticket[]
	onItemClick: (ticket: Ticket) => void
}
