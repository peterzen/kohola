import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import BestBlock from "../components/BestBlockComponent";
import ConnectionStatus from "../components/ConnectionStatus";
import NetworkComponent from "../components/NetworkComponent";
import RecentTransactions from '../components/RecentTransactionsComponent';
import WalletBalanceComponent from "../components/WalletBalanceComponent";
import { IApplicationState } from "../store/types";

class Home extends React.Component {

	render() {
		const title = "home";

		return (
			<div>
				<h1>{title}  <ConnectionStatus /></h1>
				<NetworkComponent />
				<BestBlock />
				<hr />
				<hr />
				<WalletBalanceComponent />
				<hr />
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
