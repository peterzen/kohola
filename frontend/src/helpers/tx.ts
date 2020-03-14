import { DecodedrawTx, DecodedRawTxInput, DecodedRawTxOutput } from "../api/models";
import { Uint64LE } from "int64-buffer";

export const decodeRawTransaction = (rawTx: Buffer): DecodedrawTx => {

	const tx = new DecodedrawTx()
	let position = 0;
	tx.version = rawTx.readUInt32LE(position);
	position += 4;
	let first = rawTx.readUInt8(position);
	position += 1;
	switch (first) {
		case 0xFD:
			tx.numInputs = rawTx.readUInt16LE(position);
			position += 2;
			break;
		case 0xFE:
			tx.numInputs = rawTx.readUInt32LE(position);
			position += 4;
			break;
		default:
			tx.numInputs = first;
	}
	for (let i = 0; i < tx.numInputs; i++) {
		let input = new DecodedRawTxInput()
		input.prevTxId = rawTx.slice(position, position + 32);
		position += 32;
		input.outputIndex = rawTx.readUInt32LE(position);
		position += 4;
		input.outputTree = rawTx.readUInt8(position);
		position += 1;
		input.sequence = rawTx.readUInt32LE(position);
		position += 4;
		tx.inputs.push(input);
	}

	first = rawTx.readUInt8(position);
	position += 1;
	switch (first) {
		case 0xFD:
			tx.numOutputs = rawTx.readUInt16LE(position);
			position += 2;
			break;
		case 0xFE:
			tx.numOutputs = rawTx.readUInt32LE(position);
			position += 4;
			break;
		default:
			tx.numOutputs = first;
	}

	for (let j = 0; j < tx.numOutputs; j++) {
		let output = new DecodedRawTxOutput()
		output.value = new Uint64LE(rawTx.slice(position, position + 8)).toNumber();
		position += 8;
		output.version = rawTx.readUInt16LE(position);
		position += 2;
		// check length of scripts
		let scriptLen;
		first = rawTx.readUInt8(position);
		position += 1;
		switch (first) {
			case 0xFD:
				scriptLen = rawTx.readUInt16LE(position);
				position += 2;
				break;
			case 0xFE:
				scriptLen = rawTx.readUInt32LE(position);
				position += 4;
				break;
			default:
				scriptLen = first;
		}
		output.script = rawTx.slice(position, position + scriptLen);
		position += scriptLen;
		tx.outputs.push(output);
	}

	tx.lockTime = rawTx.readUInt32LE(position);
	position += 4;
	tx.expiry = rawTx.readUInt32LE(position);
	position += 4;
	return tx;
};
