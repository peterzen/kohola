package main

import (
	"bytes"
	"context"
	"fmt"

	"google.golang.org/grpc/status"

	"decred.org/dcrwallet/errors"
	"decred.org/dcrwallet/rpc/walletrpc"
	"decred.org/dcrwallet/wallet/txsizes"
	"github.com/decred/dcrd/chaincfg/chainhash"
	dcrutilv2 "github.com/decred/dcrd/dcrutil"
	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/decred/dcrd/txscript/v3"
	"github.com/decred/dcrd/wire"
	"github.com/decred/dcrwallet/wallet/txauthor"
	"github.com/decred/dcrwallet/wallet/txrules"

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

// makeInputSource creates an InputSource that creates inputs for every unspent
// output with non-zero output values.  The target amount is ignored since every
// output is consumed.  The InputSource does not return any previous output
// scripts as they are not needed for creating the signed transaction and are
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

	if len(req.SourceOutputs) < 1 {
		return nil, status.Error(10, "No inputs provided")
	}

	if req.SendAllFlag && len(req.Amounts) != 1 {
		return nil, status.Errorf(10, "There should be only 1 output when sending Max amount")
	}

	chainParams := getChainParams()
	feeRate := dcrutilv2.Amount(req.FeeRate)
	inputSource := makeInputSource(req.SourceOutputs)
	txOutputs := make([]*wire.TxOut, 0, len(req.Amounts))

	for encodedAddr, amount := range req.Amounts {

		// Ensure amount is in the valid range
		if amount <= 0 || amount > dcrutil.MaxAmount {
			return nil, status.Errorf(10, "Invalid amount: 0 >= %v > %v", amount, dcrutil.MaxAmount)
		}

		// Decode the provided address and validate the network encoded
		// with the address
		addr, err := dcrutil.DecodeAddress(encodedAddr, chainParams)
		if err != nil {
			return nil, status.Errorf(10, "Address %s: %s", encodedAddr, err)
		}

		// Ensure the address is one of the supported types.
		switch addr.(type) {
		case *dcrutil.AddressPubKeyHash:
		case *dcrutil.AddressScriptHash:
		default:
			return nil, status.Errorf(10, "Invalid type: %T", addr)
		}

		// Create a new script which pays to the provided address.
		pkScript, err := txscript.PayToAddrScript(addr)
		if err != nil {
			return nil, status.Errorf(10, "Pay to address script: %v", err)
		}

		// When sending all available funds, substract the estimated fee from the amount
		if req.SendAllFlag {
			tmpTxOutputs := []*wire.TxOut{
				wire.NewTxOut(amount, pkScript),
			}
			feeEstimate := estimateFee(tmpTxOutputs, feeRate)
			amount = int64(amount) - feeEstimate
		}
		txOut := wire.NewTxOut(amount, pkScript)
		txOutputs = append(txOutputs, txOut)
	}

	destinationSourceToAccount := &destinationScriptSourceToAccount{
		accountNumber: req.ChangeAccount,
	}
	atx, err := txauthor.NewUnsignedTransaction(txOutputs, feeRate, inputSource, destinationSourceToAccount)
	if err != nil {
		return nil, status.Error(10, err.Error())
	}

	var txBuf bytes.Buffer
	txBuf.Grow(atx.Tx.SerializeSize())
	err = atx.Tx.Serialize(&txBuf)
	if err != nil {
		return nil, status.Errorf(10, "Serialize: %s", err)
	}

	response := &walletrpc.ConstructTransactionResponse{
		UnsignedTransaction:       txBuf.Bytes(),
		TotalPreviousOutputAmount: int64(atx.TotalInput),
		TotalOutputAmount:         int64(sumOutputValues(atx.Tx.TxOut)),
		EstimatedSignedSize:       uint32(atx.EstimatedSignedSerializeSize),
		ChangeIndex:               int32(atx.ChangeIndex),
	}
	return response, nil
}

// ConstructTransaction constructs a new tx using auto utxo selection
func ConstructTransaction(ctx context.Context, req *walletgui.CreateTransactionRequest) (
	*walletrpc.ConstructTransactionResponse, error) {

	request := &walletrpc.ConstructTransactionRequest{
		SourceAccount:         req.SourceAccount,
		RequiredConfirmations: req.RequiredConfirmations,
		FeePerKb:              req.FeeRate,
	}

	if req.SendAllFlag {
		if len(req.Amounts) > 1 {
			return nil, status.Errorf(10, "Too many outputs provided for a send all request")
		} else if len(req.Amounts) == 0 {
			return nil, status.Errorf(10, "No destination specified for send all request")
		}

		request.OutputSelectionAlgorithm = walletrpc.ConstructTransactionRequest_ALL
		outputDst := &walletrpc.ConstructTransactionRequest_OutputDestination{}
		for address := range req.Amounts {
			outputDst.Address = address
		}
		request.ChangeDestination = outputDst
	} else {
		request.OutputSelectionAlgorithm = walletrpc.ConstructTransactionRequest_UNSPECIFIED
		request.NonChangeOutputs = make([]*walletrpc.ConstructTransactionRequest_Output, len(req.Amounts))

		i := 0
		totalAmount := int64(0)
		for address, amount := range req.Amounts {
			outputDst := &walletrpc.ConstructTransactionRequest_OutputDestination{
				Address: address,
			}
			output := &walletrpc.ConstructTransactionRequest_Output{
				Destination: outputDst,
				Amount:      amount,
			}
			request.NonChangeOutputs[i] = output
			totalAmount += amount
			i++
		}
		changeAddress, err := getChangeAddress(req.ChangeAccount)
		if err != nil {
			return nil, status.Errorf(10, "Unable to obtain change address: %s", err)
		}
		changeScript, err := txscript.PayToAddrScript(*changeAddress)
		if err != nil {
			return nil, status.Errorf(10, "Unable to obtain change script: %s", err)
		}

		changeDest := &walletrpc.ConstructTransactionRequest_OutputDestination{
			Script: changeScript,
		}
		request.ChangeDestination = changeDest
	}
	response, err := walletServiceClient.ConstructTransaction(ctx, request)
	if err != nil {
		return nil, status.Errorf(10, "ConstructTransaction: %s", err)
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

func estimateFee(outputs []*wire.TxOut, relayFeePerKb dcrutilv2.Amount) int64 {
	scriptSizes := []int{txsizes.RedeemP2PKHSigScriptSize}
	changeScriptSize := 25 // P2PKHPkScriptSize
	maxSignedSize := txsizes.EstimateSerializeSize(scriptSizes, outputs, changeScriptSize)
	return int64(txrules.FeeForSerializeSize(relayFeePerKb, maxSignedSize))
}
