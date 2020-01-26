import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Ticket } from '../models';
import { ITicketsState } from '../store/staking/types';
import { IApplicationState } from '../store/types';
import { TransactionHash } from './shared';
import { getTickets } from '../store/staking/selectors';
import { loadTicketsAttempt } from '../store/staking/actions';

import TimeAgo from 'react-timeago';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faQuestion,
	faMinus,
	faClock,
	faBroadcastTower,
	faCheckDouble,
	faBullseye,
	faHistory,
	faUndo
} from '@fortawesome/free-solid-svg-icons'

const ticketStatusIcons = {
	0: faQuestion, // 'UNKNOWN',
	1: faMinus, //'UNMINED',
	2: faClock, //'IMMATURE',
	3: faBroadcastTower, //'LIVE',
	4: faCheckDouble, // 'VOTED',
	5: faBullseye, // 'MISSED',
	6: faHistory, // 'EXPIRED',
	7: faUndo, // 'REVOKED'
}

function TicketListItem(props: TicketListItemProps) {
	const ticket = props.ticket;
	const tx = ticket.getTx();
	const statusIcon = ticketStatusIcons[ticket.getStatus()]
	return (
		<tr>
			<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
			<td><span title={ticket.getStatusLabel()}><FontAwesomeIcon icon={statusIcon} /></span></td>
			<td><TransactionHash tx={tx} /></td>
		</tr>
	);
}

export function TicketListComponent(props: TicketListComponentProps) {
	const list = props.items.map((ticket) => {
		return (
			<TicketListItem ticket={ticket} key={ticket.getTx().getHash()} />
		)
	});
	return (
		<Table hover>
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
		</Table>
	)
}

class TicketsOverviewComponent extends React.Component<Props, TicketsOverviewOwnProps> {
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

const mapStateToProps = (state: IApplicationState, ownProps: TicketsOverviewOwnProps) => {
	return {
		tickets: getTickets(state),
		...state.staking
	};
}

export default withRouter(connect(mapStateToProps)(TicketsOverviewComponent));

export interface TicketsOverviewOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = ITicketsState & DispatchProps & TicketsOverviewOwnProps

interface InternalState {
	// internalComponentStateField: string
}

interface TicketListItemProps {
	ticket: Ticket
}
interface TicketListComponentProps {
	items: Ticket[]
}
