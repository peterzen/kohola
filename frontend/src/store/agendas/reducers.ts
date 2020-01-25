import {
	AgendasActionTypes, AgendasState,
	AGENDASATTEMPT, AGENDASFAILED, AGENDASSUCCESS
} from './types'
import { Agendas } from '../../models';

export const agendasInitialState: AgendasState = {
	_Agendas: new Agendas(),
	getAgendasRequest: false,
	errorAgendas: null,
}


export default function agendas(
	state: AgendasState = agendasInitialState,
	action: AgendasActionTypes) {

	switch (action.type) {
		case AGENDASATTEMPT:
			return {
				...state,
				getAgendasRequest: true,
				errorAgendas: null,
			};
		case AGENDASFAILED:
			return {
				...state,
				getAgendasRequest: false,
				errorAgendas: action.error,
			};
		case AGENDASSUCCESS:
			return {
				...state,
				getAgendasRequest: false,
				_Agendas: action.payload,
				errorAgendas: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
