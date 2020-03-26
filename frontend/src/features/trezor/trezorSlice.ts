import _ from 'lodash';
import { sprintf } from 'sprintf-js';
import { createSlice, ActionCreator, PayloadAction } from '@reduxjs/toolkit';

// @ts-ignore
import * as trezorjs from "trezor.js"

// @ts-ignore
import Transports from 'trezor-link'
var BridgeTransportV2 = Transports.BridgeV2

// @ts-ignore
import { messages, model1_decred_homescreen } from './constants'

import { AppError, AppDispatch, IGetState, AppThunk, IApplicationState } from '../../store/types'
import { addressPath, WALLET_ACCOUNT, accountPath } from './helpers';
import { publishTransactionAttempt } from '../transactions/transactionsSlice';
import { hexToRaw, str2utf8hex, hex2b64, rawHashToHex, rawToHex } from '../../helpers/byteActions';
import { ConstructTransactionResponse } from '../../proto/api_pb';

interface TrezorDevice {

}


export interface ITrezorState {
	readonly error: AppError | null
	readonly debug: boolean
	readonly device: TrezorDevice | null
	readonly enabled: boolean
	readonly deviceList: any | null
	readonly transportError: AppError | null
	readonly performingOperation: boolean
	readonly getDeviceListAttempting: boolean

	readonly waitingForPin: boolean
	readonly pinCallBack: DeviceInteractionCallback | null
	readonly pinMessage: string | null

	readonly waitingForPassPhrase: boolean
	readonly passPhraseCallBack: DeviceInteractionCallback | null

	readonly waitingForWord: boolean
	readonly wordCallBack: DeviceInteractionCallback | null

	readonly walletCreationMasterPubkeyAttempting: boolean
}



export const initialState: ITrezorState = {
	error: null,
	debug: true,
	device: null,
	enabled: false,
	deviceList: null,
	transportError: null,
	performingOperation: false,
	getDeviceListAttempting: false,

	pinMessage: "",
	pinCallBack: null,
	waitingForPin: false,

	passPhraseCallBack: null,
	waitingForPassPhrase: false,

	wordCallBack: null,
	waitingForWord: false,

	walletCreationMasterPubkeyAttempting: false,
}


const trezorSlice = createSlice({
	name: "trezorSlice",
	initialState,
	reducers: {
		setPerformingOperation(state, action: PayloadAction<boolean>) {
			state.performingOperation = action.payload
		},
		setTrezorError(state, action: PayloadAction<AppError | null>) {
			state.error = action.payload
		},
		setTrezorState(state, action: PayloadAction<boolean>) {
			state.enabled = action.payload
		},
		clearDeviceList(state) {
			state.deviceList = null
			state.transportError = null
			state.device = null
			state.getDeviceListAttempting = false
		},

		clearDeviceSessionSuccess(state, action: PayloadAction<any>) {
			// TODO
		},
		clearDeviceSessionFailed(state, action: PayloadAction<AppError>) {
			// TODO
		},

		loadDeviceListAttempt(state) {
			state.getDeviceListAttempting = true
			state.deviceList = null
			state.transportError = null
		},
		loadDeviceListSuccess(state, action: PayloadAction<TrezorDevice[]>) {
			state.getDeviceListAttempting = false
			state.deviceList = action.payload
			state.transportError = null

		},
		selectedDeviceChanged(state, action: PayloadAction<TrezorDevice | null>) {
			state.device = action.payload
		},
		loadDeviceListFailed(state, action: PayloadAction<AppError>) {
			state.getDeviceListAttempting = false
			state.deviceList = null
			state.transportError = action.payload
		},
		loadDeviceListTransportLost(state, action: PayloadAction<AppError>) {
			state.device = null
			state.deviceList = null
			state.transportError = action.payload
			state.performingOperation = false
			state.getDeviceListAttempting = false
		},

		pinRequested(state, action: PayloadAction<DeviceInteractionAction>) {
			state.waitingForPin = true
			state.pinCallBack = action.payload.callback
			state.pinMessage = action.payload.message || null
			state.performingOperation = true
		},
		pinCompleted(state) {
			state.waitingForPin = false
			state.pinCallBack = null
			state.pinMessage = null
			state.performingOperation = false
		},

		passphraseRequested(state, action: PayloadAction<DeviceInteractionAction>) {
			state.waitingForPassPhrase = true
			state.passPhraseCallBack = action.payload.callback
			state.performingOperation = true
		},
		passphraseCompleted(state) {
			state.waitingForPassPhrase = false
			state.passPhraseCallBack = null
			state.performingOperation = false
		},

		wordRequested(state, action: PayloadAction<DeviceInteractionAction>) {
			state.waitingForWord = true
			state.wordCallBack = action.payload.callback
			state.performingOperation = true
		},
		wordEntered(state) {
			state.waitingForWord = false
			state.wordCallBack = null
			state.performingOperation = false
		},

		cancelOperationSuccess(state) {
			state.waitingForPin = false
			state.pinCallBack = null
			state.pinMessage = null
			state.wordCallBack = null
			state.waitingForPassPhrase = false
			state.passPhraseCallBack = null
			state.performingOperation = false
			state.waitingForWord = false
		},
		cancelOperationFailed(state, action: PayloadAction<AppError>) {

		},

		getWalletCreationMasterPubkeyCompleted(state) {
			state.walletCreationMasterPubkeyAttempting = false
		},
	}
})

export const {
	setPerformingOperation,
	setTrezorError,
	setTrezorState,
	clearDeviceList,
	clearDeviceSessionSuccess,
	clearDeviceSessionFailed,

	loadDeviceListAttempt,
	loadDeviceListSuccess,
	loadDeviceListFailed,
	loadDeviceListTransportLost,
	selectedDeviceChanged,

	pinRequested,
	pinCompleted,

	passphraseRequested,
	passphraseCompleted,

	wordRequested,
	wordEntered,

	cancelOperationSuccess,
	getWalletCreationMasterPubkeyCompleted,

} = trezorSlice.actions

export default trezorSlice.reducer



// actions

// export const TRZ_TREZOR_ENABLED = "TRZ_TREZOR_ENABLED";
export const enableTrezor: ActionCreator<any> = (): AppThunk => {

	return async (dispatch: AppDispatch, getState: IGetState) => {

		// @TODO
		// const walletName = selectors.getWalletName(getState());

		// if (walletName) {
		// 	const config = getWalletCfg(selectors.isTestNet(getState()), walletName);
		// 	config.set("trezor", true);
		// }

		dispatch(setTrezorState(true))

		const { deviceList, getDeviceListAttempting } = getState().trezor
		if (!deviceList && !getDeviceListAttempting) {
			dispatch(loadDeviceList())
		}
	}
}

export const disableTrezor: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		dispatch(clearDeviceSession())
		dispatch(setTrezorState(false))
	}
}

export const reloadTrezorDeviceList: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		dispatch(clearDeviceList())
		dispatch(loadDeviceList())
	}
}


export const loadDeviceList: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		return new Promise((resolve, reject) => {

			const { debug, getDeviceListAttempting } = getState().trezor
			if (getDeviceListAttempting) return

			dispatch(loadDeviceListAttempt());

			// Convert the protocol buffers definition (i.e. the messages of the comm
			// protocol to the bridge/device) to a string so that the transport can be
			// configured with it.
			const config = JSON.stringify(messages);

			// BridgeTransportV2.setFetch(fetch, true)
			const transport = new BridgeTransportV2(null, null, null)
			const opts = {
				debug,
				debugInfo: debug,
				config,
				transport
			}
			const deviceList = new trezorjs.DeviceList(opts)

			console.log("DEVLIST", deviceList)
			let resolvedTransport = false;

			deviceList.on("transport", t => {
				debug && console.log("transport", t);
				if (resolvedTransport) return;
				resolvedTransport = true; // resolved with success
				dispatch(loadDeviceListSuccess(deviceList));
				resolve(t);
			});

			deviceList.on("error", err => {
				debug && console.error("trezor", err);
				if (!resolvedTransport && err.message.includes("ECONNREFUSED")) {
					resolvedTransport = true; // resolved with failure
					const appError = new AppError(50, "Failed to connect to trezor bridge.")
					dispatch(loadDeviceListFailed(appError))
					reject(appError)
				} else if (err.message.includes("socket hang up")) {
					// this might happen any time throughout the app lifetime if the bridge
					// service is shutdown for any reason
					const error = new AppError(50, "trezor bridge shut down")
					dispatch(loadDeviceListTransportLost(error))
					dispatch(setTrezorError(error))
					// dispatch({ error: err.message, type: TRZ_DEVICELISTTRANSPORT_LOST });
				} else {
					const appError = new AppError(50, "Failed to connect to trezor bridge.")
					dispatch(setTrezorError(appError))
				}
			});

			deviceList.on("connect", device => {
				debug && console.log("connect", Object.keys(deviceList.devices), device);
				const currentDevice = getState().trezor.device;
				if (!currentDevice) {
					// first device connected. Use it.
					dispatch(selectedDeviceChanged(device))
					dispatch(setTrezorError(null))
					// dispatch({ device, type: TRZ_SELECTEDDEVICE_CHANGED });
					setDeviceListeners(device, dispatch)
				}
			});

			deviceList.on("disconnect", device => {
				debug && console.log("disconnect", Object.keys(deviceList.devices), device);
				const currentDevice = getState().trezor.device;
				if (currentDevice && device.originalDescriptor.path === currentDevice.originalDescriptor.path) {
					const devicePaths = Object.keys(deviceList.devices);

					// we were using the device that was just disconnected. Pick a new
					// device to use.
					if (devicePaths.length === 0) {
						// no more devices left to use
						dispatch(selectedDeviceChanged(null))
						// dispatch({ device: null, type: TRZ_SELECTEDDEVICE_CHANGED });
					} else {
						console.log("ondisconnect ", deviceList.devices[devicePaths[0]])
						dispatch(selectedDeviceChanged(deviceList.devices[devicePaths[0]]))
						// dispatch({ device: deviceList.devices[devicePaths[0]], type: TRZ_SELECTEDDEVICE_CHANGED });
					}
				}
			});

			deviceList.on("connectUnacquired", device => {
				debug && console.log("connect unacquired", device);
			})

			deviceList.on("disconnectUnacquired", device => {
				debug && console.log("d.catch(error => dispatch({ error, type: SIGNTX_FAILED }));isconnect unacquired", device);
			})

		})
	}
}

// export const selectDevice = (path) => async (dispatch, getState) => {
// 	const devList = getState().trezor.deviceList;
// 	if (!devList.devices[path]) return;
// 	dispatch({ device: devList.devices[path], type: TRZ_SELECTEDDEVICE_CHANGED });
// 	setDeviceListeners(devList.devices[path], dispatch);
// };

// @TODO wire this up to toast notifications
export const alertNoConnectedDevice: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		// dispatch({ type: TRZ_NOCONNECTEDDEVICE });
	}
}

type DeviceInteractionCallback = (status: string | null, value: string | null) => void

interface DeviceInteractionAction {
	callback: DeviceInteractionCallback
	message?: string
}

function setDeviceListeners(device, dispatch: AppDispatch) {

	device.on("pin", (pinMessage: string, pinCallBack: DeviceInteractionCallback) => {
		dispatch(pinRequested({
			message: pinMessage,
			callback: pinCallBack,
		}))
		// dispatch({ pinMessage, pinCallBack, type: TRZ_PIN_REQUESTED });
	})

	device.on("passphrase", (passPhraseCallBack: DeviceInteractionCallback) => {
		dispatch(passphraseRequested({
			callback: passPhraseCallBack
		}))
		// dispatch({ passPhraseCallBack, type: TRZ_PASSPHRASE_REQUESTED });
	})

	device.on("word", (wordCallBack: DeviceInteractionCallback) => {
		dispatch(wordRequested({
			callback: wordCallBack
		}))
		// dispatch({ wordCallBack, type: TRZ_WORD_REQUESTED });
	})
}

// deviceRun is the main function for executing trezor operations. This handles
// cleanup for cancellations and device disconnections during mid-operation (eg:
// someone disconnected trezor while it was waiting for a pin input).
// In general, fn itself shouldn't handle errors, letting this function handle
// the common cases, which are then propagated up the call stack into fn's
// parent.
export const deviceRun: ActionCreator<any> = (device, fn): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const handleError = error => {
			const { waitingForPin, waitingForPassPhrase, debug } = getState().trezor
			debug && console.log("Handle error no deviceRun", error);
			if (waitingForPin) {
				// dispatch({ error, type: TRZ_PIN_CANCELED });
				dispatch(pinCompleted())
				dispatch(setTrezorError(error))
			}
			if (waitingForPassPhrase) {
				// dispatch({ error, type: TRZ_PASSPHRASE_CANCELED });
				dispatch(passphraseCompleted())
				dispatch(setTrezorError(error))
			}
			if (error instanceof Error) {
				if (error.message.includes("Inconsistent state")) {
					const appError = new AppError(50, "Device returned inconsistent state. Disconnect and reconnect the device.")
					dispatch(setTrezorError(appError))
					return appError
					// return "Device returned inconsistent state. Disconnect and reconnect the device.";
				}
			}
			dispatch(setTrezorError(error))
			return error
		}

		try {
			return await device.run(async (session: string) => {
				try {
					return await fn(session);
				} catch (err) {
					// doesn't seem to be reachable by trezor interruptions, but might be
					// caused by fn() failing in some other way (even though it's
					// recommended not to do (non-trezor) lengthy operations inside fn())
					throw handleError(err);
				}
			});
		} catch (outerErr) {
			throw handleError(outerErr);
		}
	}
}

// Note that calling this function while no pin/passphrase operation is running
// will attempt to steal the device, cancelling operations from apps *other
// than decrediton*.
export const cancelCurrentOperation: ActionCreator<any> = (): AppThunk => {

	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState());

		if (!device) return;
		const { pinCallBack, passPhraseCallBack, wordCallBack } = getState().trezor

		try {
			if (pinCallBack) await pinCallBack("cancelled", null)
			else if (passPhraseCallBack) await passPhraseCallBack("cancelled", null)
			else if (wordCallBack) await wordCallBack("cancelled", null)
			else await device.steal()

			dispatch(cancelOperationSuccess())

			// dispatch({ type: TRZ_CANCELOPERATION_SUCCESS });
		} catch (error) {
			// dispatch({ error, type: TRZ_CANCELOPERATION_FAILED });
			dispatch(setTrezorError(error))
			throw error;
		}
	}
}

// Closes a device session, locking the device (if it requires a pin).
export const clearDeviceSession: ActionCreator<any> = (): AppThunk => {

	return async (dispatch: AppDispatch, getState: IGetState) => {
		const device = trezorDevice(getState())
		if (!device) return;

		await dispatch(cancelCurrentOperation());
		try {
			await deviceRun(dispatch, getState, device, async session => {
				await session.clearSession();
			});
			// dispatch({ type: TRZ_CLEARDEVICESESSION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
		}
	}
}

export const submitPin: ActionCreator<any> = (pin: string): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		const { pinCallBack } = getState().trezor
		dispatch(pinCompleted())
		if (pinCallBack == null) return
		pinCallBack(null, pin)
	}
}

export const submitPassPhrase: ActionCreator<any> = (passphrase: string): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		const { passPhraseCallBack } = getState().trezor
		dispatch(passphraseCompleted())
		if (passPhraseCallBack == null) return
		passPhraseCallBack(null, passphrase)
	}
}

export const submitWord: ActionCreator<any> = (word: string): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		const { wordCallBack } = getState().trezor
		dispatch(wordEntered())
		if (wordCallBack == null) return
		wordCallBack(null, word)
	}
}



// checkTrezorIsDcrwallet verifies whether the wallet currently running on
// dcrwallet (presumably a watch only wallet created from a trezor provided
// xpub) is the same wallet as the one of the currently connected trezor. This
// function throws an error if they are not the same.
// This is useful for making sure, prior to performing some wallet related
// function such as transaction signing, that trezor will correctly perform the
// operation.
// Note that this might trigger pin/passphrase modals, depending on the current
// trezor configuration.
// The way the check is performed is by generating the first address from the
// trezor wallet and then validating this address agains dcrwallet, ensuring
// this is an owned address at the appropriate branch/index.
// This check is only valid for a single session (ie, a single execution of
// `deviceRun`) as the physical device might change between sessions.
export const checkTrezorIsDcrwallet: ActionCreator<any> = (session): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		// @TODO
		// const { grpc: { walletService } } = getState();
		// const chainParams = selectors.chainParams(getState());

		// const address_n = addressPath(0, 0, WALLET_ACCOUNT, chainParams.HDCoinType);
		// const resp = await session.getAddress(address_n, chainParams.trezorCoinName, false);
		// const addr = resp.message.address;

		// const addrValidResp = await wallet.validateAddress(walletService, addr);
		// if (!addrValidResp.getIsValid()) throw "Trezor provided an invalid address " + addr;

		// if (!addrValidResp.getIsMine()) throw "Trezor and dcrwallet not running from the same extended public key";

		// if (addrValidResp.getIndex() !== 0) throw "Wallet replied with wrong index.";
	}
}

export const signTransactionAttemptTrezor: ActionCreator<any> = (rawUnsigTx: string, constructTxResponse: ConstructTransactionResponse): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		// @TODO
		// dispatch({ type: SIGNTX_ATTEMPT });

		// const { grpc: { decodeMessageService, walletService }, trezor: { debug } } = getState();
		// const chainParams = selectors.chainParams(getState());

		// const device = selectors.trezorDevice(getState());
		// if (!device) {
		// 	dispatch({ error: "Device not connected", type: SIGNTX_FAILED });
		// 	return;
		// }

		// debug && console.log("construct tx response", constructTxResponse);

		// try {
		// 	const decodedUnsigTxResp = await wallet.decodeTransaction(decodeMessageService, rawUnsigTx);
		// 	const decodedUnsigTx = decodedUnsigTxResp.getTransaction();
		// 	const inputTxs = await wallet.getInputTransactions(walletService,
		// 		decodeMessageService, decodedUnsigTx);
		// 	const refTxs = inputTxs.map(walletTxToRefTx);

		// 	const changeIndex = constructTxResponse.getChangeIndex();
		// 	const txInfo = await dispatch(walletTxToBtcjsTx(decodedUnsigTx,
		// 		changeIndex, inputTxs));

		// 	const signedRaw = await deviceRun(dispatch, getState, device, async session => {
		// 		await dispatch(checkTrezorIsDcrwallet(session));

		// 		const signedResp = await session.signTx(txInfo.inputs, txInfo.outputs,
		// 			refTxs, chainParams.trezorCoinName, 0);
		// 		return signedResp.message.serialized.serialized_tx;
		// 	});

		// 	dispatch({ type: SIGNTX_SUCCESS });
		// 	dispatch(publishTransactionAttempt(hexToRaw(signedRaw)));

		// } catch (error) {
		// 	dispatch({ error, type: SIGNTX_FAILED });
		// }
	}
}

export const signMessageAttemptTrezor: ActionCreator<any> = (address, message): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		// @TODO
		// dispatch({ type: SIGNMESSAGE_ATTEMPT });

		// const device = selectors.trezorDevice(getState());
		// if (!device) {
		// 	dispatch({ error: "Device not connected", type: SIGNMESSAGE_FAILED });
		// 	return;
		// }

		// const chainParams = selectors.chainParams(getState());
		// const { grpc: { walletService } } = getState();

		// try {
		// 	const addrValidResp = await wallet.validateAddress(walletService, address);
		// 	if (!addrValidResp.getIsValid()) throw "Input has an invalid address " + address;
		// 	if (!addrValidResp.getIsMine()) throw "Trezor only supports signing with wallet addresses";
		// 	const addrIndex = addrValidResp.getIndex();
		// 	const addrBranch = addrValidResp.getIsInternal() ? 1 : 0;
		// 	const address_n = addressPath(addrIndex, addrBranch, WALLET_ACCOUNT,
		// 		chainParams.HDCoinType);

		// 	const signedMsg = await deviceRun(dispatch, getState, device, async session => {
		// 		await dispatch(checkTrezorIsDcrwallet(session));

		// 		return await session.signMessage(address_n, str2utf8hex(message),
		// 			chainParams.trezorCoinName, false);
		// 	});

		// 	const signature = hex2b64(signedMsg.message.signature);
		// 	dispatch({ getSignMessageSignature: signature, type: SIGNMESSAGE_SUCCESS });

		// } catch (error) {
		// 	dispatch({ error, type: SIGNMESSAGE_FAILED });
	}

}

// walletTxToBtcjsTx converts a tx decoded by the decred wallet (ie,
// returned from the decodeRawTransaction call) into a bitcoinjs-compatible
// transaction (to be used in trezor)
export const walletTxToBtcjsTx: ActionCreator<any> = (tx, changeIndex, inputTxs): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		// @TODO
		// const { grpc: { walletService } } = getState();
		// const chainParams = selectors.chainParams(getState());

		// const inputTxsMap = inputTxs.reduce((m, tx) => {
		// 	m[rawHashToHex(tx.getTransactionHash())] = tx;
		// 	return m;
		// }, {});

		// const inputs = [];
		// for (const inp of tx.getInputsList()) {
		// 	const inputTx = inputTxsMap[rawHashToHex(inp.getPreviousTransactionHash())];
		// 	if (!inputTx) throw "Cannot sign transaction without knowing source tx " +
		// 		rawHashToHex(inp.getPreviousTransactionHash());

		// 	const inputTxOut = inputTx.getOutputsList()[inp.getPreviousTransactionIndex()];
		// 	if (!inputTxOut) throw sprintf("Trying to use unknown outpoint %s:%d as input",
		// 		rawHashToHex(inp.getPreviousTransactionHash()), inp.getPreviousTransactionIndex());

		// 	const addr = inputTxOut.getAddressesList()[0];
		// 	if (!addr) throw sprintf("Outpoint %s:%d does not have addresses.",
		// 		rawHashToHex(inp.getPreviousTransactionHash()), inp.getPreviousTransactionIndex());

		// 	const addrValidResp = await wallet.validateAddress(walletService, addr);
		// 	if (!addrValidResp.getIsValid()) throw "Input has an invalid address " + addr;

		// 	// Trezor firmware (mcu) currently (2018-06-25) only support signing
		// 	// when all inputs of the transaction are from the wallet. This happens
		// 	// due to the fact that trezor firmware re-calculates the source
		// 	// pkscript given the address_n of the input, instead of using it (the
		// 	// pkscript) directly when hashing the tx prior to signing. This needs
		// 	// to be changed so that we can perform more advanced types of
		// 	// transactions.
		// 	if (!addrValidResp.getIsMine()) throw "Trezor only supports signing when all inputs are from the wallet.";

		// 	const addrIndex = addrValidResp.getIndex();
		// 	const addrBranch = addrValidResp.getIsInternal() ? 1 : 0;
		// 	inputs.push({
		// 		prev_hash: rawHashToHex(inp.getPreviousTransactionHash()),
		// 		prev_index: inp.getPreviousTransactionIndex(),
		// 		amount: inp.getAmountIn(),
		// 		sequence: inp.getSequence(),
		// 		address_n: addressPath(addrIndex, addrBranch, WALLET_ACCOUNT,
		// 			chainParams.HDCoinType),
		// 		decred_tree: inp.getTree()
		// 	});
		// }

		// const outputs = [];
		// for (const outp of tx.getOutputsList()) {
		// 	if (outp.getAddressesList().length != 1) {
		// 		// TODO: this will be true on OP_RETURNs. Support those.
		// 		throw "Output has different number of addresses than expected";
		// 	}

		// 	let addr = outp.getAddressesList()[0];
		// 	const addrValidResp = await wallet.validateAddress(walletService, addr);
		// 	if (!addrValidResp.getIsValid()) throw "Not a valid address: " + addr;
		// 	let address_n = null;

		// 	if (outp.getIndex() === changeIndex && addrValidResp.getIsMine()) {
		// 		const addrIndex = addrValidResp.getIndex();
		// 		const addrBranch = addrValidResp.getIsInternal() ? 1 : 0;
		// 		address_n = addressPath(addrIndex, addrBranch, WALLET_ACCOUNT,
		// 			chainParams.HDCoinType);
		// 		addr = null;
		// 	}

		// 	outputs.push({
		// 		amount: outp.getValue(),
		// 		script_type: "PAYTOADDRESS", // needs to change on OP_RETURNs
		// 		address: addr,
		// 		address_n: address_n,
		// 		decred_script_version: outp.getVersion()
		// 	});
		// }

		// const txInfo = {
		// 	lock_time: tx.getLockTime(),
		// 	version: tx.getVersion(),
		// 	expiry: tx.getExpiry(),
		// 	inputs,
		// 	outputs
		// };

		// return txInfo
	}
}


// export const TRZ_TOGGLEPINPROTECTION_ATTEMPT = "TRZ_TOGGLEPINPROTECTION_ATTEMPT";
// export const TRZ_TOGGLEPINPROTECTION_FAILED = "TRZ_TOGGLEPINPROTECTION_FAILED";
// export const TRZ_TOGGLEPINPROTECTION_SUCCESS = "TRZ_TOGGLEPINPROTECTION_SUCCESS";

export const togglePinProtection: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}

		const clearProtection = !!device.features.pin_protection;
		dispatch(setPerformingOperation(true))
		// dispatch({ clearProtection, type: TRZ_TOGGLEPINPROTECTION_ATTEMPT });

		try {
			await deviceRun(dispatch, getState, device, async session => {
				await session.changePin(clearProtection);
			});
			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ clearProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPINPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPINPROTECTION_FAILED });
		}
	}
}

// export const TRZ_TOGGLEPASSPHRASEPROTECTION_ATTEMPT = "TRZ_TOGGLEPASSPHRASEPROTECTION_ATTEMPT";
// export const TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED = "TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED";
// export const TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS = "TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS";

export const togglePassPhraseProtection: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}

		const enableProtection = !device.features.passphrase_protection;
		dispatch(setPerformingOperation(true))
		// dispatch({ enableProtection, type: TRZ_TOGGLEPASSPHRASEPROTECTION_ATTEMPT });

		try {
			await deviceRun(dispatch, getState, device, async session => {
				await session.togglePassphrase(enableProtection);
			});
			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}

// export const TRZ_CHANGEHOMESCREEN_ATTEMPT = "TRZ_CHANGEHOMESCREEN_ATTEMPT";
// export const TRZ_CHANGEHOMESCREEN_FAILED = "TRZ_CHANGEHOMESCREEN_FAILED";
// export const TRZ_CHANGEHOMESCREEN_SUCCESS = "TRZ_CHANGEHOMESCREEN_SUCCESS";
export const changeToDecredHomeScreen: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}

		dispatch(setPerformingOperation(true))

		// dispatch({ type: TRZ_CHANGEHOMESCREEN_ATTEMPT });

		try {
			await deviceRun(dispatch, getState, device, async session => {
				await session.changeHomescreen(model1_decred_homescreen);
			});
			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}

// export const TRZ_CHANGELABEL_ATTEMPT = "TRZ_CHANGELABEL_ATTEMPT";
// export const TRZ_CHANGELABEL_FAILED = "TRZ_CHANGELABEL_FAILED";
// export const TRZ_CHANGELABEL_SUCCESS = "TRZ_CHANGELABEL_SUCCESS";

export const changeLabel: ActionCreator<any> = (label: string): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}


		dispatch(setPerformingOperation(true))

		// dispatch({ type: TRZ_CHANGEHOMESCREEN_ATTEMPT });

		try {
			await deviceRun(dispatch, getState, device, async session => {
				await session.changeLabel(label);
			});
			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}

// export const TRZ_WIPEDEVICE_ATTEMPT = "TRZ_WIPEDEVICE_ATTEMPT";
// export const TRZ_WIPEDEVICE_FAILED = "TRZ_WIPEDEVICE_FAILED";
// export const TRZ_WIPEDEVICE_SUCCESS = "TRZ_WIPEDEVICE_SUCCESS";

export const wipeDevice: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}


		dispatch(setPerformingOperation(true))

		// dispatch({ type: TRZ_CHANGEHOMESCREEN_ATTEMPT });

		try {
			await deviceRun(dispatch, getState, device, async session => {
				await session.wipeDevice()
			})
			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}



// export const TRZ_RECOVERDEVICE_ATTEMPT = "TRZ_RECOVERDEVICE_ATTEMPT";
// export const TRZ_RECOVERDEVICE_FAILED = "TRZ_RECOVERDEVICE_FAILED";
// export const TRZ_RECOVERDEVICE_SUCCESS = "TRZ_RECOVERDEVICE_SUCCESS";


export const recoverDevice: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}


		dispatch(setPerformingOperation(true))

		// dispatch({ type: TRZ_CHANGEHOMESCREEN_ATTEMPT });

		try {
			await deviceRun(dispatch, getState, device, async session => {
				const settings = {
					word_count: 24, // FIXED at 24 (256 bits)
					passphrase_protection: false,
					pin_protection: false,
					label: "New DCR Trezor",
					dry_run: false
				};

				await session.recoverDevice(settings);
			})

			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}



// export const TRZ_INITDEVICE_ATTEMPT = "TRZ_INITDEVICE_ATTEMPT";
// export const TRZ_INITDEVICE_FAILED = "TRZ_INITDEVICE_FAILED";
// export const TRZ_INITDEVICE_SUCCESS = "TRZ_INITDEVICE_SUCCESS";


export const initDevice: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}


		dispatch(setPerformingOperation(true))

		// dispatch({ type: TRZ_CHANGEHOMESCREEN_ATTEMPT });

		try {
			await deviceRun(dispatch, getState, device, async session => {
				const settings = {
					strength: 256, // 24 words
					passphrase_protection: false,
					pin_protection: false,
					label: "New DCR Trezor"
				};

				await session.resetDevice(settings);
			})

			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}





// export const TRZ_UPDATEFIRMWARE_ATTEMPT = "TRZ_UPDATEFIRMWARE_ATTEMPT";
// export const TRZ_UPDATEFIRMWARE_FAILED = "TRZ_UPDATEFIRMWARE_FAILED";
// export const TRZ_UPDATEFIRMWARE_SUCCESS = "TRZ_UPDATEFIRMWARE_SUCCESS";

export const updateFirmware: ActionCreator<any> = (path: string): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}


		dispatch(setPerformingOperation(true))

		// dispatch({ type: TRZ_CHANGEHOMESCREEN_ATTEMPT });

		try {

			// @TODO  filesystem operations must be proxied through
			// the backend
			// const rawFirmware = fs.readFileSync(path);
			// const hexFirmware = rawToHex(rawFirmware);

			// await deviceRun(dispatch, getState, device, async session => {
			// 	await session.updateFirmware(hexFirmware);
			// })

			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}


// export const TRZ_GETWALLETCREATIONMASTERPUBKEY_ATTEMPT = "TRZ_GETWALLETCREATIONMASTERPUBKEY_ATTEMPT";
// export const TRZ_GETWALLETCREATIONMASTERPUBKEY_FAILED = "TRZ_GETWALLETCREATIONMASTERPUBKEY_FAILED";
// export const TRZ_GETWALLETCREATIONMASTERPUBKEY_SUCCESS = "TRZ_GETWALLETCREATIONMASTERPUBKEY_SUCCESS";
export const getWalletCreationMasterPubKey: ActionCreator<any> = (path: string): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const device = trezorDevice(getState())
		if (device == undefined) {
			dispatch(setTrezorError(new AppError(50, "Device not connected")))
			// dispatch({ error: "Device not connected", type: TRZ_TOGGLEPINPROTECTION_FAILED });
			return
		}


		dispatch(setPerformingOperation(true))
		const chainParams = getChainParams(getState())

		// dispatch({ type: TRZ_CHANGEHOMESCREEN_ATTEMPT });

		try {


			const features = await deviceRun(dispatch, getState, device, async session => {
				const resp = await session.getFeatures();
				return resp.message;
			});
			const versionLessThan = (wantMajor, wantMinor) =>
				(features.major_version < wantMajor) ||
				(features.major_version == wantMajor && features.minor_version < wantMinor);
			if (features.model == 1 && versionLessThan(1, 8)) {
				throw new Error("Trezor Model One needs to run on firmware >= 1.8.0. Found " +
					features.major_version + "." + features.minor_version + "." + features.patch_version);
			} else if (features.model == "T" && versionLessThan(2, 1)) {
				throw new Error("Trezor Model T needs to run on firmware >= 2.1.0. Found " +
					features.major_version + "." + features.minor_version + "." + features.patch_version);
			} else if (!features.model) {
				throw new Error("Unknown firmware model/version");
			}

			const path = accountPath(WALLET_ACCOUNT, chainParams.HDCoinType);

			const masterPubKey = await deviceRun(dispatch, getState, device, async session => {
				const res = await session.getPublicKey(path, chainParams.trezorCoinName, false);
				return res.message.xpub;
			})

			// @TODO
			// dispatch({ type: VALIDATEMASTERPUBKEY_SUCCESS, isWatchOnly: true, masterPubKey });
			dispatch(getWalletCreationMasterPubkeyCompleted())
			// dispatch({ type: TRZ_GETWALLETCREATIONMASTERPUBKEY_SUCCESS });



			// @TODO add confirmation message
			dispatch(setPerformingOperation(false))
			// dispatch({ enableProtection, deviceLabel: device.features.label, type: TRZ_TOGGLEPASSPHRASEPROTECTION_SUCCESS });
		} catch (error) {
			dispatch(getWalletCreationMasterPubkeyCompleted())
			dispatch(setTrezorError(error))
			// dispatch({ error, type: TRZ_TOGGLEPASSPHRASEPROTECTION_FAILED });
		}
	}
}






















// export async function trezorLink() {

// 	const link = new BridgeTransportV2()
// 	link.debug = true
// 	await link.init()
// 	await link.configure(configBlob)
// 	return link
// }

// export async function trezorDevices() {

// 	const link = await trezorLink()

// 	try {
// 		const devices = await link.enumerate()
// 		console.log("enum", devices)
// 		const session = await link.acquire(devices[0])

// 		const features = await link.call(session, 'GetFeatures', {})
// 		console.log("GetFeatures", features)
// 		// await link.release(session)
// 	}
// 	catch (error) {
// 		console.error(error)
// 	}
// }






// decrediton selectors
export const trezorWaitingForPin = (state: IApplicationState) => state.trezor.waitingForPin

export const trezorWaitingForPassPhrase = (state: IApplicationState) => state.trezor.waitingForPassPhrase

export const trezorWaitingForWord = (state: IApplicationState) => state.trezor.waitingForWord

export const trezorPerformingOperation = (state: IApplicationState) => state.trezor.performingOperation

export const trezorDevice = (state: IApplicationState) => state.trezor.device

export const trezorDeviceList = (state: IApplicationState) => state.trezor.deviceList

export const trezorWalletCreationMasterPubkeyAttempting = (state: IApplicationState) => state.trezor.walletCreationMasterPubkeyAttempting

