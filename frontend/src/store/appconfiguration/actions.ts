import { Dispatch, ActionCreator } from 'redux';


import {
	AppConfigurationActionTypes,
	SETCONFIG_ATTEMPT, SETCONFIG_SUCCESS, SETCONFIG_FAILED, GETCONFIG_SUCCESS,GETCONFIG_FAILED
} from './types';

import { IGetState } from '../types';
import AppBackend from '../../datasources/appbackend';

export const getConfiguration: ActionCreator<any> = () => {

	return async (dispatch: Dispatch, getState: IGetState): Promise<any> => {
		try {
			const appConfig = await AppBackend.getAppConfig();
			dispatch({ type: GETCONFIG_SUCCESS, payload: appConfig });
		} catch (error) {
			dispatch({ error, type: GETCONFIG_FAILED });
		}
	}
}



