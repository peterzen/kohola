import * as React from "react";

import { Table } from 'react-bootstrap'
import TimeAgo from 'react-timeago';

import { Ticket } from "../../models";
import { TransactionHash } from "../Shared/shared";
import GenericModalDialog from '../Shared/GenericModalDialog';
import { TicketStatusIcon } from "./TicketStatusIcon";
import { TransactionMempoolStatusIcon } from "../Accounts/TransactionTable";

export const TicketDetailsComponent = (props: { ticket: Ticket }) => {
	const ticket = props.ticket
	const tx = ticket.getTx();
	return (
		<div>
			<Table borderless>
				<tbody>
					<tr>
						<th>Status</th>
						<td>
							<TicketStatusIcon status={ticket.getStatus()} /> {ticket.getStatusLabel()}
						</td>
					</tr>
					<tr>
						<th>Mined in block</th>
						<td><TransactionMempoolStatusIcon isMined={tx.isMined()} />
							{tx.getBlockHash()}</td>
					</tr>
					<tr>
						<th>Hash</th>
						<td><TransactionHash tx={tx} /></td>
					</tr>
					<tr>
						<th>Timestamp</th>
						<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
					</tr>
					<tr>
						<th>Credit addresses</th>
						<td>
							{tx.getCreditAddresses().map((a) => {
								return (
									<div key={a}>{a}</div>
								)
							})}
						</td>
					</tr>
					<tr>
						<th>Debit accounts</th>
						<td>
							{tx.getDebitAccounts().map((a) => {
								return (
									<div key={"account-" + a.getAccountNumber()}>{a.getAccountName()}</div>
								)
							})}
						</td>
					</tr>

				</tbody>
			</Table>
			<div><pre>{JSON.stringify(tx.toObject(), undefined, "  ")}</pre></div>
		</div>
	)
}

export default class TicketDetailsModal extends GenericModalDialog<OwnProps, {}> {
	DialogContent() {
		return (
			<TicketDetailsComponent ticket={this.props.ticket} />
		)
	}
}

interface OwnProps {
	ticket: Ticket
}



