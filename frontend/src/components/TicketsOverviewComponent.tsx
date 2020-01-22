import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { Ticket } from '../models';
import { TicketsState } from '../store/tickets/types';
import { IApplicationState } from '../store/types';
import { Timestamp, TransactionHash } from './shared';


interface TicketListItemProps {
    ticket: Ticket
}

export function TicketListItem(props: TicketListItemProps) {
    const ticket = props.ticket;
    const tx = ticket.getTx();
    return (
        <tr>
            <td><Timestamp ts={tx.getTimestamp()} /></td>
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


const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		tickets: state.tickets.tickets
	};
}

export default withRouter(connect(mapStateToProps, {
})(TicketsOverviewComponent));
