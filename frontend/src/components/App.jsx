import React from 'react';
import ReactDOM from 'react-dom';

import WsClient from '../ws';

import Balance from './Balance';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.socket = WsClient.getSocket()

        // state variables
        this.state = {
            connected: false,
        }
    }

    // componentDidMount is a react life-cycle method that runs after the component 
    //   has mounted.
    componentDidMount() {

        let socket = this.socket;

        // handle connect and discconnect events.
        socket.on('connect', this.onConnect);
        socket.on('disconnect', this.onDisconnect);

        /* EVENT LISTENERS */
        // event listener to handle 'hello' from a server
        socket.on('wsPong', this.helloFromServer);
    }

    // onConnect sets the state to true indicating the socket has connected 
    //    successfully.
    onConnect = () => {
        this.setState({ connected: true });
        this.render();
    }

    // onDisconnect sets the state to false indicating the socket has been 
    //    disconnected.
    onDisconnect = () => {
        this.setState({ connected: false });
        this.render();
    }

    // wsPing is an event emitter that sends a hello message to the backend 
    //    server on the socket.
    wsPing = () => {
        console.log('pinging backend...');
        this.socket.emit('wsPing', 'msg from App');
    }

    // helloFromServer is an event listener/consumer that handles hello messages 
    //    from the backend server on the socket.
    helloFromServer = (data) => {
        console.log('pong from backend:', data);
    }


    // render returns the JSX (UI elements).
    //   h1 title
    //   button that calls the event emitter wsPing.
    render() {
        const title = "dcrwalletgui";

        let connected  = (this.state.connected ? "[*]" : "");

        return (
            <div>
                <h1>{title} {connected}</h1>
                <hr />
                <button onClick={this.wsPing}>
                    Ping Backend
                </button>
                <Balance />
            </div>
        )
    }
}