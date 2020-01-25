import {
	LoadActiveDataFiltersActionTypes, LoadActiveDataFiltersState,
	LOADACTIVEDATAFILTERSATTEMPT, LOADACTIVEDATAFILTERSFAILED, LOADACTIVEDATAFILTERSSUCCESS
} from './types'
import { LoadActiveDataFilters } from '../../models';

export const loadactivedatafiltersInitialState: LoadActiveDataFiltersState = {
	_LoadActiveDataFilters: new LoadActiveDataFilters(),
	getLoadActiveDataFiltersRequest: false,
	errorLoadActiveDataFilters: null,
}


export default function loadactivedatafilters(
	state: LoadActiveDataFiltersState = loadactivedatafiltersInitialState,
	action: LoadActiveDataFiltersActionTypes) {

	switch (action.type) {
		case LOADACTIVEDATAFILTERSATTEMPT:
			return {
				...state,
				getLoadActiveDataFiltersRequest: true,
				errorLoadActiveDataFilters: null,
			};
		case LOADACTIVEDATAFILTERSFAILED:
			return {
				...state,
				getLoadActiveDataFiltersRequest: false,
				errorLoadActiveDataFilters: action.error,
			};
		case LOADACTIVEDATAFILTERSSUCCESS:
			return {
				...state,
				getLoadActiveDataFiltersRequest: false,
				_LoadActiveDataFilters: action.payload,
				errorLoadActiveDataFilters: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
