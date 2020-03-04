import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { bindActionCreators } from '@reduxjs/toolkit';

import { IApplicationState, AppDispatch } from '../../store/store';
import { UnspentOutputResponse } from '../../proto/api_pb';
import UTXODetailsModal from './UTXODetailsComponent';
import ListUTXOs from './ListUTXOs';
import { WalletAccount } from '../../models';
import { fetchUnspentsAttempt, IUnspentOutputsByAccount } from '../unspents/unspentsSlice';

class UTXOContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			selectedItem: null
		}
	}

	componentDidMount() {
		this.props.fetchUnspents(this.props.account.getAccountNumber())
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
}


interface OwnProps {
	account: WalletAccount
	unspentOutputsByAccount: IUnspentOutputsByAccount
}

type Props = OwnProps & DispatchProps

interface InternalState {
	showModal: boolean
	selectedItem: UnspentOutputResponse | null
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	return {
		...state.unspentoutputs,
	};
}

interface DispatchProps {
	fetchUnspents: typeof fetchUnspentsAttempt
}

const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators({
	fetchUnspents: fetchUnspentsAttempt
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(UTXOContainer)
