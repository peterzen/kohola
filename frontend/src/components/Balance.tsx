import * as React from 'react';

import DatastoreFactory from '../store';
import { AccountsResponse } from '../proto/api_pb';
import { formatAmount } from '../helpers';

const store = DatastoreFactory.getInstance();


export default class Balance extends React.Component<{},AccountsResponse.AsObject> {

    constructor(props: object) {
        super(props);
        this.state = new AccountsResponse().toObject();
    }

    componentDidMount() {
        store.on('change:accounts', (data: AccountsResponse) => {
            this.setState(data.toObject());
            // this.render();
        });
    }

    renderRow(props: AccountsResponse.Account.AsObject) {
        return (
            <tr key={props.accountNumber}>
                <td>{props.accountName}</td>
                <td>{formatAmount(props.totalBalance)}</td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <h3>Account Overview</h3>
                <table>
                    <thead>
                        <tr>
                            <th>account</th>
                            <th>spendable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.accountsList.map(this.renderRow)}
                    </tbody>
                </table>
            </div>
        )
    }
}