import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import RecentTransactions from '../components/Transactions/RecentTransactionsContainer';
import { IApplicationState } from "../store/types";
import WalletBalanceContainer from "../components/Accounts/WalletBalanceContainer";
import SendDialogContainer from "../components/Transactions/SendTransaction/SendDialogContainer";

class Home extends React.Component {

	render() {
		const title = "home";

		return (
			<div>
				<WalletBalanceContainer />
				<hr />
				<SendDialogContainer />
				<hr/>
				<RecentTransactions />
			</div>
		)
	}

	// componentDidMount() {
	//     window.addEventListener("beforeunload", this.onBeforeWindowUnload);
	// }

	// componentWillUnmount() {
	//     window.removeEventListener("beforeunload", this.onBeforeWindowUnload);
	// }

	// private onBeforeWindowUnload(e: BeforeUnloadEvent) {
	//     e.stopPropagation();
	//     e.preventDefault();
	//     return false;
	// }
}


const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return state
}

export default withRouter(connect(mapStateToProps)(Home));
