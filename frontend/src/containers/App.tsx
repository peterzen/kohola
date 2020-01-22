import * as React from "react";

import AccountOverview from '../components/Balance';
import RecentTransactions from '../components/RecentTransactions';
import ConnectionStatus from "../components/ConnectionStatus";
import TicketsOverview from "../components/TicketsOverview";
import BestBlock from "../components/BestBlockComponent";

export default class App extends React.Component {

    render() {
        const title = "dcrwalletgui";

        return (
            <div>
                <h1>{title}  <ConnectionStatus /></h1>
                <BestBlock />
                <hr />
                <AccountOverview />
                <hr />
                <TicketsOverview />
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