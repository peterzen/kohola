import * as React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import { Transaction } from "../../models";
import { IApplicationState } from '../../store/types';
import { ITransactionState } from '../../store/transactions/types';
import { getFilteredTransactions } from '../../store/transactions/selectors';

import { Spinner, Button, Card } from 'react-bootstrap';
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
			<Card>
				<Card.Body>
					<Card.Title>Recent transactions <small className="text-muted">({txList.length})</small></Card.Title>
				</Card.Body>
				<TransactionTable items={txList} onItemClick={_.bind(this.itemClickHandler, this)} />
				<TransactionDetailsModal
					tx={this.state.selectedItem}
					modalTitle="Transaction details"
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
			</Card>
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
	// componentDidMount() {
	// 	this.props.dispatch(loadTransactionsAttempt())
	// }
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
	selectedItem: Transaction | null
}

