import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import TimeAgo from 'react-timeago';

import UTXODetailsModal from './UTXODetailsComponent';
import ListUTXOs from './ListUTXOs';
import { WalletAccount } from '../../middleware/models';
import {
	fetchUnspentsAttempt,
	IUnspentOutputsByAccount,
	IUnspentState,
	getRegularUTXOs
} from './unspentsSlice';

import { IApplicationState } from '../../store/types';
import { Table, Form, Alert } from 'react-bootstrap';
import { TxHash } from '../../components/Shared/shared';
import { Amount } from '../../components/Shared/Amount';
import moment from 'moment';
import { UnspentOutput } from '../../proto/walletgui_pb';

class UTXOSelectorWidget extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			selectedItems: {},
			totalSelectedAmount: 0,
		}
	}

	render() {
		const utxos = this.props.utxos
		const haveUtxos = utxos.length > 0
		return (
			<div>
				{(utxos != undefined && haveUtxos) && (
					<Table hover>
						<thead>
							<tr>
								<th>Hash</th>
								<th>Timestamp</th>
								<th>Amount</th>
								<th>
									<Form.Check
										disabled
										type="checkbox"
										tabIndex={3}
										readOnly
										checked={false}
										label="" />
								</th>
							</tr>
						</thead>
						<tbody>
							{utxos.map((utxo) =>
								<tr key={utxo.getTransactionHash_asB64() + utxo.getOutputIndex()}
									className="clickable"
									onClick={() => this.toggleSelection(utxo)}
								>
									<td><TxHash hash={Buffer.from(utxo.getTransactionHash_asU8())} /></td>
									{/* <td>{utxo.getTree() }</td> */}
									<td><TimeAgo date={moment.unix(utxo.getReceiveTime()).toDate()} /></td>
									<td><Amount amount={utxo.getAmount()} /></td>
									<td>
										<Form.Check
											type="checkbox"
											tabIndex={3}
											readOnly
											checked={this.isItemSelected(utxo)}
											label="" />
									</td>
								</tr>
							)}
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td></td>
								<td><strong><Amount amount={this.state.totalSelectedAmount} showCurrency /></strong></td>
								<td></td>
							</tr>
						</tfoot>
					</Table>
				)}
				{utxos != undefined && !haveUtxos && (
					<Alert variant="primary">No regular UTXOs found for this account.</Alert>
				)}
			</div>
		)
	}
	toggleSelection(utxo: UnspentOutput) {
		const selection = this.state.selectedItems
		selection[getUtxoId(utxo)] = this.isItemSelected(utxo) ? undefined : utxo
		const selectionList = _.compact(_.values(selection))
		const totalSelectedAmount = calculateTotalUTXOAmount(selectionList)
		this.setState({
			selectedItems: selection,
			totalSelectedAmount: totalSelectedAmount,
		})
		this.props.onSelectionChange(selectionList)
	}

	isItemSelected(utxo: UnspentOutput): boolean {
		return this.state.selectedItems[getUtxoId(utxo)] != undefined
	}

	componentDidMount() {
		this.props.fetchUnspentsAttempt(this.props.account.getAccountNumber())
	}
}

function getUtxoId(utxo: UnspentOutput) {
	return utxo.getTransactionHash_asB64() + utxo.getOutputIndex()
}

interface OwnProps {
	account: WalletAccount
	onSelectionChange: (utxos: UnspentOutput[]) => void
}

interface StateProps {
	utxos: UnspentOutput[]
}

type Props = OwnProps & StateProps & DispatchProps

type IndexedUTXOs = {
	[utxoId: string]: UnspentOutput | undefined
}

interface InternalState {
	showModal: boolean
	selectedItems: IndexedUTXOs
	totalSelectedAmount: number
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps): StateProps => {
	return {
		utxos: getRegularUTXOs(state, ownProps.account?.getAccountNumber())
	}
}

interface DispatchProps {
	fetchUnspentsAttempt: typeof fetchUnspentsAttempt
}

const mapDispatchToProps = {
	fetchUnspentsAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(UTXOSelectorWidget)

export function calculateTotalUTXOAmount(utxoList: UnspentOutput[]) {
	return _.reduce(utxoList, (sum, u) => {
		return sum += u?.getAmount() || 0
	}, 0)
}
