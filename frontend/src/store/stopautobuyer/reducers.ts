import {
	StopAutoBuyerActionTypes, StopAutoBuyerState,
	STOPAUTOBUYERATTEMPT, STOPAUTOBUYERFAILED, STOPAUTOBUYERSUCCESS
} from './types'
import { StopAutoBuyer } from '../../models';

export const stopautobuyerInitialState: StopAutoBuyerState = {
	_StopAutoBuyer: new StopAutoBuyer(),
	getStopAutoBuyerRequest: false,
	errorStopAutoBuyer: null,
}


export default function stopautobuyer(
	state: StopAutoBuyerState = stopautobuyerInitialState,
	action: StopAutoBuyerActionTypes) {

	switch (action.type) {
		case STOPAUTOBUYERATTEMPT:
			return {
				...state,
				getStopAutoBuyerRequest: true,
				errorStopAutoBuyer: null,
			};
		case STOPAUTOBUYERFAILED:
			return {
				...state,
				getStopAutoBuyerRequest: false,
				errorStopAutoBuyer: action.error,
			};
		case STOPAUTOBUYERSUCCESS:
			return {
				...state,
				getStopAutoBuyerRequest: false,
				_StopAutoBuyer: action.payload,
				errorStopAutoBuyer: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
