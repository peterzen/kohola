import { AppConfiguration, SetConfigResponse, CanStartupResponse, SetConfigRequest } from "../proto/dcrwalletgui_pb"
import { endpointFactory } from "./lorca"
import { rawToHex } from "../helpers/byteActions";


const w = (window as any)

const AppBackend = {
	getAppConfig: endpointFactory("walletgui__GetConfig", AppConfiguration),
	canStartup: endpointFactory("walletgui__CanStartup", CanStartupResponse),

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
}

export default AppBackend


