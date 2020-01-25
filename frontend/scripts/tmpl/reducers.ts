import {
	__CAMELCASE__ActionTypes, __CAMELCASE__State,
	__UPCASE__ATTEMPT, __UPCASE__FAILED, __UPCASE__SUCCESS
} from './types'
import { __CAMELCASE__ } from '../../models';

export const __LCASE__InitialState: __CAMELCASE__State = {
	__LCASECAMEL__: new __CAMELCASE__(),
	get__CAMELCASE__Request: false,
	error__CAMELCASE__: null,
}


export default function __LCASE__(
	state: __CAMELCASE__State = __LCASE__InitialState,
	action: __CAMELCASE__ActionTypes) {

	switch (action.type) {
		case __UPCASE__ATTEMPT:
			return {
				...state,
				get__CAMELCASE__Request: true,
				error__CAMELCASE__: null,
			};
		case __UPCASE__FAILED:
			return {
				...state,
				get__CAMELCASE__Request: false,
				error__CAMELCASE__: action.error,
			};
		case __UPCASE__SUCCESS:
			return {
				...state,
				get__CAMELCASE__Request: false,
				__LCASECAMEL__: action.payload,
				error__CAMELCASE__: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
