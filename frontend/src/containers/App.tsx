import * as React from "react";

import BestBlock from "../components/BestBlockComponent";
import ConnectionStatus from "../components/ConnectionStatus";
import RecentTransactions from '../components/RecentTransactionsComponent';
import WalletBalanceComponent from "../components/WalletBalanceComponent";
import NetworkComponent from "../components/NetworkComponent";

export default class App extends React.Component {

	render() {
		const title = "home";

		return (
			<div>
				<h1>{title}  <ConnectionStatus /></h1>
				<NetworkComponent/>
				<BestBlock />
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
