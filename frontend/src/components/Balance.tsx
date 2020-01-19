import * as React from 'react';

import DatastoreFactory from '../store';
import { AccountsResponse } from '../proto/api_pb';
import { formatAmount } from '../helpers';

const store = DatastoreFactory.getInstance();

interface AccountOverviewState {
    accounts: AccountsResponse
}

export default class AccountOverview extends React.Component<{}, AccountOverviewState> {

    constructor(props: object) {
        super(props);
        this.state = {
            accounts: new AccountsResponse()
        }
    }

    componentDidMount() {
        store.getAccounts()
            .then((accounts) => {
                this.setState({
                    accounts: accounts
                })
            })
            .catch((err) => {
                console.error("AccountOverview", err);
            });
    }

    renderAccountItem(account: AccountsResponse.Account) {
        return (
            <tr key={account.getAccountNumber()}>
                <td>{account.getAccountName()}</td>
                <td>{formatAmount(account.getTotalBalance())}</td>
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
                        {this.state.accounts.getAccountsList().map(this.renderAccountItem)}
                    </tbody>
                </table>
            </div>
        )
    }
}