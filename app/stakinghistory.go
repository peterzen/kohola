package main

import (
	"fmt"
	"io"
	"log"

	"decred.org/dcrwallet/rpc/walletrpc"
	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/decred/dcrd/txscript"
	"github.com/decred/dcrd/wire"
	"github.com/golang/protobuf/proto"

	"github.com/peterzen/kohola/walletgui"
	"github.com/peterzen/kohola/webview"
)

// GetStakingHistory filters staking transactions and extracts credit/debit
// information
func GetStakingHistory(startingBlockHeight int32, endingBlockHeight int32) (stakingHistory *walletgui.StakingHistory, err error) {

	request := &walletrpc.GetTransactionsRequest{
		StartingBlockHeight: startingBlockHeight,
		EndingBlockHeight:   endingBlockHeight,
	}
	stream, err := walletServiceClient.GetTransactions(ctx, request)
	if err != nil {
		log.Printf("GetTransactions errored: %s", err)
		return nil, err
	}

	stakingHistory = &walletgui.StakingHistory{
		LineItems: make([]*walletgui.StakingHistory_StakingHistoryLineItem, 0),
	}

	for {
		getTxResponse, err := stream.Recv()
		if err == io.EOF {
			return stakingHistory, nil
		}
		if err != nil {
			log.Printf("Failed to receive a GetTransactionsResponse: %s", err)
			return nil, err
		}
		if getTxResponse.MinedTransactions != nil {
			newLineItems := calculateLineItems(getTxResponse.MinedTransactions.Transactions)
			if len(newLineItems) > 0 {
				extLineItems := make([]*walletgui.StakingHistory_StakingHistoryLineItem, 0, len(stakingHistory.LineItems)+len(newLineItems))
				if len(stakingHistory.LineItems) > 0 {
					extLineItems = append(extLineItems, stakingHistory.LineItems...)
				}
				extLineItems = append(extLineItems, newLineItems...)
				stakingHistory.LineItems = extLineItems
			}
		}
	}
}

func calculateLineItems(allTxList []*walletrpc.TransactionDetails) (lineItemSlice []*walletgui.StakingHistory_StakingHistoryLineItem) {

	lineItemSlice = make([]*walletgui.StakingHistory_StakingHistoryLineItem, 0, len(allTxList))

	for _, txd := range allTxList {

		tx, err := dcrutil.NewTxFromBytes(txd.Transaction)
		if err != nil {
			fmt.Printf("NewTxFromBytes errored: %s", err)
		}
		fmt.Printf("Tx: %s\n", tx.Hash().String())

		lineItem := &walletgui.StakingHistory_StakingHistoryLineItem{
			TxType:    txd.GetTransactionType(),
			TxHash:    txd.GetHash(),
			Timestamp: txd.GetTimestamp(),
		}

		switch txd.TransactionType {
		case walletrpc.TransactionDetails_REVOCATION:
			// @FIXME should obtain fee amount and store it in FeeDebit
			stakerevoke := findScript(tx.MsgTx().TxOut, txscript.StakeRevocationTy)
			if stakerevoke != nil {
				lineItem.TicketCostCredit = stakerevoke.Value
			}
		case walletrpc.TransactionDetails_TICKET_PURCHASE:
			stakesubmission := findScript(tx.MsgTx().TxOut, txscript.StakeSubmissionTy)
			if stakesubmission != nil {
				lineItem.TicketCostDebit = stakesubmission.Value
			}
		case walletrpc.TransactionDetails_VOTE:
			stakegen := findScript(tx.MsgTx().TxOut, txscript.StakeGenTy)
			if stakegen != nil {
				lineItem.TicketCostCredit = stakegen.Value
			}
			// @FIXME probably not the proper way to obtain the reward amount
			lineItem.RewardCredit = tx.MsgTx().TxIn[0].ValueIn
		default:
			continue
		}
		lineItemSlice = append(lineItemSlice, lineItem)
	}
	return lineItemSlice
}

func findScript(txOutList []*wire.TxOut, scriptClass txscript.ScriptClass) *wire.TxOut {
	for _, vout := range txOutList {
		if txscript.GetScriptClass(vout.Version, vout.PkScript) == scriptClass {
			return vout
		}
	}
	return nil
}

// ExportStakingHistoryAPI exports functions to the UI
func ExportStakingHistoryAPI(w webview.Interface) {
	w.Bind("walletgui__GetStakingHistory", func(startingBlockHeight int32, endingBlockHeight int32) (r walletgui.LorcaMessage) {
		history, err := GetStakingHistory(startingBlockHeight, endingBlockHeight)
		r.Err = err
		if err == nil {
			r.Payload, _ = proto.Marshal(history)
		}
		return r
	})
}
