import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { UnspentOutputResponse } from '../../proto/api_pb';
import UTXODetailsModal from './UTXODetailsComponent';
import ListUTXOs from './ListUTXOs';
import { WalletAccount } from '../../models';
import {
	fetchUnspentsAttempt,
	IUnspentOutputsByAccount,
	IUnspentState
} from '../unspents/unspentsSlice';
import { IApplicationState } from '../../store/types';

class UTXOContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			selectedItem: null
		}
	}

	render() {
		const utxos = this.props.unspentOutputsByAccount[this.props.account.getAccountNumber()]
		if (utxos == undefined) {
			return null
		}
		return (
			<div>
				<ListUTXOs
					utxos={utxos}
					menuHandler={_.bind(this.menuHandler, this)} />

				<UTXODetailsModal
					utxo={this.state.selectedItem}
					modalTitle="Coin details"
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })} />
			</div>
		)
	}

	menuHandler(evtKey: string, utxo: UnspentOutputResponse) {
		this.setState({
			showModal: true,
			selectedItem: utxo
		})
	}

	componentDidMount() {
		this.props.fetchUnspentsAttempt(this.props.account.getAccountNumber())
	}
}


interface OwnProps {
	account: WalletAccount
	unspentOutputsByAccount: IUnspentOutputsByAccount
}

type Props = OwnProps & DispatchProps & IUnspentState

interface InternalState {
	showModal: boolean
	selectedItem: UnspentOutputResponse | null
}

const mapStateToProps = (state: IApplicationState): IUnspentState => {
	return {
		...state.unspentoutputs,
	};
}

interface DispatchProps {
	fetchUnspentsAttempt: typeof fetchUnspentsAttempt
}

const mapDispatchToProps = {
	fetchUnspentsAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(UTXOContainer)
