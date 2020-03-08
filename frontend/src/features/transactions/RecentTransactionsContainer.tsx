import _ from 'lodash';
import * as React from 'react';
import { connect } from "react-redux";

import { Spinner, Card } from 'react-bootstrap';

import { Transaction } from "../../models";
import TransactionTable from './TransactionTable';
import TransactionDetailsModal from './TransactionDetailsComponent';
import { getFilteredTransactions } from './transactionsSlice';
import { IApplicationState } from '../../store/types';
import { loadTransactionsAttempt } from './actions';


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
			<Card>
				<Card.Body>
					<Card.Title>Recent transactions <small className="text-muted">({txList.length})</small></Card.Title>
				</Card.Body>
				<TransactionTable items={txList} onItemClick={_.bind(this.itemClickHandler, this)} />
				<TransactionDetailsModal
					tx={this.state.selectedItem}
					modalTitle="Transaction details"
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })} />
			</Card>
		)
	}
	itemClickHandler(tx: Transaction) {
		this.setState({
			showModal: true,
			selectedItem: tx
		})
	}
	componentDidMount() {
		this.props.loadTransactionsAttempt()
	}
}

interface OwnProps {
	getTransactionsRequest: boolean
	txList: Transaction[]
}

interface InternalState {
	showModal: boolean
	selectedItem: Transaction | null
}

interface DispatchProps {
	loadTransactionsAttempt: typeof loadTransactionsAttempt
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		getTransactionsRequest: state.transactions.getTransactionsRequest,
		txList: getFilteredTransactions(state),
	}
}

const mapDispatchToProps = {
	loadTransactionsAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTransactionsComponent);
