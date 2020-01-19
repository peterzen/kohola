import * as React from "react";

import DatastoreFactory, { ChainInfo } from '../store';

import AccountOverview from './Balance';
import RecentTransactions from './Transactions';
import ChainInfoComponent from "./ChainInfoComponent";

const store = DatastoreFactory.getInstance();

type AppState = {
    connected: Boolean
}

export default class App extends React.Component<{}, AppState> {
    constructor(props: Object) {
        super(props);

        this.state = {
            connected: false,
        }
    }

    componentDidMount() {
        store.on('ping:connected', () => {
            this.setState({ connected: true });
        });
        store.on('ping:disconnected', () => {
            this.setState({ connected: false });
        });
    }

    render() {
        const title = "dcrwalletgui";

        let connected = (this.state.connected ? "[*]" : "");

        return (
            <div>
                <h1>{title} {connected}</h1>
                <ChainInfoComponent />
                <hr />
                <AccountOverview />
                <RecentTransactions />
            </div>
        )
    }
}