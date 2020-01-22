import { WalletPing } from "../../models";


export interface PingState {
  readonly getPingResponse: WalletPing|null,
  readonly getPingError: string,
  readonly getPingRequestAttempt: boolean,
  readonly pingTimer: NodeJS.Timeout | null
}

export const GETPING_ATTEMPT = 'GETPING_ATTEMPT'
export const GETPING_FAILED = 'GETPING_FAILED'
export const GETPING_SUCCESS = 'GETPING_SUCCESS'
export const GETPING_CANCELED = 'GETPING_CANCELED'

export interface PingAttemptAction {
  type: typeof GETPING_ATTEMPT
}

export interface PingFailedAction {
  type: typeof GETPING_FAILED,
  error: object,
  pingTimer: NodeJS.Timeout,
}

export interface PingSuccessAction {
  type: typeof GETPING_SUCCESS,
  pingTimer: NodeJS.Timeout,
  getPingResponse: WalletPing,
}

export interface PingCanceledAction {
  type: typeof GETPING_CANCELED
}

export type PingActionTypes = PingAttemptAction | PingFailedAction | PingSuccessAction | PingCanceledAction;
