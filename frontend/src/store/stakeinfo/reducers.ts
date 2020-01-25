import {
	StakeInfoActionTypes, StakeInfoState,
	STAKEINFOATTEMPT, STAKEINFOFAILED, STAKEINFOSUCCESS
} from './types'
import { StakeInfo } from '../../models';

export const stakeinfoInitialState: StakeInfoState = {
	_StakeInfo: new StakeInfo(),
	getStakeInfoRequest: false,
	errorStakeInfo: null,
}


export default function stakeinfo(
	state: StakeInfoState = stakeinfoInitialState,
	action: StakeInfoActionTypes) {

	switch (action.type) {
		case STAKEINFOATTEMPT:
			return {
				...state,
				getStakeInfoRequest: true,
				errorStakeInfo: null,
			};
		case STAKEINFOFAILED:
			return {
				...state,
				getStakeInfoRequest: false,
				errorStakeInfo: action.error,
			};
		case STAKEINFOSUCCESS:
			return {
				...state,
				getStakeInfoRequest: false,
				_StakeInfo: action.payload,
				errorStakeInfo: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
