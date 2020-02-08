import {
	AppConfigurationActionTypes,
	SETCONFIG_ATTEMPT, SETCONFIG_FAILED, SETCONFIG_SUCCESS, GETCONFIG_SUCCESS, IAppConfigurationState, GETCONFIG_NEEDS_SETUP
} from './types'
import { AppConfiguration, RPCEndpoint, GRPCEndpoint } from '../../proto/dcrwalletgui_pb';

export const appConfigurationInitialState: IAppConfigurationState = {
	appConfig: undefined,
	needSetup: false,
	setConfigAttempting: false,
	setConfigError: undefined
}

export default function appconfiguration(
	state: IAppConfigurationState = appConfigurationInitialState,
	action: AppConfigurationActionTypes) {

	switch (action.type) {
		case SETCONFIG_ATTEMPT:
			return {
				...state,
			};
		case SETCONFIG_FAILED:
			return {
				...state,
				setConfigError: action.error
			};
		case SETCONFIG_SUCCESS:
			return {
				...state,
				setConfigAttempting: false,
				setConfigError: undefined,
				needSetup: false,
			};
		case GETCONFIG_SUCCESS:
			return {
				...state,
				appConfig: action.payload
			};
		case GETCONFIG_NEEDS_SETUP:
			const appConfig = state.appConfig || new AppConfiguration()
			if (!appConfig.hasDcrdHost()) appConfig.setDcrdHost(new RPCEndpoint())
			if (!appConfig.getDcrwalletHostsList().length) appConfig.addDcrwalletHosts(new GRPCEndpoint())
			return {
				...state,
				needSetup: true,
				appConfig: appConfig
			};
		default:
			return state;
	}
}
