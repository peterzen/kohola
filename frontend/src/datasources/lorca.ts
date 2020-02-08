
import _ from 'lodash';

import {
	StakeInfoResponse,
	AccountsResponse, BestBlockResponse, VoteChoicesResponse, PingResponse, NetworkResponse,
	TicketPriceResponse, GetTicketsResponse, NextAddressRequest, NextAddressResponse,
	BalanceResponse,
	GetTransactionsResponse,
	ConstructTransactionRequest,
	ConstructTransactionResponse,
	SignTransactionRequest,
	SignTransactionResponse,
	PublishTransactionRequest,
	PublishTransactionResponse
} from '../proto/api_pb';
import { Ticket, WalletAccount, NextAddress, WalletBalance, AccountBalance, Transaction } from '../models';
import { AppError, ILorcaMessage } from '../store/types';
import { rawToHex } from '../helpers/byteActions';
import { CheckConnectionResponse, GRPCEndpoint } from '../proto/dcrwalletgui_pb';



const w = (window as any)

export function endpointFactory<T>(methodName: string, responseType: T) {

	if (w[methodName] == undefined) {
		throw {
			code: 99,
			msg: "Invalid methodname: window." + methodName + " does not exist"
		}
	}

	return async function <R>(request?: R) {
		return new Promise<T>((resolve, reject) => {
			let r = null
			if (request != undefined) {
				r = request.serializeBinary()
			}
			w[methodName]()
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(responseType.deserializeBinary(r.payload))
				})

		})
	}
}

const LorcaBackend = {
	fetchTickets: async (
		startBlockHeight: number,
		endBlockHeight: number,
		targetTicketCount: number) => {
		return new Promise<Ticket[]>((resolve, reject) => {
			w.walletrpc__GetTickets(startBlockHeight, endBlockHeight, targetTicketCount)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					const tix: Ticket[] = []
					_.each(r.apayload, (s: Uint8Array) => {
						const td = GetTicketsResponse.deserializeBinary(s)
						const ticket = td.getTicket()
						if (ticket == undefined) {
							return null
						}
						tix.push(new Ticket(ticket, td.getBlock()))
					})
					resolve(tix)
				})

		})
	},

	fetchNextAddress: async function (
		account: WalletAccount,
		kind: NextAddressRequest.KindMap[keyof NextAddressRequest.KindMap],
		gapPolicy: NextAddressRequest.GapPolicyMap[keyof NextAddressRequest.GapPolicyMap]
	): Promise<NextAddress> {

		return new Promise<NextAddress>((resolve, reject) => {
			w.walletrpc__NextAddress(account.getAccountNumber(), kind, gapPolicy)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(NextAddressResponse.deserializeBinary(r.payload))
				})
		});
	},

	constructTransaction: async function (
		request: ConstructTransactionRequest
	): Promise<ConstructTransactionResponse> {

		return new Promise<ConstructTransactionResponse>((resolve, reject) => {

			const ser = rawToHex(request.serializeBinary().buffer)
			// XXX we shouldn't have to serialize to hex but the built-in 
			// lorca JSON serializer fails on this object. 
			w.walletrpc__ConstructTransaction(ser)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(ConstructTransactionResponse.deserializeBinary(r.payload))
				})
				.catch((e) => {
					console.error("Serialization error", e)
				})
		});
	},

	signTransaction: async function (
		request: SignTransactionRequest
	): Promise<SignTransactionResponse> {

		return new Promise<SignTransactionResponse>((resolve, reject) => {

			const ser = rawToHex(request.serializeBinary().buffer)
			// XXX we shouldn't have to serialize to hex but the built-in 
			// lorca JSON serializer fails on this object. 
			w.walletrpc__SignTransaction(ser)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(SignTransactionResponse.deserializeBinary(r.payload))
				})
				.catch((e) => {
					console.error("Serialization error", e)
				})
		});
	},

	publishTransaction: async function (
		request: PublishTransactionRequest
	): Promise<PublishTransactionResponse> {

		return new Promise<PublishTransactionResponse>((resolve, reject) => {

			const ser = rawToHex(request.serializeBinary().buffer)
			// XXX we shouldn't have to serialize to hex but the built-in 
			// lorca JSON serializer fails on this object. 
			w.walletrpc__PublishTransaction(ser)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(PublishTransactionResponse.deserializeBinary(r.payload))
				})
				.catch((e) => {
					console.error("Serialization error", e)
				})
		});
	},

	fetchAccountBalance: async (accountNumber: number, requiredConfirmations: number) => {
		return new Promise<BalanceResponse>((resolve, reject) => {
			w.walletrpc__GetBalance(accountNumber, requiredConfirmations)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(BalanceResponse.deserializeBinary(r.payload))
				})
		})
	},

	fetchWalletBalance: async function (accountNumbers: number[]): Promise<WalletBalance> {

		const promises: Promise<AccountBalance>[] = [];
		const walletBalance: WalletBalance = {};

		accountNumbers.forEach((accountNumber) => {

			const p = LorcaBackend.fetchAccountBalance(accountNumber, 1)
				.then((balance: AccountBalance) => {
					walletBalance[accountNumber] = balance;
					return Promise.resolve(balance)

				})
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
	): Promise<Transaction[]> {

		return new Promise<Transaction[]>((resolve, reject) => {

			const foundTx: Transaction[] = [];
			const txResponses: GetTransactionsResponse[] = []

			w.walletrpc__GetTransactions(startBlockHeight, endBlockHeight, txCount)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					const tix: Ticket[] = []
					_.each(r.apayload, (s: Uint8Array) => {
						const tr = GetTransactionsResponse.deserializeBinary(s)
						txResponses.push(tr)
					})
					return Promise.resolve()
				})
				.then(() => {
					_.each(txResponses, (resp) => {
						let minedBlockDetails = resp.getMinedTransactions();
						if (minedBlockDetails !== undefined) {
							foundTx.push(...minedBlockDetails.getTransactionsList().map((tx) => new Transaction(tx, minedBlockDetails)));
						}

						let unminedTxList = resp.getUnminedTransactionsList();
						if (unminedTxList.length) {
							foundTx.push(...unminedTxList.map((tx) => new Transaction(tx)));
						}
					})
					resolve(foundTx)
				})
		})
	},

	checkGRPCEndpointConnection: async function (
		cfg: GRPCEndpoint
	): Promise<CheckConnectionResponse> {
		const ser = rawToHex(cfg.serializeBinary().buffer)
		return await w.walletgui_CheckGRPCConnection(ser)
	},

	doPing: endpointFactory("walletrpc__Ping", PingResponse),
	fetchAccounts: endpointFactory("walletrpc__GetAccounts", AccountsResponse),
	fetchStakeInfo: endpointFactory("walletrpc__GetStakeInfo", StakeInfoResponse),
	fetchTicketPrice: endpointFactory("walletrpc__GetTicketPrice", TicketPriceResponse),
	fetchBestBlock: endpointFactory("walletrpc__GetBestBlock", BestBlockResponse),
	fetchNetwork: endpointFactory("walletrpc__GetNetwork", NetworkResponse),
	fetchVoteChoices: endpointFactory("walletrpc__GetVoteChoices", VoteChoicesResponse),
}

export default LorcaBackend
