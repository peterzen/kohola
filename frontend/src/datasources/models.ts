export class DecodedRawTxInput {
	prevTxId: Buffer
	outputIndex: number
	outputTree: number
	sequence: number
	numOutputs: number
}

export class DecodedRawTxOutput {
	value: number
	version: number
	script: Buffer
}

export class DecodedrawTx {
	version: number
	numInputs: number
	numOutputs: number
	inputs: DecodedRawTxInput[] = []
	outputs: DecodedRawTxOutput[] = []
	lockTime: number
	expiry: number
}

export type ConstructTxOutput = {
	destination: string
	amount: number
}
