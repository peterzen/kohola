import {
	VoteChoicesActionTypes, VoteChoicesState,
	VOTECHOICESATTEMPT, VOTECHOICESFAILED, VOTECHOICESSUCCESS
} from './types'
import { VoteChoices } from '../../models';

export const votechoicesInitialState: VoteChoicesState = {
	_VoteChoices: new VoteChoices(),
	getVoteChoicesRequest: false,
	errorVoteChoices: null,
}


export default function votechoices(
	state: VoteChoicesState = votechoicesInitialState,
	action: VoteChoicesActionTypes) {

	switch (action.type) {
		case VOTECHOICESATTEMPT:
			return {
				...state,
				getVoteChoicesRequest: true,
				errorVoteChoices: null,
			};
		case VOTECHOICESFAILED:
			return {
				...state,
				getVoteChoicesRequest: false,
				errorVoteChoices: action.error,
			};
		case VOTECHOICESSUCCESS:
			return {
				...state,
				getVoteChoicesRequest: false,
				_VoteChoices: action.payload,
				errorVoteChoices: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
