import {
	AppConfigurationActionTypes,
	SETCONFIG_ATTEMPT, SETCONFIG_FAILED, SETCONFIG_SUCCESS, GETCONFIG_SUCCESS, IAppConfigurationState
} from './types'

export const appConfigurationInitialState: IAppConfigurationState = {
	appConfig: undefined,
	setConfigAttempting: false
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
			};
		case SETCONFIG_SUCCESS:
			return {
				...state,
			};
		case GETCONFIG_SUCCESS:
			return {
				...state,
				appConfig: action.payload
			};
		default:
			return state;
	}
}
