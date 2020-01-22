
import { 
  PingActionTypes, PingState, 
  GETPING_ATTEMPT, GETPING_FAILED, GETPING_SUCCESS, GETPING_CANCELED 
} from './types'

export const initialState: PingState = {
  getPingResponse: null,
  getPingError: "",
  getPingRequestAttempt: false,
  pingTimer: null
}


export default function ping(
  state: PingState = initialState,
  action: PingActionTypes) {

  switch (action.type) {
    case GETPING_ATTEMPT:
      return {
        ...state,
        getPingError: "",
        getPingRequestAttempt: true,
        pingTimer: null
      };
    case GETPING_FAILED:
      return {
        ...state,
        getPingResponse: null,
        getPingError: String(action.error),
        getPingRequestAttempt: false,
        pingTimer: action.pingTimer
      };
    case GETPING_SUCCESS:
      return {
        ...state,
        getPingError: "",
        getPingRequestAttempt: false,
        getPingResponse: action.getPingResponse,
        pingTimer: action.pingTimer
      };
    case GETPING_CANCELED:
      return {
        ...state,
        getPingError: "",
        getPingRequestAttempt: false,
        getPingResponse: null,
        pingTimer: null
      };
    default:
      return state;
  }
}