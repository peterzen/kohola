import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// @ts-ignore
import Fade from 'react-reveal/Fade';

import RecentTransactions from '../features/transactions/RecentTransactionsContainer';
import WalletBalanceContainer from "../features/balances/WalletBalanceContainer";
import { IApplicationState } from "../store/types";
import { Transaction } from "../api/models";
import { loadTransactionsAttempt } from "../features/transactions/actions";
import { getWalletTransactions } from "../features/transactions/transactionsSlice";

class Wallet extends React.PureComponent<Props> {

	render() {
		return (
			<div>
				<Fade fade>
					<WalletBalanceContainer />
				</Fade>
				<div className="mt-3" />
				<RecentTransactions
					txList={this.props.txList}
					showAccount={true} />
			</div>
		)
	}
	componentDidMount() {
		this.props.loadTransactionsAttempt()
	}
}

interface OwnProps {
	getTransactionsRequest: boolean
	txList: Transaction[]
}

interface DispatchProps {
	loadTransactionsAttempt: typeof loadTransactionsAttempt
}

type Props = OwnProps & DispatchProps


const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		getTransactionsRequest: state.transactions.getTransactionsRequest,
		txList: getWalletTransactions(state),
	}
}

const mapDispatchToProps = {
	loadTransactionsAttempt
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet));
