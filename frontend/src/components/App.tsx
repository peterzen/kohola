import * as React from "react";

import DatastoreFactory from '../store';

const store = DatastoreFactory.getInstance();


import Balance from './Balance';
import Transactions from './Transactions';


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
            this.setState({connected: true});
        });
        store.on('ping:disconnected', () => {
            this.setState({connected: false});
        });
    }

    render() {
        const title = "dcrwalletgui";

        let connected = (this.state.connected ? "[*]" : "");

        return (
            <div>
                <h1>{title} {connected}</h1>
                <hr />
                <Balance />
                <Transactions />
            </div>
        )
    }
}