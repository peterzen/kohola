import { AppError } from "../types";
import { AppConfiguration } from "../../proto/dcrwalletgui_pb";


export const SETCONFIG_ATTEMPT = 'SETCONFIG_ATTEMPT'
export const SETCONFIG_FAILED = 'SETCONFIG_FAILED'
export const SETCONFIG_SUCCESS = 'SETCONFIG_SUCCESS'
export const GETCONFIG_SUCCESS = 'GETCONFIG_SUCCESS'
export const GETCONFIG_FAILED = 'GETCONFIG_FAILED'
export const GETCONFIG_NEEDS_SETUP = 'GETCONFIG_NEEDS_SETUP'

export interface IAppConfigurationState {
	needSetup: boolean,
	appConfig?: AppConfiguration
	setConfigAttempting: boolean
	setConfigError?: AppError
}

export interface SetConfigAttemptAction {
	type: typeof SETCONFIG_ATTEMPT,
	setConfigAttempting: true
}

export interface SetConfigFailedAction {
	type: typeof SETCONFIG_FAILED,
	setConfigAttempting: false,
	error: AppError
}

export interface SetConfigSuccessAction {
	type: typeof SETCONFIG_SUCCESS,
	setConfigAttempting: false,
}

export interface GetConfigSuccessAction {
	type: typeof GETCONFIG_SUCCESS,
	payload: AppConfiguration
}

export interface GetConfigFailedAction {
	type: typeof GETCONFIG_FAILED,
}

export interface HaveConfigNeedsSetup {
	type: typeof GETCONFIG_NEEDS_SETUP,
}



export type AppConfigurationActionTypes =
	SetConfigAttemptAction |
	SetConfigFailedAction |
	SetConfigSuccessAction |
	GetConfigSuccessAction |
	GetConfigFailedAction |
	HaveConfigNeedsSetup
