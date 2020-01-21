
import { EventEmitter } from 'events';
import { grpc } from "@improbable-eng/grpc-web";

import { WalletService } from './proto/api_pb_service';

import {
	PingRequest,
	AccountsRequest,
	TransactionNotificationsRequest,
	TransactionNotificationsResponse,
	AccountsResponse,
	PingResponse,
	GetTransactionsResponse,
	GetTransactionsRequest,
	BestBlockResponse,
	BestBlockRequest,
	GetTicketsResponse,
	GetTicketsRequest,
	BalanceRequest,
	BalanceResponse
} from './proto/api_pb';
import { getGrpcClient, grpcInvoke,grpcInvokerFactory } from './middleware/walletrpc';
import { Transaction, Ticket, ChainInfo, TransactionsListResult } from './models';



type CallbackFn = (r: TransactionsListResult) => void

type GetTicketsCallbackFn = (r: Ticket[]) => void

const pinger = grpcInvokerFactory(WalletService.Ping);

export class Datastore extends EventEmitter {


	constructor() {
		super();
		// this.transactions = {};
		// this.accounts = {};
		// this.getAccounts();
		// this.txNotifications();

		// pinger()
		// .then((r) =>{
		// 	console.log('pinger',r)
		// 	debugger
		// })
		// .catch((e)=>{

		// 	debugger;
		// })
		// this.ping();
		// setInterval(_.bind(this.ping, this), 5000);
	}


	ping() {
		const request = new PingRequest();

		grpcInvoke(WalletService.Ping, request, {
			onMessage: (message: PingResponse) => {
				this.emit('ping:connected');
				console.log("getAccounts", message.toObject());
			},
			onEnd: (code, message) => {
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

		return new Promise<AccountsResponse>((resolve, reject) => {

			const request = new AccountsRequest();
			grpcInvoke(WalletService.Accounts, request, {
				onMessage: (message: AccountsResponse) => {
					console.log("getAccounts", message.toObject());
					resolve(message);
				},
				onEnd: (code, message) => {
					if (code !== grpc.Code.OK) {
						console.error('getAccounts', code, message);
						reject({
							status: code,
							msg: message
						});
					}
				}

			})
		});
	}

	async getTickets(
		startBlockHeight: number,
		endBlockHeight: number,
		targetTicketCount: number,
		onDataRecvd: GetTicketsCallbackFn | undefined
	): Promise<Ticket[]> {

		const request = new GetTicketsRequest();
		request.setStartingBlockHeight(startBlockHeight);
		request.setEndingBlockHeight(endBlockHeight);
		request.setTargetTicketCount(targetTicketCount);

		const client = getGrpcClient(WalletService.GetTickets);

		const tickets: Ticket[] = [];

		return new Promise<Ticket[]>((resolve, reject) => {

			client.onMessage((message: GetTicketsResponse) => {
				// console.log('getTicketsList got ticket', message.toObject());

				let ticketDetails = message.getTicket();
				if (ticketDetails !== undefined) {
					tickets.push(new Ticket(ticketDetails))
				}
				if (onDataRecvd !== undefined) {
					onDataRecvd(tickets);
				}
			});

			client.onEnd((status, statusMessage) => {
				// console.log("getTickets", status, statusMessage, trailers);
				if (status !== grpc.Code.OK) {
					reject({
						status: status,
						msg: statusMessage
					});
				} else {
					resolve(tickets);
				}
			});

			client.start(new grpc.Metadata({ "HeaderTestKey1": "ClientValue1" }));
			client.send(request);
		});
	}

	async getChainInfo(): Promise<ChainInfo> {

		return new Promise<ChainInfo>((resolve, reject) => {
			const request = new BestBlockRequest();
			grpcInvoke(WalletService.BestBlock, request, {
				onMessage: (message: BestBlockResponse) => {
					console.log("getChainInfo", message.toObject());
					const chainInfo = new ChainInfo(message);
					resolve(chainInfo);
				},
				onEnd: (code, message) => {
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

	async getAccountBalance(accountNumber: number): Promise<BalanceResponse> {

		const request = new BalanceRequest();
		request.setAccountNumber(accountNumber);
		request.setRequiredConfirmations(3);

		return new Promise<BalanceResponse>((resolve, reject) => {

			grpcInvoke(WalletService.Balance, request, {
				onMessage: (message: BalanceResponse) => {
					console.log("getBalance", message.toObject());
					resolve(message);
				},
				onEnd: (code, message) => {
					if (code !== grpc.Code.OK) {
						console.error('getBalance', code, message);
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

		const client = getGrpcClient(WalletService.TransactionNotifications);

		client.onHeaders((headers: grpc.Metadata) => {
			// console.log("onHeaders", headers);
		});
		client.onMessage((message: TransactionNotificationsResponse) => {
			console.log("txnotifications", message.toObject());
			this.emit('change:transactions', message);
		});
		client.onEnd((status, message) => {
			// console.log("onEnd", status, statusMessage, trailers);
		});

		client.start();
		client.send(request);
	}

	async getTransactions(
		startBlockHeight: number,
		endBlockHeight: number,
		txCount: number,
		onDataRecvd: CallbackFn | undefined
	): Promise<TransactionsListResult> {

		const request = new GetTransactionsRequest();
		request.setStartingBlockHeight(startBlockHeight);
		request.setEndingBlockHeight(endBlockHeight);
		request.setTargetTransactionCount(txCount);

		return new Promise<TransactionsListResult>((resolve, reject) => {

			const client = getGrpcClient(WalletService.GetTransactions);
			const foundTx = new TransactionsListResult();

			client.onMessage((message: GetTransactionsResponse) => {
				// console.log('getTransactions got block', message.toObject());

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

			client.onEnd((status, message) => {
				// console.log("getTransactions", status, statusMessage, trailers);
				if (status !== grpc.Code.OK) {
					reject({
						status: status,
						msg: message
					});
				} else {
					resolve(foundTx);
				}
			});

			client.start();
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



export default DatastoreFactory;