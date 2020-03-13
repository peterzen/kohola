import * as React from "react";

import { Table, Accordion, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { Transaction } from "../../models";
import GenericModalDialog from '../../components/Shared/GenericModalDialog';
import { Timestamp, TransactionHash } from "../../components/Shared/shared";
import { TransactionMempoolStatusIcon } from "./TransactionTable";
import { Amount } from "../../components/Shared/Amount";


export const TransactionDetailsComponent = (props: OwnProps) => {
	const tx = props.tx
	if (tx == null) {
		return null
	}
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
			<Accordion >
				<Accordion.Toggle as={Button} variant="secondary" size="sm" eventKey="0">
					Raw JSON <FontAwesomeIcon icon={faCaretDown} />
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="0">
					<pre>{JSON.stringify(tx.toObject(), undefined, "  ")}</pre>
				</Accordion.Collapse>
			</Accordion>
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



