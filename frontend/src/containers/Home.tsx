import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// @ts-ignore
import Fade from 'react-reveal/Fade';

import RecentTransactions from '../features/transactions/RecentTransactionsContainer';
import WalletBalanceContainer from "../features/balances/WalletBalanceContainer";
import { IApplicationState } from "../store/store";

class Home extends React.PureComponent {

	render() {
		return (
			<div>
				<Fade fade><WalletBalanceContainer /></Fade>
				<div className="mt-3" />
				<RecentTransactions />
			</div>
		)
	}
}


const mapStateToProps = function (state: IApplicationState) {
	return {}
}

export default withRouter(connect(mapStateToProps)(Home));
