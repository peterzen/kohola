import React from 'react';
import ReactDOM from 'react-dom';

import DatastoreFactory from '../store.js';

const store = DatastoreFactory.getInstance();


import Balance from './Balance';
import Transactions from './Transactions.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            connected: false,
        }
    }

    componentDidMount() {
        store.on('ping:connect', this.onConnect);
        store.on('ping:disconnect', this.onDisconnect);
    }

    onConnect = () => {
        this.setState({ connected: true });
        this.render();
    }

    onDisconnect = () => {
        this.setState({ connected: false });
        this.render();
    }

    render() {
        const title = "dcrwalletgui";

        let connected = (this.state.connected ? "[*]" : "");

        return (
            <div>
                <h1>{title} {connected}</h1>
                <hr />
                <Balance />
                <Transactions/>
            </div>
        )
    }
}