
import Socket from './socket';

export default  {

    initialize: function() {
        // establish websocket connection to backend server.
        this.ws = new WebSocket('ws://localhost:8080/ws');

        // create and assign a socket to a variable.
        this.socket = new Socket(this.ws);
    },

    getSocket: function() {
        return this.socket;
    }
}