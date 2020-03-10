import _ from 'lodash';
import * as React from 'react';
import { connect } from "react-redux";

import { Spinner, Card } from 'react-bootstrap';

import { Transaction } from "../../models";
import TransactionTable from './TransactionTable';
import TransactionDetailsModal from './TransactionDetailsComponent';
import { getWalletTransactions } from './transactionsSlice';
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
		const txList = this.props.txList;
		return (
			<Card>
				<Card.Body>
					<Card.Title>Recent transactions <small className="text-muted">({txList.length})</small></Card.Title>
				</Card.Body>
				<TransactionTable
					items={txList}
					onItemClick={_.bind(this.itemClickHandler, this)}
					showAccount={this.props.showAccount}/>
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
	
}

interface OwnProps {
	showAccount?: boolean
	txList: Transaction[]
}

interface InternalState {
	showModal: boolean
	selectedItem: Transaction | null
}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
	return {
	}
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentTransactionsComponent);
