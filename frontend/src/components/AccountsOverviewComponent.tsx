import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { formatAmount } from '../helpers';
import { IApplicationState } from '../store/types';
import { WalletAccountsState } from '../store/accounts/types';
import { WalletAccount } from '../models';


class AccountsOverviewComponent extends React.Component<WalletAccountsState, WalletAccountsState> {

    renderAccountItem(account: WalletAccount) {
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
                        {this.props.accounts.map(this.renderAccountItem)}
                    </tbody>
                </table>
            </div>
        )
    }
}



const mapStateToProps = function (state: IApplicationState, ownProps: any) {
    return {
        accounts: state.accounts.accounts
    };
}
export default withRouter(connect(mapStateToProps, {
})(AccountsOverviewComponent));