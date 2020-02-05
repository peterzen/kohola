const w = (window as any)

import { BalanceResponse, StakeInfoResponse, AccountsResponse, BestBlockResponse, VoteChoicesResponse, PingResponse, NetworkResponse, TicketPriceResponse, GetTicketsResponse, NextAddressRequest, NextAddressResponse } from '../proto/api_pb';
import { Ticket, WalletAccount, NextAddress } from '../models';
import _ from 'lodash';
import { grpcInvoke } from '../middleware/walletrpc';
import { WalletService } from '../proto/api_pb_service';
import { grpc } from '@improbable-eng/grpc-web';


interface ILorcaMessage {
	error: {
		code: number
		msg: string
	}
	payload: Uint8Array
	apayload: Uint8Array[]
}

function endpointFactory<T>(methodName: string, req: T) {

	if (w[methodName] == undefined) {
		throw {
			code: 99,
			msg: "Invalid methodname: window." + methodName + " does not exist"
		}
	}

	return async function () {
		return new Promise<T>((resolve, reject) => {
			w[methodName]()
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(req.deserializeBinary(r.payload))
				})

		})
	}
}

const LorcaBackend = {
	fetchBalance: async (accountNumber: number, requiredConfirmations: number) => {
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
			debugger
			w.walletrpc__NextAddress(account.getAccountNumber(), kind, gapPolicy)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(NextAddressResponse.deserializeBinary(r.payload))
				})
		});
	},

	doPing: endpointFactory("walletrpc__Ping", PingResponse),
	fetchAccounts: endpointFactory("walletrpc__GetAccounts", AccountsResponse),
	fetchStakeInfo: endpointFactory("walletrpc__GetStakeInfo", StakeInfoResponse),
	fetchTicketPrice: endpointFactory("walletrpc__GetTicketPrice", TicketPriceResponse),
	// getTickets: endpointFactory("walletrpc__GetTickets", GetTicketsResponse),
	fetchBestBlock: endpointFactory("walletrpc__GetBestBlock", BestBlockResponse),
	fetchNetwork: endpointFactory("walletrpc__GetNetwork", NetworkResponse),
	fetchVoteChoices: endpointFactory("walletrpc__GetVoteChoices", VoteChoicesResponse),
}

export default LorcaBackend
