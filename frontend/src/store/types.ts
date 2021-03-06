import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
// @ts-ignore
import { grpc } from "@improbable-eng/grpc-web"
import { sprintf } from "sprintf-js"

import store, { rootReducer } from "./store"

interface IAppError {
    code: number | typeof grpc.Code
    message: string
}

export class AppError implements IAppError {
    public code: number
    public message: string
    constructor(code: number, message: string) {
        this.code = code
        this.message = message
    }
    toString() {
        return sprintf("[%d] %s", this.code, this.message)
    }
}

export interface IGetState {
    (): IApplicationState
}

export interface ILorcaMessage {
    error: {
        code: number
        message: string
    }
    payload: Uint8Array
    apayload: Uint8Array[]
    spayload: string
}

export type AppDispatch = typeof store.dispatch

export type IApplicationState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<
    void,
    IApplicationState,
    unknown,
    Action<string>
>
