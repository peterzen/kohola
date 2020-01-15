import React from 'react';
import ReactDOM from 'react-dom';

import WsClient from '../ws'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // state variables
        this.state = {
            connected: false,
        }
    }

    // componentDidMount is a react life-cycle method that runs after the component 
    //   has mounted.
    componentDidMount() {

        let socket = this.socket = WsClient.getSocket()

        // handle connect and discconnect events.
        socket.on('connect', this.onConnect);
        socket.on('disconnect', this.onDisconnect);

        /* EVENT LISTENERS */
        // event listener to handle 'hello' from a server
        socket.on('helloFromServer', this.helloFromServer);
    }

    // onConnect sets the state to true indicating the socket has connected 
    //    successfully.
    onConnect = () => {
        this.setState({connected: true});
    }

    // onDisconnect sets the state to false indicating the socket has been 
    //    disconnected.
    onDisconnect = () => {
        this.setState({connected: false});
    }

    // helloFromClient is an event emitter that sends a hello message to the backend 
    //    server on the socket.
    helloFromClient = () => {
        console.log('saying hello...');
        this.socket.emit('helloFromClient', 'hello server!');
    }

    // helloFromServer is an event listener/consumer that handles hello messages 
    //    from the backend server on the socket.
    helloFromServer = (data) => {
        console.log('###hello from server! message:', data);
    }


    // render returns the JSX (UI elements).
    //   h1 title
    //   button that calls the event emitter helloFromClient.
    render() {
        const title = "Go Sockets Tutorial";

        return (
            <div>
                <h1>{title}</h1>
                <hr/>
                <button onClick={this.helloFromClient}>
                    Say Hello to Backend Server
                </button>
            </div>
        )
    }
}