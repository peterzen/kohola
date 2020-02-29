
// @ts-ignore
import createBlakeHash from 'blake-hash/js';
// @ts-ignore
import bs58checkBase from 'bs58check/base'

import { Configuration, Networks } from '../constants';
import { GenericError } from '../store/types';


function _blake256x2(buffer: string) {
	buffer = createBlakeHash("blake256")
		.update(buffer)
		.digest();
	return createBlakeHash("blake256")
		.update(buffer)
		.digest();
}



const ERR_INVALID_MASTER_PUB_KEY = "ERR_INVALID_MASTER_PUB_KEY";
const ERR_INVALID_MASTERPUB_CHECKSUM = "ERR_INVALID_MASTERPUB_CHECKSUM";

export function isValidMasterPubKey(masterPubKey: string) {
	if (!masterPubKey || !masterPubKey.trim().length) return ERR_INVALID_MASTER_PUB_KEY;
	try {
		var bs58check = bs58checkBase(_blake256x2);
		bs58check.decode(masterPubKey, _blake256x2);
	} catch (error) {
		return ERR_INVALID_MASTERPUB_CHECKSUM;
	}

	return null;
}


export enum ValidationErrorCodes {
	ERR_INVALID_ADDR_EMPTY = 0,
	ERR_INVALID_ADDR_TOOSHORT,
	ERR_INVALID_ADDR_TOOLONG,
	ERR_INVALID_ADDR_NETWORKPREFIX,
	ERR_INVALID_ADDR_CHECKSUM,
	ERR_INVALID_ADDR_FORMAT
}

export const ValidationErrors ={
	0: "Empty address",
	1: "Address too short",
	2: "Address too long",
	3: "Invalid network prefix",
	4: "Invalid address checksum",
	5: "Invalid address format",
}



export function isValidAddress(address: string):GenericError | null {

	const err = (code:  ValidationErrorCodes) =>  new GenericError(code as unknown as number, ValidationErrors[code])

	address = address.trim();
	if (!address.length) return err(ValidationErrorCodes.ERR_INVALID_ADDR_EMPTY)
	if (address.length < 25) return err(ValidationErrorCodes.ERR_INVALID_ADDR_TOOSHORT)
	if (address.length > 36) return err(ValidationErrorCodes.ERR_INVALID_ADDR_TOOLONG)

	let formV = null;
	switch (Configuration.CurrentNetwork) {
		case Networks.MAINNET:
			formV = address.match(/^Ds[a-zA-Z0-9]{25,35}$/)
			break;
		case Networks.TESTNET:
			formV = address.match(/^Ts[a-zA-Z0-9]{25,35}$/)
			break;
		case Networks.SIMNET:
			formV = address.match(/^Ss[a-zA-Z0-9]{25,35}$/)
			break;
	}

	if (formV === null) {
		return err(ValidationErrorCodes.ERR_INVALID_ADDR_FORMAT)
	}

	try {
		const bs58check = bs58checkBase(_blake256x2);
		bs58check.decode(address, _blake256x2);
	} catch (error) {
		return err(ValidationErrorCodes.ERR_INVALID_ADDR_CHECKSUM)
	}

	return null;
}
