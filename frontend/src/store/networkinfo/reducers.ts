import {
	NetworkInfoActionTypes, INetworkInfoState,
	GETBESTBLOCK_ATTEMPT, GETBESTBLOCK_FAILED, GETBESTBLOCK_SUCCESS,
	NETWORKATTEMPT, NETWORKFAILED, NETWORKSUCCESS
} from './types'
import { BestBlock, Network } from '../../models';

export const networkInfoInitialState: INetworkInfoState = {
	// BestBlock
	currentBlock: new BestBlock(),
	getBestBlockHeightRequest: false,
	periodicTimer: null,

	// Network
	network: new Network(),
	getNetworkRequest: false,
	errorNetwork: null,
}


export default function bestblock(
	state: INetworkInfoState = networkInfoInitialState,
	action: NetworkInfoActionTypes) {

	switch (action.type) {
		// BestBlock
		case GETBESTBLOCK_ATTEMPT:
			return {
				...state,
				getBestBlockHeightRequest: true,
			};
		case GETBESTBLOCK_FAILED:
			return {
				...state,
				getBestBlockHeightRequest: false,
			};
		case GETBESTBLOCK_SUCCESS:
			return {
				...state,
				getBestBlockHeightRequest: false,
				currentBlock: action.payload,
				periodicTimer: action.periodicTimer
			};
		// Network
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
				network: action.payload,
				errorNetwork: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
