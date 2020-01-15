import React from 'react';
import ReactDOM from 'react-dom';

import WsClient from '../ws'

class AccountRow extends React.Component {
}


export default class Balance extends React.Component {
    constructor(props) {
        super(props);

        // state variables
        this.state = {
            balances: []
        }
    }

    // componentDidMount is a react life-cycle method that runs after the component 
    //   has mounted.
    componentDidMount() {

        let socket = this.socket = WsClient.getSocket();

        // handle connect and discconnect events.
        socket.on('getbalanceResult', this.onDataReceived);

        socket.on('connect', function () {
            // debugger
            socket.emit('getbalance', '');
        });

    }


    onDataReceived = (data) => {
        this.setState(JSON.parse(data));
        console.log(this.state);
    }

    renderRow(props) {
        return (
        <tr>
            <td>{props.accountname}</td>
            <td>{props.spendable}</td>
        </tr>
        )
    }

    render() {
        return (
            <div>
                <h3>Account Overview</h3>
                <table>
                    <thead>
                        <th>account</th>
                        <th>spendable</th>
                    </thead>
                    <tbody>
                    {this.state.balances.map(this.renderRow)}
                    </tbody>
                </table>
            </div>
        )
    }

}