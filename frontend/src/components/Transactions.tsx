import * as React from 'react';
import * as moment from 'moment';

import DatastoreFactory from '../store';
import { TransactionNotificationsResponse, TransactionDetails } from '../proto/api_pb';

const store = DatastoreFactory.getInstance();

export default class Transactions extends React.Component<{},TransactionNotificationsResponse.AsObject> {
    constructor(props: Object) {
        super(props);
        this.state = new TransactionNotificationsResponse().toObject();
    }

    componentDidMount() {
        store.on('change:transactions', (data:TransactionNotificationsResponse) => {
            this.setState(data.toObject())
        });
    }

    renderRow(props: TransactionDetails.AsObject) {
        const ts = moment.unix(props.timestamp).fromNow();
        return (
            <tr key={props.hash.toString()}>
                <td>{props.hash.toString()}</td>
                <td>{ts}</td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <h3>Transactions</h3>
                <table>
                    <thead>
                        <tr>
                            <th>hash</th>
                            <th>timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.unminedTransactionsList.map(this.renderRow)}
                    </tbody>
                </table>
            </div>
        )
    }
}