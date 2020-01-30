import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecentTransactions from '../components/Transactions/RecentTransactionsContainer';
import { IApplicationState } from "../store/types";
import WalletBalanceContainer from "../components/Accounts/WalletBalanceContainer";

class Home extends React.Component {

	render() {
		return (
			<div>
				<WalletBalanceContainer />
				<hr/>
				<RecentTransactions />
			</div>
		)
	}
}


const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return state
}

export default withRouter(connect(mapStateToProps)(Home));
