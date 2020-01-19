
import { EventEmitter } from 'events';
import { grpc } from "@improbable-eng/grpc-web";
import _ from 'lodash';
import * as moment from 'moment';

import { WalletService } from './proto/api_pb_service';

import {
	PingRequest,
	AccountsRequest,
	TransactionNotificationsRequest,
	TransactionNotificationsResponse,
	AccountNotificationsRequest,
	AccountNotificationsResponse,
	AccountsResponse,
	PingResponse,
	GetTransactionRequest,
	GetTransactionResponse,
	GetTransactionsResponse,
	GetTransactionsRequest,
	TransactionDetails,
	BlockDetails
} from './proto/api_pb';
import { reverseHash } from './helpers';


const transport = grpc.WebsocketTransport();
const wsHost = "https://localhost:8443"



export class GetTransactionsListResult {

	public minedTx: Array<Transaction>
	public unminedTx: Array<Transaction>

	constructor() {
		this.unminedTx = [];
		this.minedTx = [];
	}

	getUnminedTxList(): Transaction[] {
		return this.unminedTx;
	}

	getMinedTxList(): Transaction[] {
		return this.minedTx;
	}

	addMinedTx(txList: Transaction[]) {
		this.minedTx.push(...txList);
	}

	addUnminedTx(txList: Transaction[]) {
		this.unminedTx.push(...txList);
	}

	getUnminedTxCount() {
		return this.unminedTx.length;
	}

	getMinedTxCount() {
		return this.minedTx.length;
	}

	getTxCount() {
		return this.minedTx.length + this.unminedTx.length;
	}
}

type CallbackFn = (r: GetTransactionsListResult) => void


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

	async getTransactions(
		startBlockHeight: number,
		endBlockHeight: number,
		txCount: number,
		onDataRecvd: CallbackFn | undefined
	): Promise<GetTransactionsListResult> {

		const request = new GetTransactionsRequest();

		request.setStartingBlockHeight(startBlockHeight);
		request.setEndingBlockHeight(endBlockHeight);
		request.setTargetTransactionCount(txCount);

		const client = grpc.client(WalletService.GetTransactions, {
			host: wsHost,
			transport: transport
		});

		return new Promise<GetTransactionsListResult>((resolve, reject) => {

			client.onHeaders((headers: grpc.Metadata) => {
				console.log("onHeaders", headers);
			});

			const foundTx = new GetTransactionsListResult();

			client.onMessage((message: GetTransactionsResponse) => {
				console.log('getTransactions got block', message.toObject());

				let minedBlockDetails = message.getMinedTransactions();
				if (minedBlockDetails !== undefined) {
					foundTx.addMinedTx(
						minedBlockDetails.getTransactionsList().map((tx) => new Transaction(tx))
					);
				}

				let unminedTxList = message.getUnminedTransactionsList();
				if (unminedTxList.length) {
					foundTx.addUnminedTx(
						unminedTxList.map((tx) => new Transaction(tx))
					);
				}
				if (onDataRecvd !== undefined) {
					onDataRecvd(foundTx);
				}
			});

			client.onEnd((status: grpc.Code, statusMessage: string, trailers: grpc.Metadata) => {
				// console.log("getTransactions", status, statusMessage, trailers);
				if (status !== grpc.Code.OK) {
					reject({
						status: status,
						msg: statusMessage
					});
				} else {
					resolve(foundTx);
				}
			});

			client.start(new grpc.Metadata({ "HeaderTestKey1": "ClientValue1" }));
			client.send(request);
		});
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

export enum TransactionType {
	REGULAR = 0,
	COINBASE = 4,
	TICKET_PURCHASE = 1,
	VOTE = 2,
	REVOCATION = 3
}

export enum TransactionDirection {
	TRANSACTION_DIR_RECEIVED = 0,
	TRANSACTION_DIR_TRANSFERRED = 1,
	TRANSACTION_DIR_SENT = 2
}

export class WalletAccount extends AccountsResponse.Account {
	constructor(id: number) {
		super();
		this.setAccountNumber(id);
	}
}



export class Transaction {
	timestamp: moment.Moment
	height: number
	blockHash: string
	index: number
	hash: Uint8Array | string
	txHash: string
	type: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap]
	debitsAmount: number
	creditsAmount: number
	direction: TransactionDirection
	amount: number
	fee: number
	debitAccounts: WalletAccount[] = []
	creditAddresses: string[] = []

	constructor(tx: TransactionDetails | null) {

		if (tx === null) {
			return;
		}

		this.timestamp = moment.unix(tx.getTimestamp());
		this.txHash = reverseHash(Buffer.from(tx.getHash_asU8()).toString("hex"));

		const inputAmounts = tx.getDebitsList().reduce((s, input) => s + input.getPreviousAmount(), 0);
		const outputAmounts = tx.getCreditsList().reduce((s, input) => s + input.getAmount(), 0);
		this.amount = outputAmounts - inputAmounts;
		this.fee = tx.getFee();
		this.type = tx.getTransactionType();

		tx.getDebitsList().forEach((debit) => {
			const a = new WalletAccount(debit.getPreviousAccount());
			this.debitAccounts.push(a)
		});

		tx.getCreditsList().forEach((credit) => {
			this.creditAddresses.push(credit.getAddress())
		});

		if (this.type === TransactionDetails.TransactionType.REGULAR) {
			if (this.amount > 0) {
				this.direction = TransactionDirection.TRANSACTION_DIR_RECEIVED;
			} else if (this.amount < 0 && (this.fee == Math.abs(this.amount))) {
				this.direction = TransactionDirection.TRANSACTION_DIR_TRANSFERRED;
			} else {
				this.direction = TransactionDirection.TRANSACTION_DIR_SENT;
			}
		}
	}

	getTimestamp() {
		return this.timestamp;
	}
	getHash() {
		return this.txHash;
	}

	getHeight() {
		return this.height;
	}
	getBlockHash() {
		return this.blockHash;
	}
	getIndex() {
		return this.index;
	}
	getType() {
		return this.type;
	}
	getDebitsAmount() {
		return this.debitsAmount;
	}
	getCreditsAmount() {
		return this.creditsAmount;
	}
	getDirection() {
		return this.direction;
	}
	getAmount() {
		return this.amount;
	}
	getFee() {
		return this.fee;
	}
	getDebitAccounts() {
		return this.debitAccounts;
	}
	getCreditAddresses() {
		return this.creditAddresses;
	}
}



export default DatastoreFactory;