import _ from "lodash"

import {
    StakeInfoResponse,
    AccountsResponse,
    BestBlockResponse,
    VoteChoicesResponse,
    NetworkResponse,
    TicketPriceResponse,
    GetTicketsResponse,
    NextAddressRequest,
    NextAddressResponse,
    BalanceResponse,
    GetTransactionsResponse,
    ConstructTransactionRequest,
    ConstructTransactionResponse,
    SignTransactionRequest,
    SignTransactionResponse,
    PublishTransactionRequest,
    PublishTransactionResponse,
    AgendasResponse,
    PurchaseTicketsRequest,
    PurchaseTicketsResponse,
    NextAccountResponse,
    RenameAccountResponse,
    ValidateAddressResponse,
    SetVoteChoicesResponse,
    RunTicketBuyerRequest,
    RevokeTicketsResponse,
    RunAccountMixerRequest,
    DecodeRawTransactionResponse,
} from "../proto/api_pb"
import { rawToHex } from "../helpers/byteActions"
import {
    GRPCEndpoint,
    StakingHistory,
    StakeDiffHistory,
    UnspentOutput,
    CreateTransactionRequest,
} from "../proto/walletgui_pb"
import {
    Ticket,
    WalletAccount,
    WalletBalance,
    Transaction,
    AccountBalance,
} from "./models"

const w = window as any

export function endpointFactory<T>(methodName: string, responseType: T) {
    return async function <R>(request?: R) {
        if (w[methodName] == undefined) {
            throw {
                code: 99,
                msg:
                    "Invalid methodname: window." +
                    methodName +
                    " does not exist",
            }
        }

        let r = null
        if (request != undefined) {
            r = (request as any).serializeBinary()
        }
        try {
            const r = await w[methodName]()
            if (r.error != undefined) {
                throw r.error
            }
            return (responseType as any).deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}

// // @FIXME make this work and replace the above with it
// export function endpointFactory<T>(methodName: string, responseType: T) {

// 	return async function <R extends jspb.Message>(request?: R) {
// 		if (w[methodName] == undefined) {
// 			throw {
// 				code: 99,
// 				msg: "Invalid methodname: window." + methodName + " does not exist"
// 			}
// 		}
// 		let r = null
// 		let ser = null
// 		if (request != undefined) {
// 			ser = rawToHex((request as jspb.Message).serializeBinary().buffer)
// 		}
// 		try {
// 			const r = await w[methodName](ser)
// 			if (r.error != undefined) {
// 				throw r.error
// 			}
// 			return (responseType as any).deserializeBinary(r.payload)
// 		}
// 		catch (e) {
// 			console.error(e)
// 		}
// 	}
// }

const LorcaBackend = {
    fetchTickets: async (
        startBlockHeight: number,
        endBlockHeight: number,
        targetTicketCount: number
    ) => {
        try {
            const r = await w.walletrpc__GetTickets(
                startBlockHeight,
                endBlockHeight,
                targetTicketCount
            )
            if (r.error != undefined) {
                throw r.error
            }
            const tix: Ticket[] = []
            _.each(r.apayload, (s: Uint8Array) => {
                const td = GetTicketsResponse.deserializeBinary(s)
                const ticket = td.getTicket()
                if (ticket == undefined) {
                    return
                }
                tix.push(new Ticket(ticket, td.getBlock()))
            })
            return tix
        } catch (e) {
            console.error(e)
            return e
        }
    },

    fetchNextAddress: async (
        account: WalletAccount,
        kind: NextAddressRequest.KindMap[keyof NextAddressRequest.KindMap],
        gapPolicy: NextAddressRequest.GapPolicyMap[keyof NextAddressRequest.GapPolicyMap]
    ) => {
        try {
            const r = await w.walletrpc__NextAddress(
                account.getAccountNumber(),
                kind,
                gapPolicy
            )
            if (r.error != undefined) {
                throw r.error
            }
            return NextAddressResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            return
        }
    },

    fetchNextAccount: async (accountName: string, passphrase: string) => {
        try {
            const r = await w.walletrpc__NextAccount(accountName, passphrase)
            if (r.error != undefined) {
                throw r.error
            }
            return NextAccountResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    renameAccount: async (accountNumber: number, newName: string) => {
        try {
            const r = await w.walletrpc__RenameAccount(accountNumber, newName)
            if (r.error != undefined) {
                throw r.error
            }
            return RenameAccountResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    constructTransaction: async (request: ConstructTransactionRequest) => {
        try {
            const ser = rawToHex(request.serializeBinary().buffer)
            // XXX we shouldn't have to serialize to hex but the built-in
            // lorca JSON serializer fails on this object.
            console.log("RESPONSE ser", request.toObject())
            const r = await w.walletrpc__ConstructTransaction(ser)
            console.log("RESPONSE r", r)
            if (r.error != undefined) {
                throw r.error
            }
            return ConstructTransactionResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error("constructTransaction", e)
            throw e
        }
    },

    createTransaction: async (request: CreateTransactionRequest) => {
        try {
            const ser = rawToHex(request.serializeBinary().buffer)
            const r = await w.walletrpc__CreateTransaction(ser)

            if (r.error != undefined) {
                throw r.error
            }
            const response = ConstructTransactionResponse.deserializeBinary(r.payload)
            console.log("RESPONSE", response.toObject())
            return response
        } catch (e) {
            console.error("createRawTransaction:", e)
            throw e
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
        } catch (e) {
            console.error("Serialization error", e)
            throw e
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
            throw e
        }
    },

    purchaseTickets: async (
        request: PurchaseTicketsRequest
        // passphrase: Uint8Array,
        // accountNumber: number,
        // spendLimit: number,
        // requiredConfirmations: number,
        // votingAddress: string,
        // numTickets: number,
        // poolAddress: string,
        // poolFees: number,
        // expiry:number,
        // txFee: number,
        // ticketFee:number,
    ) => {
        try {
            const ser = rawToHex(request.serializeBinary().buffer)
            const r = await w.walletrpc__PurchaseTickets(ser)
            if (r.error != undefined) {
                throw r.error
            }
            return PurchaseTicketsResponse.deserializeBinary(r.payload)
        } catch (e) {
            throw e
            // console.error("Serialization error", e)
            // return e
        }
    },

    runTicketBuyer: async (
        request: RunTicketBuyerRequest,
        onError: (error: any) => void,
        onDone: () => void,
        onStop: () => void
    ) => {
        try {
            const ser = rawToHex(request.serializeBinary().buffer)

            const onErrorFnName = "lorcareceiver__RunTicketBuyer_onError"
            const onDoneFnName = "lorcareceiver__RunTicketBuyer_onDone"
            const onStopFnName = "lorcareceiver__RunTicketBuyer_onStop"
            w[onErrorFnName] = onError
            w[onDoneFnName] = onDone
            w[onStopFnName] = onStop

            await w.walletrpc__RunTicketBuyer(
                ser,
                "window." + onErrorFnName,
                "window." + onDoneFnName,
                "window." + onStopFnName
            )
        } catch (e) {
            throw e
        }
    },
    stopTicketBuyer: async () => {
        try {
            await w.walletrpc__StopTicketBuyer()
        } catch (e) {
            throw e
        }
    },

    runAccountMixer: async (
        request: RunAccountMixerRequest,
        onError: (error: any) => void,
        onDone: () => void,
        onStop: () => void
    ) => {
        try {
            const ser = rawToHex(request.serializeBinary().buffer)

            const onErrorFnName = "lorcareceiver__RunAccountMixer_onError"
            const onDoneFnName = "lorcareceiver__RunAccountMixer_onDone"
            const onStopFnName = "lorcareceiver__RunAccountMixer_onStop"
            w[onErrorFnName] = onError
            w[onDoneFnName] = onDone
            w[onStopFnName] = onStop

            await w.walletrpc__RunAccountMixer(
                ser,
                "window." + onErrorFnName,
                "window." + onDoneFnName,
                "window." + onStopFnName
            )
        } catch (e) {
            throw e
        }
    },
    stopAccountMixer: async () => {
        try {
            await w.walletrpc__StopAccountMixer()
        } catch (e) {
            throw e
        }
    },

    setVoteChoices: async (agendaId: string, choiceId: string) => {
        try {
            const r = await w.walletrpc__SetVoteChoices(agendaId, choiceId)
            if (r.error != undefined) {
                throw r.error
            }
            return SetVoteChoicesResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error("Serialization error", e)
            throw e
        }
    },

    fetchAccountBalance: async (
        accountNumber: number,
        requiredConfirmations: number
    ) => {
        try {
            const r = await w.walletrpc__GetBalance(
                accountNumber,
                requiredConfirmations
            )
            if (r.error != undefined) {
                throw r.error
            }
            return BalanceResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error("Serialization error", e)
            return
        }
    },

    revokeExpiredTickets: async (passphrase: string) => {
        try {
            const r = await w.walletrpc__RevokeTickets(passphrase)
            if (r.error != undefined) {
                throw r.error
            }
            return RevokeTicketsResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    fetchWalletBalance: async (accountNumbers: number[]) => {
        return new Promise((resolve) => {
            const promises: any = []
            const walletBalance: WalletBalance = {}
            accountNumbers.forEach((accountNumber) => {
                const p = LorcaBackend.fetchAccountBalance(accountNumber, 1)
                promises.push(p)
                p.then((r: AccountBalance) => {
                    walletBalance[accountNumber] = r
                })
            })
            Promise.all(promises).then(() => {
                resolve(walletBalance)
            })
        })
    },

    fetchTransactions: async (
        startBlockHeight: number,
        endBlockHeight: number,
        txCount: number
    ) => {
        const foundTx: Transaction[] = []
        const txResponses: GetTransactionsResponse[] = []
        try {
            const r = await w.walletrpc__GetTransactions(
                startBlockHeight,
                endBlockHeight,
                txCount
            )
            if (r.error != undefined) {
                throw r.error
            }
            const tix: Ticket[] = []
            _.each(r.apayload, (s: Uint8Array) => {
                const tr = GetTransactionsResponse.deserializeBinary(s)
                txResponses.push(tr)
            })
            _.each(txResponses, (resp) => {
                let minedBlockDetails = resp.getMinedTransactions()
                if (minedBlockDetails !== undefined) {
                    foundTx.push(
                        ...minedBlockDetails
                            .getTransactionsList()
                            .map((tx) => new Transaction(tx, minedBlockDetails))
                    )
                }

                let unminedTxList = resp.getUnminedTransactionsList()
                if (unminedTxList.length) {
                    foundTx.push(
                        ...unminedTxList.map((tx) => new Transaction(tx))
                    )
                }
            })
            return foundTx
        } catch (e) {
            console.error("fetchTransactions error", e)
            throw e
        }
    },

    validateAddress: async () => {
        const r = new ValidateAddressResponse()
        return Promise.resolve(r)
    },

    unspentOutputs: async (
        accountNumber: number,
        targetAmount: number,
        requiredConfirmations: number,
        includeImmature: boolean
    ) => {
        const unspents: UnspentOutput[] = []

        const r = await w.walletrpc__ListUnspent(
            accountNumber,
            targetAmount,
            requiredConfirmations,
            includeImmature
        )

        if (r.error != undefined) {
            throw r.error
        }
        _.each(r.apayload, (s: Uint8Array) => {
            const tr = UnspentOutput.deserializeBinary(s)
            unspents.push(tr)
        })
        return unspents
    },

    checkGRPCEndpointConnection: async (cfg: GRPCEndpoint) => {
        const ser = rawToHex(cfg.serializeBinary().buffer)
        return await w.walletgui__CheckGRPCConnection(ser)
    },

    fetchCertBlob: async (certFileName: string) => {
        return await w.walletgui__FetchCertBlob(certFileName)
    },

    decodeRawTransaction: async (serializedTransaction: Uint8Array) => {
        try {
            const r = await w.walletrpc__DecodeRawTransaction(
                rawToHex(serializedTransaction)
            )
            if (r.error != undefined) {
                throw r.error
            }
            return DecodeRawTransactionResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    fetchStakeDiffHistory: async (
        startTimestamp: number,
        endTimestamp: number
    ) => {
        try {
            const r = await w.walletgui__FetchStakeDiffHistory(
                startTimestamp,
                endTimestamp
            )
            if (r.error != undefined) {
                throw r.error
            }
            return StakeDiffHistory.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    getStakingHistory: async (
        startBlockHeight: number,
        endBlockHeight: number,
    ) => {
        try {
            const r = await w.walletgui__GetStakingHistory(
                startBlockHeight,
                endBlockHeight
            )
            if (r.error != undefined) {
                throw r.error
            }
            return StakingHistory.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    },

    fetchAgendas: endpointFactory("walletrpc__GetAgendas", AgendasResponse),
    fetchNetwork: endpointFactory("walletrpc__GetNetwork", NetworkResponse),
    fetchUnspent: endpointFactory("walletrpc__ListUnspent", UnspentOutput),
    fetchAccounts: endpointFactory("walletrpc__GetAccounts", AccountsResponse),
    fetchBestBlock: endpointFactory(
        "walletrpc__GetBestBlock",
        BestBlockResponse
    ),
    fetchStakeInfo: endpointFactory(
        "walletrpc__GetStakeInfo",
        StakeInfoResponse
    ),
    fetchTicketPrice: endpointFactory(
        "walletrpc__GetTicketPrice",
        TicketPriceResponse
    ),
    fetchVoteChoices: endpointFactory(
        "walletrpc__GetVoteChoices",
        VoteChoicesResponse
    ),
}

export default LorcaBackend
