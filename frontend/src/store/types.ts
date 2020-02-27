
import { grpc } from "@improbable-eng/grpc-web";
import { sprintf } from "sprintf-js";

import { IApplicationState } from "./store";

export type AppError = {
	status: number | typeof grpc.Code,
	msg: string
}

export class GenericError {
	public code: number
	public msg: string
	constructor(code: number, msg: string) {
		this.code = code
		this.msg = msg
	}
	toString() {
		return sprintf("[%d] %s", this.code, this.msg)
	}
}

export interface IGetState {
	(): IApplicationState
}


export interface ILorcaMessage {
	error: {
		code: number
		msg: string
	}
	payload: Uint8Array
	apayload: Uint8Array[]
}
