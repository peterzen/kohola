
import { EventEmitter } from 'events';
import { grpc } from "@improbable-eng/grpc-web";
import _ from 'lodash';

import { WalletService } from './proto/api_pb_service';

import {
	PingRequest,
	AccountsRequest,
	TransactionNotificationsRequest,
	TransactionNotificationsResponse,
	AccountNotificationsRequest,
	AccountNotificationsResponse,
	AccountsResponse,
	PingResponse
} from './proto/api_pb';


const transport = grpc.WebsocketTransport();
const wsHost = "https://localhost:8443"


interface Events {
	changeAccounts(accounts: AccountsResponse): void
	pingConnect(): void
	pingDisconnect(): void
	changeTransactions(tx: TransactionNotificationsResponse): void
}

class Datastore extends EventEmitter {

	public transactions: Object;
	public accounts: Object;

	constructor() {
		super();
		this.transactions = {};
		this.accounts = {};
		this.getAccounts();
		this.txNotifications();

		this.ping();
		// setInterval(_.bind(this.ping, this), 5000);
	}

	ping() {
		const pingRequest = new PingRequest();
		grpc.invoke(WalletService.Ping, {
			request: pingRequest,
			host: wsHost,
			onMessage: (message: PingResponse) => {
				this.emit('ping:connected');
				console.log("getAccounts", message.toObject());
			},
			onEnd: (code: grpc.Code, message: string | undefined, trailers: grpc.Metadata) => {
				// console.log('result', res);
				// console.log("onEnd.status", status, statusMessage);
				// console.log("onEnd.headers", headers);
				if (code !== grpc.Code.OK) {
					console.error('ping', code, message);
					this.emit('ping:disconnected');
				}
			}
		});
	}

	getAccounts() {
		const accountRequest = new AccountsRequest();
		grpc.invoke(WalletService.Accounts, {
			request: accountRequest,
			host: wsHost,
			onMessage: (message: AccountsResponse) => {
				this.emit('change:accounts', message);
				console.log("getAccounts", message.toObject());
			},
			onEnd: (code: grpc.Code, message: string | undefined, trailers: grpc.Metadata) => {
				// console.log('result', res);
				// const { status, statusMessage, headers, message } = res;
				// console.log("onEnd.status", status, statusMessage);
				// console.log("onEnd.headers", headers);
				if (code !== grpc.Code.OK) {
					console.error('getAccounts', code, message);
				}
			}
		});
	}

	// accountNotifications() {
	// 	const request = new AccountNotificationsRequest();

	// 	const client = grpc.client(WalletService.AccountNotifications, {
	// 		host: wsHost,
	// 		transport: transport
	// 	});
	// 	client.onHeaders((headers: grpc.Metadata) => {
	// 		// console.log("onHeaders", headers);
	// 	});
	// 	client.onMessage((message: AccountNotificationsResponse) => {
	// 		console.log("accountnotifications", message.toObject());
	// 		this.emit('change:accounts', message);
	// 	});
	// 	client.onEnd((status: grpc.Code, statusMessage: string, trailers: grpc.Metadata) => {
	// 		console.log("onEnd", status, statusMessage, trailers);
	// 	});

	// 	client.start(new grpc.Metadata({ "HeaderTestKey1": "ClientValue1" }));
	// 	client.send(request);
	// }


	txNotifications() {
		const request = new TransactionNotificationsRequest();

		const client = grpc.client(WalletService.TransactionNotifications, {
			host: wsHost,
			transport: transport
		});
		client.onHeaders((headers: grpc.Metadata) => {
			// console.log("onHeaders", headers);
		});
		client.onMessage((message: TransactionNotificationsResponse) => {
			console.log("txnotifications", message.toObject());
			this.emit('change:transactions', message);
		});
		client.onEnd((status: grpc.Code, statusMessage: string, trailers: grpc.Metadata) => {
			// console.log("onEnd", status, statusMessage, trailers);
		});

		client.start(new grpc.Metadata({ "HeaderTestKey1": "ClientValue1" }));
		client.send(request);
	}
}

let datastore: Datastore;

const DatastoreFactory = {

	getInstance: function () {
		if (datastore != null) {
			return datastore;
		}
		datastore = new Datastore();
		return datastore;
	}
}


export default DatastoreFactory;