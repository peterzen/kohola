
import { grpc } from "@improbable-eng/grpc-web";
import * as api from '../proto/api_pb';

import { AppError } from "../store/types";
import { getGrpcClient, grpcInvoke, grpcInvokerFactory } from '../middleware/walletrpc';
import { Transaction, Ticket, TransactionsListResult, AccountBalance, WalletBalance } from '../models';
import { WalletService, VotingService, TicketBuyerService, AgendaService } from '../proto/api_pb_service';

interface IFetchTransactionsCallback {
	(r: TransactionsListResult): void
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

	fetchTickets: function (
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
	},

	fetchWalletBalance: function (accountNumbers: number[]): Promise<WalletBalance> {

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
						console.log("getBalance", balance.toObject());
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

	fetchTransactions: function (
		startBlockHeight: number,
		endBlockHeight: number,
		txCount: number,
		onDataRecvd?: IFetchTransactionsCallback | undefined
	): Promise<TransactionsListResult> {

		const request = new api.GetTransactionsRequest();
		request.setStartingBlockHeight(startBlockHeight);
		request.setEndingBlockHeight(endBlockHeight);
		request.setTargetTransactionCount(txCount);

		return new Promise<TransactionsListResult>((resolve, reject) => {

			const client = getGrpcClient(WalletService.GetTransactions);

			const foundTx: TransactionsListResult = {
				unminedTx: [],
				minedTx: []
			}

			client.onMessage((message: api.GetTransactionsResponse) => {
				// console.log('getTransactions got block', message.toObject());

				let minedBlockDetails = message.getMinedTransactions();
				if (minedBlockDetails !== undefined) {
					foundTx.minedTx.push(...minedBlockDetails.getTransactionsList().map((tx) => new Transaction(tx)));
				}

				let unminedTxList = message.getUnminedTransactionsList();
				if (unminedTxList.length) {
					foundTx.unminedTx.push(...unminedTxList.map((tx) => new Transaction(tx)));
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



	// async txNotifications() {
	//     const request = new api.TransactionNotificationsRequest();

	//     const client = getGrpcClient(WalletService.TransactionNotifications);

	//     client.onHeaders((headers: grpc.Metadata) => {
	//         // console.log("onHeaders", headers);
	//     });
	//     client.onMessage((message: api.TransactionNotificationsResponse) => {
	//         console.log("txnotifications", message.toObject());
	//         // this.emit('change:transactions', message);
	//     });
	//     client.onEnd((status, message) => {
	//         // console.log("onEnd", status, statusMessage, trailers);
	//     });

	//     client.start();
	//     client.send(request);
	// }

}



export default DcrwalletDatasource;
