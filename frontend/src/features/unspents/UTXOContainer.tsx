import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { IApplicationState } from '../../store/store';
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
		// @ts-ignore
		this.props.dispatch(fetchUnspentsAttempt(this.props.account.getAccountNumber()))
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
					onHide={_.bind(this.hideModal, this)} />
			</div>
		)
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	menuHandler(evtKey: string, utxo: UnspentOutputResponse) {
		console.log("ttt", utxo)
		this.setState({
			showModal: true,
			selectedItem: utxo
		})
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	return {
		...state.unspentoutputs,
	};
}

export default connect(mapStateToProps)(UTXOContainer)


interface DispatchProps {
	// onSomeEvent: () => void
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

