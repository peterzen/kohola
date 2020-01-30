import * as React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import { Transaction } from "../../models";
import { IApplicationState } from '../../store/types';
import { ITransactionState } from '../../store/transactions/types';
import { getFilteredTransactions } from '../../store/transactions/selectors';
import { loadTransactionsAttempt } from '../../store/transactions/actions';

import { Spinner, Button } from 'react-bootstrap';
import TransactionTable from './TransactionTable';
import TransactionDetailsModal from './TransactionDetailsComponent';
import SendDialogContainer from './SendTransaction/SendDialogContainer';
import SendTransactionModal from './SendTransaction/SendTransactionModal';


class RecentTransactionsComponent extends React.Component<Props, InternalState> {

	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			showSendTxModal: false,
			selectedItem: null
		}
	}

	render() {
		if (this.props.getTransactionsRequest == true) {
			return (
				<Spinner animation="grow" />
			)
		}
		const txList = this.props.txList;
		return (
			<div>
				<h4>Recent transactions ({txList.length})</h4>
				<Button
					variant="primary"
					onClick={_.bind(this.showSendTxModal, this)}>Send funds</Button>
				<TransactionTable items={txList} onItemClick={_.bind(this.itemClickHandler, this)} />
				<TransactionDetailsModal
					tx={this.state.selectedItem}
					modalTitle="Transaction details"
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
				<SendTransactionModal
					show={this.state.showSendTxModal}
					onHide={_.bind(this.hideSendTxModal, this)} />
			</div>
		)
	}
	showSendTxModal() {
		this.setState({ showSendTxModal: true })
	}
	hideSendTxModal() {
		this.setState({ showSendTxModal: false })
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	itemClickHandler(tx: Transaction) {
		this.setState({
			showModal: true,
			selectedItem: tx
		})
	}
	componentDidMount() {
		this.props.dispatch(loadTransactionsAttempt())
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps): Props => {
	return {
		...state.transactions,
		txList: getFilteredTransactions(state),
	}
}

export default connect(mapStateToProps)(RecentTransactionsComponent);

interface OwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = ITransactionState & DispatchProps & OwnProps

interface InternalState {
	showModal: boolean
	showSendTxModal: boolean
	selectedItem: Transaction | null
}
