import { AppError } from "../types";
import { AppConfiguration } from "../../proto/dcrwalletgui_pb";


export const SETCONFIG_ATTEMPT = 'SETCONFIG_ATTEMPT'
export const SETCONFIG_FAILED = 'SETCONFIG_FAILED'
export const SETCONFIG_SUCCESS = 'SETCONFIG_SUCCESS'
export const GETCONFIG_SUCCESS = 'GETCONFIG_SUCCESS'
export const GETCONFIG_FAILED = 'GETCONFIG_FAILED'

export interface IAppConfigurationState  {
	appConfig?: AppConfiguration
	setConfigAttempting: boolean
}

export interface SetConfigAttemptAction {
	type: typeof SETCONFIG_ATTEMPT,
}

export interface SetConfigFailedAction {
	type: typeof SETCONFIG_FAILED,
}

export interface SetConfigSuccessAction {
	type: typeof SETCONFIG_SUCCESS,
}

export interface GetConfigSuccessAction {
	type: typeof GETCONFIG_SUCCESS,
	payload: AppConfiguration
}

export interface GetConfigFailedAction {
	type: typeof GETCONFIG_FAILED,
}

export type AppConfigurationActionTypes =
	SetConfigAttemptAction |
	SetConfigFailedAction |
	SetConfigSuccessAction |
	GetConfigSuccessAction |
	GetConfigFailedAction
