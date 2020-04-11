import { rawHashToHex, rawToHex } from "../../helpers/byteActions"

export const hardeningConstant = 0x80000000

export const WALLET_ACCOUNT = 0

export function addressPath(
    index: number,
    branch: number,
    account: number,
    coinType: number
) {
    return [
        (44 | hardeningConstant) >>> 0, // purpose
        ((coinType || 0) | hardeningConstant) >>> 0, // coin type
        ((account || 0) | hardeningConstant) >>> 0, // account
        (branch || 0) >>> 0, // branch
        index >>> 0, // index
    ]
}

export function accountPath(account: number, coinType: number) {
    return [
        (44 | hardeningConstant) >>> 0, // purpose
        ((coinType || 0) | hardeningConstant) >>> 0, // coin type
        ((account || 0) | hardeningConstant) >>> 0, // account
    ]
}

// walletTxToRefTx converts a tx decoded by the decred wallet into a trezor
// RefTransaction object to be used with SignTx.
export function walletTxToRefTx(tx) {
    const inputs = tx.getInputsList().map((inp) => ({
        amount: inp.getAmountIn(),
        prev_hash: rawHashToHex(inp.getPreviousTransactionHash()),
        prev_index: inp.getPreviousTransactionIndex(),
        decred_tree: inp.getTree(),
        sequence: inp.getSequence(),
    }))

    const bin_outputs = tx.getOutputsList().map((outp) => ({
        amount: outp.getValue(),
        script_pubkey: rawToHex(outp.getScript()),
        decred_script_version: outp.getVersion(),
    }))

    const txInfo = {
        hash: rawHashToHex(tx.getTransactionHash()),
        lock_time: tx.getLockTime(),
        version: tx.getVersion(),
        expiry: tx.getExpiry(),
        inputs,
        bin_outputs,
    }

    return txInfo
}
