import {
	NetworkActionTypes, NetworkState,
	NETWORKATTEMPT, NETWORKFAILED, NETWORKSUCCESS
} from './types'
import { Network } from '../../models';

export const networkInitialState: NetworkState = {
	_Network: new Network(),
	getNetworkRequest: false,
	errorNetwork: null,
}


export default function network(
	state: NetworkState = networkInitialState,
	action: NetworkActionTypes) {

	switch (action.type) {
		case NETWORKATTEMPT:
			return {
				...state,
				getNetworkRequest: true,
				errorNetwork: null,
			};
		case NETWORKFAILED:
			return {
				...state,
				getNetworkRequest: false,
				errorNetwork: action.error,
			};
		case NETWORKSUCCESS:
			return {
				...state,
				getNetworkRequest: false,
				_Network: action.payload,
				errorNetwork: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
