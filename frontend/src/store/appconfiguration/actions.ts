import { Dispatch, ActionCreator } from 'redux';


import {
	AppConfigurationActionTypes,
	SETCONFIG_ATTEMPT, SETCONFIG_SUCCESS, SETCONFIG_FAILED, GETCONFIG_SUCCESS, GETCONFIG_FAILED, GETCONFIG_NEEDS_SETUP
} from './types';

import AppBackend from '../../datasources/appbackend';
import { IGetState, ILorcaMessage } from '../types';
import { AppConfiguration } from '../../proto/dcrwalletgui_pb';
import { ConstructTransactionRequest, ConstructTransactionResponse } from '../../proto/api_pb';
import { rawToHex } from '../../helpers/byteActions';
import { initializeData } from '../actions';

export const getConfiguration: ActionCreator<any> = () => {

	return async (dispatch: Dispatch) => {
		try {
			const appConfig = await AppBackend.getAppConfig();
			dispatch({ type: GETCONFIG_SUCCESS, payload: appConfig });
		}
		catch (error) {
			dispatch({ error, type: GETCONFIG_FAILED });
		}
	}
}


export const saveConfigurationAttempt: ActionCreator<any> = (appConfig: AppConfiguration) => {

	return async (dispatch: Dispatch, getState: IGetState) => {

		const { setConfigAttempting } = getState().appconfiguration

		if (setConfigAttempting == true) {
			return
		}
		dispatch({ type: SETCONFIG_ATTEMPT });
		try {
			const response = await AppBackend.setAppConfig(appConfig)
			dispatch({ type: SETCONFIG_SUCCESS, payload: response })
			await dispatch(getConfiguration())
			await dispatch(initializeData())
		}
		catch (error) {
			dispatch({ type: SETCONFIG_FAILED, error: error })
		}
	}
}


export const canStartup: ActionCreator<any> = () => {
	return async (dispatch: Dispatch) => {
		try {
			const r = await AppBackend.canStartup();
			if (r.getNeedsSetup() == true) {
				dispatch({ type: GETCONFIG_NEEDS_SETUP });
			}
		}
		catch (error) {
			dispatch({ error, type: GETCONFIG_FAILED });
		}
	}
}
