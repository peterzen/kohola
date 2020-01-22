import * as React from "react";

import BestBlock from "../components/BestBlockComponent";
import TicketsOverview from "../components/TicketsOverviewComponent";
import ConnectionStatus from "../components/ConnectionStatus";
import RecentTransactions from '../components/RecentTransactionsComponent';
import WalletBalanceComponent from "../components/WalletBalanceComponent";

export default class App extends React.Component {

	render() {
		const title = "dcrwalletgui";

		return (
			<div>
				<h1>{title}  <ConnectionStatus /></h1>
				<BestBlock />
				<hr />
				<WalletBalanceComponent />
				<hr />
				<RecentTransactions />
				<hr />
				<TicketsOverview />
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
