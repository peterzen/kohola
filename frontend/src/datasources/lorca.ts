const w = (window as any)

import { BalanceResponse, StakeInfoResponse } from '../proto/api_pb';


interface ILorcaMessage {
	error: {
		code: number
		msg: string
	}
	payload: Uint8Array
}

export class LorcaBackend {
	static async fetchBalance(accountNumber: number, requiredConfirmations: number) {
		return new Promise<BalanceResponse>((resolve, reject) => {
			w.walletrpc__GetBalance(accountNumber, requiredConfirmations)
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(BalanceResponse.deserializeBinary(r.payload))
				})

		})
	}


	static async fetchStakeInfo():Promise<StakeInfoResponse> {
		return new Promise<StakeInfoResponse>((resolve, reject) => {
			w.walletrpc__GetStakeInfo()
				.then((r: ILorcaMessage) => {
					if (r.error != undefined) {
						return reject(r.error)
					}
					resolve(StakeInfoResponse.deserializeBinary(r.payload))
				})

		})
	}

}

