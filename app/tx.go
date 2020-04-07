package main

import (
	"bytes"
	"context"
	"fmt"

	"decred.org/dcrwallet/errors"
	"decred.org/dcrwallet/wallet/txsizes"
	"github.com/decred/dcrd/chaincfg/chainhash"
	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/decred/dcrd/txscript/v3"
	"github.com/decred/dcrd/wire"

	"github.com/peterzen/dcrwalletgui/walletgui"
)

// scriptSizes := make([]int, 0, len(amounts))
// scriptSizes := []int{txsizes.RedeemP2PKHSigScriptSize}

/*

	// scriptSize := getScriptSize(pkScript)
		// redeemScriptSizes = append(redeemScriptSizes, scriptSize)
	}
		feePerKb := txrules.DefaultRelayFeePerKb
		// if req.FeePerKb != 0 {
		// feePerKb = dcrutil.Amount(req.FeePerKb)
		// }

		scriptSizes := []int{txsizes.RedeemP2PKHSigScriptSize}
		maxSignedSize := txsizes.EstimateSerializeSize(scriptSizes, mtx.TxOut, 0)
		targetFee := txrules.FeeForSerializeSize(feePerKb, maxSignedSize)
		_ = targetFee
*/

func getScriptSize(pkScript []byte) (int, error) {
	/* script size calculation */
	// var scriptSize int
	scriptClass := txscript.GetScriptClass(0, pkScript)
	fmt.Printf("DEBUG scriptClass %v", scriptClass)

	switch scriptClass {
	case txscript.PubKeyHashTy:
		return txsizes.RedeemP2PKHSigScriptSize, nil
	case txscript.PubKeyTy:
		return txsizes.RedeemP2PKSigScriptSize, nil
	case txscript.StakeRevocationTy, txscript.StakeSubChangeTy, txscript.StakeGenTy:
		scriptClass, err := txscript.GetStakeOutSubclass(pkScript)
		if err != nil {
			return -1, errors.E(errors.Bug, "failed to extract nested script in stake output", err)
		}

		// For stake transactions we expect P2PKH and P2SH script class
		// types only but ignore P2SH script type since it can pay
		// to any script which the wallet may not recognize.
		if scriptClass != txscript.PubKeyHashTy {
			err := errors.E(errors.Bug, "unexpected nested script class for credit: %v", scriptClass)
			return -1, err
		}

		return txsizes.RedeemP2PKHSigScriptSize, nil
	default:
		err := errors.E(errors.Bug, "unexpected nested script class for credit: %v", scriptClass)
		return -1, err
	}
}

// CreateRawTransaction creates a new raw transaction.
func CreateRawTransaction(ctx context.Context, req *walletgui.CreateRawTransactionRequest) (
	*walletgui.CreateRawTransactionResponse, error) {

	// Validate the locktime
	if req.LockTime > int64(wire.MaxTxInSequenceNum) {
		return nil, errors.E(errors.Invalid, "Locktime out of range")
	}

	chainParams := getChainParams()
	// feeRate := dcrutil.Amount(req.FeeRate)
	tx := wire.NewMsgTx()

	// Add all transaction inputs to a new transaction after performing
	// some validity checks.
	for _, input := range req.Inputs {
		txHash, err := chainhash.NewHash(input.TransactionHash)
		if err != nil {
			return nil, errors.E(errors.Invalid, err)
		}

		switch int8(input.Tree) {
		case wire.TxTreeRegular, wire.TxTreeStake:
		default:
			return nil, errors.E(errors.Invalid, "Tx tree must be regular or stake")
		}

		if input.Amount < 0 {
			return nil, errors.E(errors.Invalid, "Positive input amount is required")
		}

		prevOut := wire.NewOutPoint(txHash, input.OutputIndex, int8(input.Tree))
		txIn := wire.NewTxIn(prevOut, input.Amount, nil)
		if req.LockTime != 0 {
			txIn.Sequence = wire.MaxTxInSequenceNum - 1
		}
		tx.AddTxIn(txIn)
	}

	// Add all transaction outputs to the transaction after performing
	// some validity checks.
	for encodedAddr, amount := range req.Amounts {
		// Ensure amount is in the valid range for monetary amounts.
		if amount <= 0 || amount > dcrutil.MaxAmount {
			return nil, errors.E(errors.Invalid, "Invalid amount: 0 >= %v > %v", amount, dcrutil.MaxAmount)
		}

		// Decode the provided address.  This also ensures the network encoded
		// with the address matches the network the server is currently on.
		addr, err := dcrutil.DecodeAddress(encodedAddr, chainParams)
		if err != nil {
			return nil, errors.E(errors.Invalid, "Address %q: %v", encodedAddr, err)
		}

		// Ensure the address is one of the supported types.
		switch addr.(type) {
		case *dcrutil.AddressPubKeyHash:
		case *dcrutil.AddressScriptHash:
		default:
			return nil, errors.E(errors.Invalid, "Invalid type: %T", addr)
		}

		// Create a new script which pays to the provided address.
		pkScript, err := txscript.PayToAddrScript(addr)
		if err != nil {
			return nil, errors.E(errors.Bug, "Pay to address script: %v", err)
		}

		txOut := wire.NewTxOut(amount, pkScript)
		tx.AddTxOut(txOut)
	}

	// Set the Locktime, if given.
	if req.LockTime != -1 {
		tx.LockTime = uint32(req.LockTime)
	}

	// Set the Expiry, if given.
	if req.Expiry != -1 {
		tx.Expiry = uint32(req.Expiry)
	}

	var txBuf bytes.Buffer
	txBuf.Grow(tx.SerializeSize())
	err := tx.Serialize(&txBuf)
	if err != nil {
		return nil, err
	}

	return &walletgui.CreateRawTransactionResponse{
		UnsignedTransaction: txBuf.Bytes(),
	}, nil
}

// func estimateTxSize(tx *wire.MsgTx) {

// 	feePerKb := txrules.DefaultRelayFeePerKb
// 	// if req.FeePerKb != 0 {
// 	// feePerKb = dcrutil.Amount(req.FeePerKb)
// 	// }

// 	scriptSizes := []int{txsizes.RedeemP2PKHSigScriptSize}
// 	changeScript, changeScriptVersion, err := fetchChange.Script()
// 	if err != nil {
// 		return nil, errors.E(op, err)
// 	}
// 	maxSignedSize := txsizes.EstimateSerializeSize(scriptSizes, outputs, 0)
// 	targetFee := txrules.FeeForSerializeSize(feePerKb, maxSignedSize)

// }
