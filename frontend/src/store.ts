
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
	BlockDetails,
	BestBlockResponse,
	BestBlockRequest
} from './proto/api_pb';
import { TransactionDirection } from './constants';


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

export class ChainInfo {

	bestBlock: BestBlockResponse;

	constructor(bestBlock: BestBlockResponse | undefined) {
		if (bestBlock == undefined) {
			this.bestBlock=new BestBlockResponse();
			return;
		}
		this.bestBlock = bestBlock;
	}

	getBestBlockHeight(): number {
		return this.bestBlock.getHeight();
	}

	getBestBlockHash(): string {
		return reverseHash(Buffer.from(this.bestBlock.getHash_asU8()).toString("hex"));
	}
}

class Datastore extends EventEmitter {

	public transactions: Object;
	public accounts: Object;
	public chainInfo: ChainInfo;

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

	async getAccounts(): Promise<AccountsResponse> {

		const request = new AccountsRequest();

		return new Promise<AccountsResponse>((resolve, reject) => {

			grpc.invoke(WalletService.Accounts, {
				request: request,
				host: wsHost,
				onMessage: (message: AccountsResponse) => {
					console.log("getAccounts", message.toObject());
					resolve(message);
				},
				onEnd: (code: grpc.Code, message: string | undefined, trailers: grpc.Metadata) => {
					if (code !== grpc.Code.OK) {
						console.error('getAccounts', code, message);
						reject({
							status: code,
							msg: message
						});
					}
				}
			});
		});
	}


	getChainInfo(): Promise<ChainInfo> {
		const request = new BestBlockRequest();

		return new Promise<ChainInfo>((resolve, reject) => {
			grpc.invoke(WalletService.BestBlock, {
				request: request,
				host: wsHost,
				onMessage: (message: BestBlockResponse) => {
					console.log("getChainInfo", message.toObject());
					const chainInfo = new ChainInfo(message);
					resolve(chainInfo);
				},
				onEnd: (code: grpc.Code, message: string | undefined, trailers: grpc.Metadata) => {
					if (code !== grpc.Code.OK) {
						console.error('getChainInfo', code, message);
						reject({
							status: code,
							msg: message
						});
					}
				}
			});
		});
	}

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

			const foundTx = new GetTransactionsListResult();

			client.onHeaders((headers: grpc.Metadata) => {
				console.log("onHeaders", headers);
			});

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

export const DatastoreFactory = {

	getInstance: function () {
		if (datastore != null) {
			return datastore;
		}
		datastore = new Datastore();
		return datastore;
	}
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



export function reverseHash(s: string) {
	s = s.replace(/^(.(..)*)$/, "0$1"); // add a leading zero if needed
	let a = s.match(/../g);             // split number in groups of two
	if (a !== null) {
		a.reverse();                        // reverse the groups
		var s2 = a.join("");
		return s2;
	}
	return "";
}


export default DatastoreFactory;