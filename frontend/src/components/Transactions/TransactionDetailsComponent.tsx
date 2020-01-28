import * as React from "react";

import { Table } from 'react-bootstrap'

import { Transaction } from "../../models";
import { Timestamp, TransactionHash, Amount } from "../Shared/shared";
import { TransactionMempoolStatusIcon } from "./TransactionTable";
import GenericModalDialog from '../Shared/GenericModalDialog';


export const TransactionDetailsComponent = (props: { tx: Transaction }) => {
	const tx = props.tx
	return (
		<div>
			<Table borderless>
				<tbody>
					<tr>
						<th>Type</th>
						<td>{tx.getTypeAsString()}</td>
					</tr>
					<tr>
						<th>Block</th>
						<td><TransactionMempoolStatusIcon isMined={tx.isMined()} />&nbsp;
							{tx.isMined() ?
								tx.getBlock().getHeight() : 'unmined'}
						</td>
					</tr>
					<tr>
						<th>Hash</th>
						<td><TransactionHash tx={tx} /></td>
					</tr>
					<tr>
						<th>Timestamp</th>
						<td><Timestamp ts={tx.getTimestamp()} /></td>
					</tr>
					<tr>
						<th>Amount</th>
						<td><Amount amount={tx.getAmount()} rounding={8} showCurrency={true} /></td>
					</tr>
					<tr>
						<th>Fee</th>
						<td><Amount amount={tx.getFee()} rounding={8} showCurrency={true} /></td>
					</tr>
					<tr>
						<th>Debit accounts</th>
						<td>
							{tx.getDebitsList().map((a) => {
								return (
									<div key={"account-" + a.getIndex() + a.getPreviousAccount()}>
										{a.getPreviousAccount()}: {a.getPreviousAccount()} / <Amount showCurrency={true} amount={a.getPreviousAmount()} /><br />
									</div>
								)
							})}
						</td>
					</tr>
					<tr>
						<th>Credit addresses</th>
						<td>
							{tx.getCreditsList().map((a) => {
								return (
									<div key={a.getAddress() + a.getIndex()}>{a.getAddress()}</div>
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

export default class TransactionDetailsModal extends GenericModalDialog<OwnProps, {}> {
	DialogContent() {
		if (this.props.tx == null) {
			return null;
		}
		return (
			<TransactionDetailsComponent tx={this.props.tx} />
		)
	}
}

interface OwnProps {
	tx: Transaction | null
}



