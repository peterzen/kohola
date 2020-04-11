package main

import (
	"bytes"
	"context"
	"fmt"

	"decred.org/dcrwallet/errors"
	"decred.org/dcrwallet/rpc/walletrpc"
	"decred.org/dcrwallet/wallet/txsizes"
	"github.com/decred/dcrd/chaincfg/chainhash"
	dcrutilv2 "github.com/decred/dcrd/dcrutil"
	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/decred/dcrd/txscript/v3"
	"github.com/decred/dcrd/wire"
	"github.com/decred/dcrwallet/wallet/txauthor"

	"github.com/peterzen/kohola/walletgui"
)

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

// _CreateRawTransaction creates a new raw transaction.
func _CreateRawTransaction(ctx context.Context, req *walletgui.CreateTransactionRequest) (
	*walletgui.CreateTransactionResponse, error) {

	// Validate the locktime
	if req.LockTime > int64(wire.MaxTxInSequenceNum) {
		return nil, errors.E(errors.Invalid, "Locktime out of range")
	}

	chainParams := getChainParams()
	// feeRate := dcrutil.Amount(req.FeeRate)
	tx := wire.NewMsgTx()

	// Add all transaction inputs to a new transaction after performing
	// some validity checks.
	for _, input := range req.SourceOutputs {
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

	return &walletgui.CreateTransactionResponse{
		UnsignedTransaction: txBuf.Bytes(),
	}, nil
}

// noInputValue describes an error returned by the input source when no inputs
// were selected because each previous output value was zero.  Callers of
// txauthor.NewUnsignedTransaction need not report these errors to the user.
type noInputValue struct {
}

func (noInputValue) Error() string { return "no input value" }

// makeInputSource creates an InputSource that creates inputs for every unspent
// output with non-zero output values.  The target amount is ignored since every
// output is consumed.  The InputSource does not return any previous output
// scripts as they are not needed for creating the unsinged transaction and are
// looked up again by the wallet during the call to signrawtransaction.
func makeInputSource(outputs []*walletgui.UnspentOutput) txauthor.InputSource {
	var (
		totalInputValue   dcrutil.Amount
		inputs            = make([]*wire.TxIn, 0, len(outputs))
		redeemScriptSizes = make([]int, 0, len(outputs))
		sourceErr         error
	)
	for _, output := range outputs {
		outputAmount := dcrutil.Amount(output.Amount)
		if outputAmount == 0 {
			continue
		}
		if !isOutputValueValid(outputAmount) {
			sourceErr = errors.E(errors.Invalid, "Invalid output amount `%v` in UTXO", outputAmount)
			break
		}
		totalInputValue += outputAmount

		previousOutPoint, err := parseOutPoint(output)
		if err != nil {
			sourceErr = errors.E(errors.Invalid, "Invalid data in UTXO list: %v", err)
			break
		}

		txIn := wire.NewTxIn(&previousOutPoint, int64(outputAmount), nil)
		inputs = append(inputs, txIn)
	}

	if sourceErr == nil && totalInputValue == 0 {
		sourceErr = errors.E(errors.Invalid, "No input value")
	}

	return func(dcrutilv2.Amount) (*txauthor.InputDetail, error) {
		inputDetail := txauthor.InputDetail{
			Amount:            dcrutilv2.Amount(totalInputValue),
			Inputs:            inputs,
			Scripts:           nil,
			RedeemScriptSizes: redeemScriptSizes,
		}
		return &inputDetail, sourceErr
	}
}

// destinationScriptSourceToAccount is a ChangeSource which is used to receive
// all correlated previous input value.
type destinationScriptSourceToAccount struct {
	accountNumber uint32
}

func (src *destinationScriptSourceToAccount) Script() ([]byte, uint16, error) {
	destinationAddress, err := getChangeAddress(src.accountNumber)
	if err != nil {
		return nil, 0, err
	}

	script, err := txscript.PayToAddrScript(*destinationAddress)
	if err != nil {
		return nil, 0, err
	}

	return script, wire.DefaultPkScriptVersion, nil
}

func (src *destinationScriptSourceToAccount) ScriptSize() int {
	return 25 // P2PKHPkScriptSize
}

// CreateTransaction authors a new transaction
func CreateTransaction(ctx context.Context, req *walletgui.CreateTransactionRequest) (
	*walletrpc.ConstructTransactionResponse, error) {

	// sourceOutputs := make(map[string][]walletgui.UnspentOutput)
	// for _, unspentOutput := range req.SourceOutputs {
	// 	// if !unspentOutput.Spendable {
	// 	// 	continue
	// 	// }
	// 	// if unspentOutput.Confirmations < opts.RequiredConfirmations {
	// 	// 	continue
	// 	// }
	// 	// if opts.SourceAccount != "" && opts.SourceAccount != unspentOutput.Account {
	// 	// 	continue
	// 	// }
	// 	// if opts.SourceAddress != "" && opts.SourceAddress != unspentOutput.Address {
	// 	// 	continue
	// 	// }
	// 	sourceAddressOutputs := sourceOutputs[unspentOutput.Address]
	// 	sourceOutputs[unspentOutput.Address] = append(sourceAddressOutputs, unspentOutput)
	// }

	chainParams := getChainParams()
	feeRate := dcrutilv2.Amount(req.FeeRate)
	inputSource := makeInputSource(req.SourceOutputs)
	txOutputs := make([]*wire.TxOut, 0, len(req.Amounts))

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
		txOutputs = append(txOutputs, txOut)
	}

	destinationSourceToAccount := &destinationScriptSourceToAccount{
		accountNumber: req.ChangeAccount,
	}
	atx, err := txauthor.NewUnsignedTransaction(txOutputs, feeRate, inputSource, destinationSourceToAccount)
	if err != nil {
		return nil, err
	}

	var txBuf bytes.Buffer
	txBuf.Grow(atx.Tx.SerializeSize())
	err = atx.Tx.Serialize(&txBuf)
	if err != nil {
		return nil, err
	}

	response := &walletrpc.ConstructTransactionResponse{
		UnsignedTransaction:       txBuf.Bytes(),
		TotalPreviousOutputAmount: int64(atx.TotalInput),
		TotalOutputAmount:         int64(sumOutputValues(atx.Tx.TxOut)),
		EstimatedSignedSize:       uint32(atx.EstimatedSignedSerializeSize),
		ChangeIndex:               -1,
	}
	return response, nil
}

func isOutputValueValid(amount dcrutil.Amount) bool {
	return amount >= 0 && amount <= dcrutil.MaxAmount
}

func sumOutputValues(outputs []*wire.TxOut) (totalOutput dcrutil.Amount) {
	for _, txOut := range outputs {
		totalOutput += dcrutil.Amount(txOut.Value)
	}
	return totalOutput
}

func parseOutPoint(input *walletgui.UnspentOutput) (wire.OutPoint, error) {
	txHash, err := chainhash.NewHash(input.TransactionHash)
	if err != nil {
		return wire.OutPoint{}, err
	}
	return wire.OutPoint{
		Hash:  *txHash,
		Index: input.OutputIndex,
		Tree:  int8(input.Tree),
	}, nil
}
