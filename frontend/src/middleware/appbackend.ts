import {
	AppConfiguration,
	SetConfigResponse,
	SetConfigRequest,
	GRPCEndpoint
} from "../proto/dcrwalletgui_pb"
import { endpointFactory } from "./lorca"
import { rawToHex } from "../helpers/byteActions";
import { AppError } from "../store/types";


const w = (window as any)

const AppBackend = {
	fetchAppConfig: async function (decryptionKey: string) {

		try {
			const r = await w.walletgui__GetConfig(decryptionKey)
			if (r.error != undefined) {
				throw r.error
			}
			return AppConfiguration.deserializeBinary(r.payload)
		}
		catch (e) {
			console.error("Serialization error", e)
			throw e
		}
	},

	setAppConfig: async function (appConfig: AppConfiguration, passphrase?: string) {

		const request = new SetConfigRequest()
		request.setAppConfig(appConfig)

		if (passphrase != undefined) {
			request.setPassphrase(passphrase)
		}

		const ser = rawToHex(request.serializeBinary().buffer)
		try {
			const r = await w.walletgui__SetConfig(ser)
			if (r.error != undefined) {
				throw r.error
			}
			return SetConfigResponse.deserializeBinary(r.payload)
		}
		catch (e) {
			console.error("Serialization error", e)
			return e
		}
	},

	connectWalletEndpoint: async function (endpointId: string) {

		try {
			const r = await w.walletgui__ConnectWalletEndpoint(endpointId)
			if (r.error != undefined) {
				throw r.error
			}
			return GRPCEndpoint.deserializeBinary(r.payload)
		}
		catch (err) {
			throw new AppError(0, "Cannot connect to endpoint")
		}
	},
}

export default AppBackend


