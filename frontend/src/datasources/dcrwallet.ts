
import { grpc } from "@improbable-eng/grpc-web";

import * as api from '../proto/api_pb';
import { WalletService, VotingService, TicketBuyerService, AgendaService } from '../proto/api_pb_service';
import { getGrpcClient, grpcInvoke, grpcInvokerFactory } from '../middleware/walletrpc';
import { Transaction, Ticket, TransactionsListResult } from '../models';


type CallbackFn = (r: TransactionsListResult) => void
type GetTicketsCallbackFn = (r: Ticket[]) => void


const DcrwalletDatasource = {
	Ping: grpcInvokerFactory(WalletService.Ping),
	BestBlock: grpcInvokerFactory(WalletService.BestBlock),
	Network: grpcInvokerFactory(WalletService.Network),
	StakeInfo: grpcInvokerFactory(WalletService.StakeInfo),
	TicketPrice: grpcInvokerFactory(WalletService.TicketPrice),
	Accounts: grpcInvokerFactory(WalletService.Accounts),
	LoadActiveDataFilters: grpcInvokerFactory(WalletService.LoadActiveDataFilters),
	TicketBuyerConfig: grpcInvokerFactory(TicketBuyerService.TicketBuyerConfig),
	StopAutoBuyer: grpcInvokerFactory(TicketBuyerService.StopAutoBuyer),
	Agendas: grpcInvokerFactory(AgendaService.Agendas),
	VoteChoices: grpcInvokerFactory(VotingService.VoteChoices),


	Tickets: function (
		startBlockHeight: number,
		endBlockHeight: number,
		targetTicketCount: number,
		onDataRecvd: GetTicketsCallbackFn | undefined
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

	Balance: function (accountNumber: number): Promise<api.BalanceResponse> {

		const request = new api.BalanceRequest();
		request.setAccountNumber(accountNumber);
		request.setRequiredConfirmations(3);

		return new Promise<api.BalanceResponse>((resolve, reject) => {

			grpcInvoke(WalletService.Balance, request, {
				onMessage: (message: api.BalanceResponse) => {
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
	},

	Transactions: function (
		startBlockHeight: number,
		endBlockHeight: number,
		txCount: number,
		onDataRecvd?: CallbackFn | undefined
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
