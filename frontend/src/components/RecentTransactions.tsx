import * as React from 'react';

import DatastoreFactory, { GetTransactionsListResult } from '../store';
import { Transaction } from "../models";
import { formatTxType } from '../helpers';
import { Timestamp, TransactionHash, Amount } from './shared';

const store = DatastoreFactory.getInstance();


interface TransactionListItemProps {
    tx: Transaction
}

export function TransactionListItem(props: TransactionListItemProps) {
    const tx = props.tx;
    return (
        <tr>
            <td><Timestamp ts={tx.getTimestamp()} /></td>
            <td><Amount amount={tx.getAmount()}/></td>
            <td>{formatTxType(tx.getType())}</td>
            <td><TransactionHash tx={tx} /></td>
        </tr>
    );
}

interface TransactionListProps {
    items: Array<Transaction>
}

export function TransactionList(props: TransactionListProps) {
    const list = props.items.map((tx: Transaction) => {
        return (
            <TransactionListItem tx={tx} key={tx.getHash()} />
        )
    });
    return (
        <table>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

interface RecentTransactionsState {
    results: GetTransactionsListResult
}

export default class RecentTransactions extends React.Component<{}, RecentTransactionsState> {

    constructor(props: Object) {
        super(props);
        this.state = {
            results: new GetTransactionsListResult()
        };
    }

    componentDidMount() {
        store.getTransactions(0, 200, 1250, undefined)
            .then((foundTx) => {
                this.setState({
                    results: foundTx
                })
            })
            .catch((err) => {
                console.error("RecentTransactions", err);
            });
    }


    render() {
        let
            unminedTxList = this.state.results.getUnminedTxList(),
            minedTxList = this.state.results.getMinedTxList();
        return (
            <div>
                <div>
                    <h3>Unmined transactions ({this.state.results.getUnminedTxCount().toString()})</h3>
                    <TransactionList items={unminedTxList} />
                </div>
                <div>
                    <h3>Mined transactions ({this.state.results.getMinedTxCount().toString()})</h3>
                    <TransactionList items={minedTxList} />
                </div>
            </div>
        )
    }
}