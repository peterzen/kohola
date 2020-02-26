import * as React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import { UnspentOutputResponse } from '../../proto/api_pb';
import { Table, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators, Dispatch } from 'redux';
import { IUnspentOutputsByAccount, fetchUnspentsAttempt } from './unspentsSlice';
import { WalletAccount } from '../../models';
import { TxHash, Amount } from '../../components/Shared/shared';
import moment from 'moment';
import { IApplicationState } from '../../store/store';
import TimeAgo from 'react-timeago';

interface ICoinToolsDropdown {
	account: WalletAccount
	menuHandler: (eventKey: string, account: WalletAccount) => void
}

const CoinToolsDropdown = (props: ICoinToolsDropdown) => {
	return (
		<Dropdown
			alignRight
			onSelect={(evtKey: string) => props.menuHandler(evtKey, props.account)}
		>
			<Dropdown.Toggle variant="secondary" id="dropdown-utxo">
				<FontAwesomeIcon icon={faEllipsisH} />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.SPEND_COIN]}>Spend coin</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.UTXO_DETAILS]} disabled>Details</Dropdown.Item>
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.LOCK_UTXO]} disabled>Lock</Dropdown.Item>
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.COPY_ADDRESS]} disabled>Copy address</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export enum UTXOMenuItems {
	SPEND_COIN,
	UTXO_DETAILS,
	LOCK_UTXO,
	COPY_ADDRESS
}


class ListUTXOs extends React.Component<OwnProps & Props, { unspents: UnspentOutputResponse[] }> {

	render() {
		const utxos = this.props.unspentOutputsByAccount[this.props.account.getAccountNumber()]
		if (utxos == undefined) {
			return null
		}
		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>Hash</th>
							<th>Amount</th>
							<th>OutIndex</th>
							<th>Tree</th>
							<th>Timestamp</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{utxos.map((utxo) =>
							<tr key={utxo.getTransactionHash_asB64() + utxo.getOutputIndex()}>
								<td><TxHash hash={Buffer.from(utxo.getTransactionHash_asU8())} /></td>
								<td><Amount amount={utxo.getAmount()} /></td>
								<td>{utxo.getOutputIndex()}</td>
								<td>{utxo.getTree() == 1 ? 'stake' : 'regular'}</td>
								<td><TimeAgo date={moment.unix(utxo.getReceiveTime()).toDate()} /></td>
								<td>
									<CoinToolsDropdown
										account={this.props.account}
										menuHandler={_.bind(this.menuHandler, this)}
									/>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
		)
	}

	menuHandler() {
		
	}

	componentWillMount() {
		// this.props.dispatch(fetchUnspentsAttempt(this.props.account.getAccountNumber()))
	}
}

interface Props {
	account: WalletAccount
}

interface OwnProps {
	unspentOutputsByAccount: IUnspentOutputsByAccount
}


const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		...state.unspentoutputs,
	};
}



const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(ListUTXOs);
