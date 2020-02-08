
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
import { Ticket, WalletAccount, WalletBalance, AccountBalance, Transaction } from '../models';
import { rawToHex } from '../helpers/byteActions';
import { GRPCEndpoint } from '../proto/dcrwalletgui_pb';

const w = (window as any)

export function endpointFactory<T>(methodName: string, responseType: T) {
	if (w[methodName] == undefined) {
		throw {
			code: 99,
			msg: "Invalid methodname: window." + methodName + " does not exist"
		}
	}

	return async function <R>(request?: R) {
		let r = null
		if (request != undefined) {
			r = request.serializeBinary()
		}
		try {
			const r = await w[methodName]()
			if (r.error != undefined) {
				throw r.error
			}
			return responseType.deserializeBinary(r.payload)
		}
		catch (e) {
			console.error(e)
		}
	}
}

const LorcaBackend = {
	fetchTickets: async (startBlockHeight: number, endBlockHeight: number, targetTicketCount: number) => {
		try {
			const r = await w.walletrpc__GetTickets(startBlockHeight, endBlockHeight, targetTicketCount)
			if (r.error != undefined) {
				throw r.error
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
			return tix
		}
		catch (e) {
			console.error(e)
			return
		}
	},

	fetchNextAddress: async (
		account: WalletAccount,
		kind: NextAddressRequest.KindMap[keyof NextAddressRequest.KindMap],
		gapPolicy: NextAddressRequest.GapPolicyMap[keyof NextAddressRequest.GapPolicyMap]
	) => {
		try {
			const r = await w.walletrpc__NextAddress(account.getAccountNumber(), kind, gapPolicy)
			if (r.error != undefined) {
				throw r.error
			}
			return NextAddressResponse.deserializeBinary(r.payload)
		}
		catch (e) {
			console.error(e)
			return
		}
	},

	constructTransaction: async (request: ConstructTransactionRequest) => {
		try {
			const ser = rawToHex(request.serializeBinary().buffer)
			// XXX we shouldn't have to serialize to hex but the built-in 
			// lorca JSON serializer fails on this object. 
			const r = await w.walletrpc__ConstructTransaction(ser)
			if (r.error != undefined) {
				throw r.error
			}
			return ConstructTransactionResponse.deserializeBinary(r.payload)

		} catch (e) {
			console.error("Serialization error", e)
			return
		}
	},

	signTransaction: async (request: SignTransactionRequest) => {
		try {
			const ser = rawToHex(request.serializeBinary().buffer)
			const r = await w.walletrpc__SignTransaction(ser)
			if (r.error != undefined) {
				throw r.error
			}
			return SignTransactionResponse.deserializeBinary(r.payload)
		}
		catch (e) {
			console.error("Serialization error", e)
			return
		}
	},

	publishTransaction: async (request: PublishTransactionRequest) => {
		try {
			const ser = rawToHex(request.serializeBinary().buffer)
			// XXX we shouldn't have to serialize to hex but the built-in 
			// lorca JSON serializer fails on this object. 
			const r = await w.walletrpc__PublishTransaction(ser)
			if (r.error != undefined) {
				throw r.error
			}
			return PublishTransactionResponse.deserializeBinary(r.payload)
		} catch (e) {
			console.error("Serialization error", e)
			return
		}
	},

	fetchAccountBalance: async (accountNumber: number, requiredConfirmations: number) => {
		try {
			const r = await w.walletrpc__GetBalance(accountNumber, requiredConfirmations)
			if (r.error != undefined) {
				throw r.error
			}
			return BalanceResponse.deserializeBinary(r.payload)

		} catch (e) {
			console.error("Serialization error", e)
			return
		}
	},

	fetchWalletBalance: async (accountNumbers: number[]) => {
		const walletBalance: WalletBalance = {};
		accountNumbers.forEach(async (accountNumber) => {
			const balance = await LorcaBackend.fetchAccountBalance(accountNumber, 1)
			walletBalance[accountNumber] = balance as AccountBalance;
		});
		return walletBalance
	},

	fetchTransactions: async (startBlockHeight: number, endBlockHeight: number, txCount: number) => {

		const foundTx: Transaction[] = [];
		const txResponses: GetTransactionsResponse[] = []
		try {
			const r = await w.walletrpc__GetTransactions(startBlockHeight, endBlockHeight, txCount)
			if (r.error != undefined) {
				throw r.error
			}
			const tix: Ticket[] = []
			_.each(r.apayload, (s: Uint8Array) => {
				const tr = GetTransactionsResponse.deserializeBinary(s)
				txResponses.push(tr)
			})
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
			return foundTx
		}
		catch (e) {
			console.error("Serialization error", e)
			return
		}
	},

	checkGRPCEndpointConnection: async (cfg: GRPCEndpoint) => {
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
