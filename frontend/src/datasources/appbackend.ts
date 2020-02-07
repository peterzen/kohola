import { AppConfiguration, SetConfigResponse } from "../proto/dcrwalletgui_pb"
import { endpointFactory } from "./lorca"


const w = (window as any)



const AppBackend = {

	getAppConfig: endpointFactory("walletgui__GetConfig", AppConfiguration),
	setAppConfig: endpointFactory("walletgui__SetConfig", SetConfigResponse),
}

export default AppBackend


