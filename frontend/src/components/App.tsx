import * as React from "react";

import AccountOverview from './Balance';
import RecentTransactions from './RecentTransactions';
import ChainInfoComponent from "./ChainInfoComponent";
import ConnectionStatus from "./ConnectionStatus";
import TicketsOverview from "./TicketsOverview";

export default class App extends React.Component {

    render() {
        const title = "dcrwalletgui";

        return (
            <div>
                <h1>{title}  <ConnectionStatus /></h1>
                <ChainInfoComponent />
                <hr />
                <AccountOverview />
                <hr />
                <TicketsOverview />
                <hr />
                <RecentTransactions />
            </div>
        )
    }
}