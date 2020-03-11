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
	fetchAppConfig: endpointFactory("walletgui__GetConfig", AppConfiguration),

	setAppConfig: async function (appConfig: AppConfiguration) {

		const request = new SetConfigRequest()
		request.setAppConfig(appConfig)

		// TODO implement config file encryption with passphrase 
		// request.setPassphrase(passphrase)
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

	connectWalletEndpoint: async function (endpoint: GRPCEndpoint) {

		try {
			const err = await w.walletgui__ConnectWalletEndpoint(endpoint.getId())
		}
		catch (err) {
			throw new AppError(0, err)
		}
	},
}

export default AppBackend


