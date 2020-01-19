import * as React from 'react';

import DatastoreFactory from '../store';
import { Ticket } from '../models';
import { Timestamp, TransactionHash } from './shared';

const store = DatastoreFactory.getInstance();

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

interface TicketsOverviewState {
    tickets: Ticket[]
}

export default class TicketsOverview extends React.Component<{}, TicketsOverviewState> {

    constructor(props: object) {
        super(props);
        this.state = {
            tickets: []
        }
    }

    componentDidMount() {
        store.getTickets(0, 200, 1250, undefined)
            .then((tickets) => {
                this.setState({
                    tickets: tickets
                })
            })
            .catch((err) => {
                console.error("RecentTransactions", err);
            });
    }

    render() {
        const tickets = this.state.tickets;
        return (
            <div>
                <h3>Tickets Overview</h3>
                <TicketListComponent items={tickets} />
            </div>
        )
    }
}