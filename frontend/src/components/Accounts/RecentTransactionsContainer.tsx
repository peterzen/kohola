import * as React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import { Transaction } from "../../models";
import { IApplicationState } from '../../store/types';
import { TransactionsState } from '../../store/transactions/types';
import { getFilteredTransactions } from '../../store/transactions/selectors';
import { loadTransactionsAttempt } from '../../store/transactions/actions';

import { Spinner } from 'react-bootstrap';
import TransactionTable from './TransactionTable';
import TransactionDetailsModal from './TransactionDetailsComponent';


class RecentTransactionsComponent extends React.Component<Props, InternalState> {

	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
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
				<TransactionTable items={txList} onItemClick={_.bind(this.itemClickHandler, this)} />
				<TransactionDetailsModal
					tx={this.state.selectedItem}
					modalTitle="Transaction details"
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
			</div>
		)
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

const mapStateToProps = (state: IApplicationState, ownProps: RecentTransactionsOwnProps): Props => {
	return {
		...state.transactions,
		txList: getFilteredTransactions(state),
	}
}

export default connect(mapStateToProps)(RecentTransactionsComponent);

export interface RecentTransactionsOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = TransactionsState & DispatchProps & RecentTransactionsOwnProps

interface InternalState {
	showModal: boolean
	selectedItem: Transaction | null
}

