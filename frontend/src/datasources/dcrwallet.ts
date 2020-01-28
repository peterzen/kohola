
import { grpc } from "@improbable-eng/grpc-web";
import * as api from '../proto/api_pb';

import { AppError } from "../store/types";
import { getGrpcClient, grpcInvoke, grpcInvokerFactory } from '../middleware/walletrpc';
import { Transaction, Ticket, AccountBalance, WalletBalance, NextAddress, WalletAccount } from '../models';
import { WalletService, VotingService, TicketBuyerService, AgendaService } from '../proto/api_pb_service';
import { ConstructTransactionRequest, ConstructTransactionResponse } from "../proto/api_pb";

interface IFetchTransactionsCallback {
	(r: Transaction[]): void
}

interface IGetTicketsCallback {
	(r: Ticket[]): void
}

const DcrwalletDatasource = {
	Ping: grpcInvokerFactory(WalletService.Ping),
	fetchNetwork: grpcInvokerFactory(WalletService.Network),
	fetchAgendas: grpcInvokerFactory(AgendaService.Agendas),
	fetchAccounts: grpcInvokerFactory(WalletService.Accounts),
	fetchBestBlock: grpcInvokerFactory(WalletService.BestBlock),
	fetchStakeInfo: grpcInvokerFactory(WalletService.StakeInfo),
	fetchTicketPrice: grpcInvokerFactory(WalletService.TicketPrice),
	fetchVoteChoices: grpcInvokerFactory(VotingService.VoteChoices),
	fetchStopAutoBuyer: grpcInvokerFactory(TicketBuyerService.StopAutoBuyer),
	fetchTicketBuyerConfig: grpcInvokerFactory(TicketBuyerService.TicketBuyerConfig),
	fetchLoadActiveDataFilters: grpcInvokerFactory(WalletService.LoadActiveDataFilters),

	fetchTickets: async function (
		startBlockHeight: number,
		endBlockHeight: number,
		targetTicketCount: number,
		onDataRecvd?: IGetTicketsCallback
	): Promise<Ticket[]> {

		const request = new api.GetTicketsRequest();
		request.setStartingBlockHeight(startBlockHeight);
		request.setEndingBlockHeight(endBlockHeight);
		request.setTargetTicketCount(targetTicketCount);

		const client = getGrpcClient(WalletService.GetTickets);

		const tickets: Ticket[] = [];

		return new Promise<Ticket[]>((resolve, reject) => {

			client.onMessage((message: api.GetTicketsResponse) => {
				// console.log('getTicketsList got ticket', message.toObject());

				let ticketDetails = message.getTicket();
				if (ticketDetails !== undefined) {
					tickets.push(new Ticket(ticketDetails, message.getBlock()))
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
	},

	fetchWalletBalance: async function (accountNumbers: number[]): Promise<WalletBalance> {

		const promises: Promise<AccountBalance>[] = [];
		const walletBalance: WalletBalance = {};

		accountNumbers.forEach((accountNumber) => {

			const request = new api.BalanceRequest();
			request.setAccountNumber(accountNumber);
			request.setRequiredConfirmations(3);

			const p = new Promise<AccountBalance>((resolve, reject) => {
				grpcInvoke(WalletService.Balance, request, {
					onMessage: (balance: AccountBalance) => {
						walletBalance[accountNumber] = balance;
						// console.log("getBalance", balance.toObject());
						resolve(balance);
					},
					onEnd: (code: grpc.Code, message: string) => {
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
			promises.push(p);
		});
		return new Promise<WalletBalance>((resolve, reject) => {
			Promise.all(promises)
				.then(() => {
					resolve(walletBalance);
				})
				.catch((err: AppError) => {
					reject(err);
				});
		})
	},

	fetchTransactions: async function (
		startBlockHeight: number,
		endBlockHeight: number,
		txCount: number,
		onDataRecvd?: IFetchTransactionsCallback | undefined
	): Promise<Transaction[]> {

		const request = new api.GetTransactionsRequest();
		request.setStartingBlockHeight(startBlockHeight);
		request.setEndingBlockHeight(endBlockHeight);
		request.setTargetTransactionCount(txCount);

		return new Promise<Transaction[]>((resolve, reject) => {

			const client = getGrpcClient(WalletService.GetTransactions);
			const foundTx: Transaction[] = [];

			client.onMessage((message: api.GetTransactionsResponse) => {
				let minedBlockDetails = message.getMinedTransactions();
				if (minedBlockDetails !== undefined) {
					foundTx.push(...minedBlockDetails.getTransactionsList().map((tx) => new Transaction(tx, minedBlockDetails)));
				}

				let unminedTxList = message.getUnminedTransactionsList();
				if (unminedTxList.length) {
					foundTx.push(...unminedTxList.map((tx) => new Transaction(tx)));
				}
				if (onDataRecvd !== undefined) {
					onDataRecvd(foundTx);
				}
			});

			client.onEnd((status, message) => {
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
	},

	accountNotifications: function (notificationHandler: IAccountNotificationHandler) {
		const request = new api.TransactionNotificationsRequest();
		const client = getGrpcClient(WalletService.AccountNotifications);
		client.onMessage(notificationHandler);
		client.start();
		client.send(request);
	},

	txNotifications: function (notificationHandler: ITransactionNotificationHandler) {
		const request = new api.TransactionNotificationsRequest();
		const client = getGrpcClient(WalletService.TransactionNotifications);
		client.onMessage(notificationHandler);
		client.start();
		client.send(request);
	},

	fetchNextAddress: async function (
		account: WalletAccount,
		kind: api.NextAddressRequest.KindMap[keyof api.NextAddressRequest.KindMap],
		gapPolicy: api.NextAddressRequest.GapPolicyMap[keyof api.NextAddressRequest.GapPolicyMap]
	): Promise<NextAddress> {

		const request = new api.NextAddressRequest();
		request.setAccount(account.getAccountNumber());
		request.setKind(kind);
		request.setGapPolicy(gapPolicy);

		return new Promise<NextAddress>((resolve, reject) => {
			grpcInvoke(WalletService.NextAddress, request, {
				onMessage: (response: NextAddress) => {
					resolve(response);
				},
				onEnd: (code: grpc.Code, message: string) => {
					if (code !== grpc.Code.OK) {
						console.error('fetchNextAddress', code, message);
						reject({
							status: code,
							msg: message
						});
					}
				}
			});
		});
	},

	doConstructTransaction: async (request: api.ConstructTransactionRequest)
		: Promise<ConstructTransactionResponse> => {
		return new Promise<ConstructTransactionResponse>((resolve, reject) => {
			grpcInvoke(WalletService.ConstructTransaction, request, {
				onMessage: (response: ConstructTransactionResponse) => {
					resolve(response);
				},
				onEnd: (code: grpc.Code, message: string) => {
					if (code !== grpc.Code.OK) {
						console.error('doConstructTransaction', code, message);
						reject({
							status: code,
							msg: message
						});
					}
				}
			});
		});
	},
}


interface IAccountNotificationHandler {
	(message: api.AccountNotificationsResponse): void
}

interface ITransactionNotificationHandler {
	(message: api.TransactionNotificationsResponse): void
}

export default DcrwalletDatasource;
