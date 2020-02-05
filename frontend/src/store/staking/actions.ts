import { ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { IGetState } from '../types';
import DcrwalletDatasource from '../../datasources/dcrwallet';


import {
	StakingActionTypes,
	GETTICKETS_ATTEMPT, GETTICKETS_SUCCESS, GETTICKETS_FAILED,
	GETTICKETPRICE_ATTEMPT, GETTICKETPRICE_SUCCESS, GETTICKETPRICE_FAILED,
	AGENDASATTEMPT, AGENDASSUCCESS, AGENDASFAILED, STAKEINFOATTEMPT, STAKEINFOSUCCESS, STAKEINFOFAILED
} from './types';
import  LorcaBackend from '../../datasources/lorca';


export const loadTicketsAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, StakingActionTypes>, getState: IGetState): Promise<any> => {
		const {
			getTicketsRequest,
			startBlockHeight,
			endBlockHeight,
			targetTicketCount } = getState().staking
		if (getTicketsRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETTICKETS_ATTEMPT });
		try {
			const resp = await LorcaBackend.fetchTickets(startBlockHeight, endBlockHeight, targetTicketCount)
			dispatch({ payload: resp, type: GETTICKETS_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETTICKETS_FAILED });
		}
	}
};



export const loadTicketPriceAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, StakingActionTypes>, getState: IGetState): Promise<any> => {
		const { getTicketPriceRequest } = getState().staking
		if (getTicketPriceRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETTICKETPRICE_ATTEMPT });
		try {
			const resp = await LorcaBackend.fetchTicketPrice()
			dispatch({ type: GETTICKETPRICE_SUCCESS, payload: resp });
		}
		catch (error) {
			dispatch({ error, type: GETTICKETPRICE_FAILED });
		}
	}
};




export const loadAgendasAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, StakingActionTypes>, getState: IGetState): Promise<any> => {

		const { getAgendasRequest } = getState().staking;

		if (getAgendasRequest) {
			return Promise.resolve();
		}

		dispatch({ type: AGENDASATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchAgendas()
			dispatch({ type: AGENDASSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: AGENDASFAILED });
		}
	}
};




export const loadStakeInfoAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, StakingActionTypes>, getState: IGetState): Promise<any> => {

		const { getStakeInfoRequest } = getState().staking;

		if (getStakeInfoRequest) {
			return Promise.resolve();
		}

		dispatch({ type: STAKEINFOATTEMPT });
		try {
			const resp = await LorcaBackend.fetchStakeInfo()
			dispatch({ type: STAKEINFOSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: STAKEINFOFAILED });
		}
	}
};
