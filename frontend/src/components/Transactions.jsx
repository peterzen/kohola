import React from 'react';
import ReactDOM from 'react-dom';


import DatastoreFactory from '../store.js';

const store = DatastoreFactory.getInstance();


export default class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unminedTransactionsList: [],
            unminedTransactionHashesList: []
        }
    }

    componentDidMount() {
        store.on('change:transactions', this.onTxUpdate);
    }

    onTxUpdate = (data) => {
        this.setState(data);
        this.render();
    }

    renderRow(props) {
        return (
            <tr>
                <td>{props}</td>
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.unminedTransactionHashesList.map(this.renderRow)}
                    </tbody>
                </table>
            </div>
        )
    }
}