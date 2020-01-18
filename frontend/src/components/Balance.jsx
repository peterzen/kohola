import React from 'react';
import ReactDOM from 'react-dom';


import DatastoreFactory from '../store.js';

const store = DatastoreFactory.getInstance();


export default class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountsList: []
        }
    }

    componentDidMount() {
        store.on('change:accounts', this.onAccountsUpdate);
    }

    onAccountsUpdate = (data) => {
        this.setState(data);
        this.render();
    }

    renderRow(props) {
        return (
            <tr>
                <td>{props.accountName}</td>
                <td>{props.totalBalance}</td>
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