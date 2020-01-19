import * as React from "react";

import DatastoreFactory from '../store';

const store = DatastoreFactory.getInstance();

type ConnectionStatusState = {
    connected: Boolean
}

export default class ConnectionStatus extends React.Component<{}, ConnectionStatusState> {
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
        let connected = (this.state.connected ? "[*]" : "");

        return (
            <span>
                {connected}
            </span>
        )
    }
}