package main

import (
	"fmt"
	"io"
	"log"

	"github.com/decred/dcrd/dcrutil"
	"github.com/decred/dcrd/txscript"
	"github.com/decred/dcrd/wire"
	walletrpc "github.com/decred/dcrwallet/rpc/walletrpc"
)

// LineItem represents an item in the staking history
type LineItem struct {
	TxType           walletrpc.TransactionDetails_TransactionType `json:"tx_type"`
	RewardCredit     int64                                        `json:"reward_credit"`
	TicketCostCredit int64                                        `json:"ticket_cost_credit"`
	TicketCostDebit  int64                                        `json:"ticket_cost_debit"`
	FeeDebit         int64                                        `json:"fee_debit"`
	Timestamp        int64                                        `json:"timestamp"`
}

// GetStakingHistory filters staking transactions and extracts credit/debit
// information
func GetStakingHistory() (history []*LineItem, err error) {

	request := &walletrpc.GetTransactionsRequest{
		StartingBlockHeight:    -1,
		EndingBlockHeight:      1,
		TargetTransactionCount: 100,
	}
	stream, err := walletServiceClient.GetTransactions(ctx, request)
	if err != nil {
		log.Printf("GetTransactions errored: %s", err)
		return nil, err
	}
	lineItems := make([]*LineItem, 0)

	for {
		getTxResponse, err := stream.Recv()
		if err == io.EOF {
			return lineItems, nil
		}
		if err != nil {
			log.Printf("Failed to receive a GetTransactionsResponse: %s", err)
			return nil, err
		}
		if getTxResponse.MinedTransactions != nil {
			newLineItems := calculateLineItems(getTxResponse.MinedTransactions.Transactions)
			if len(newLineItems) > 0 {
				extLineItems := make([]*LineItem, 0, len(lineItems)+len(newLineItems))
				if len(lineItems) > 0 {
					extLineItems = append(extLineItems, lineItems...)
				}
				extLineItems = append(extLineItems, newLineItems...)
				lineItems = extLineItems
			}
		}
	}
}

func calculateLineItems(allTxList []*walletrpc.TransactionDetails) (lineItemSlice []*LineItem) {

	lineItemSlice = make([]*LineItem, 0, len(allTxList))

	for _, txd := range allTxList {

		tx, err := dcrutil.NewTxFromBytes(txd.Transaction)
		if err != nil {
			fmt.Printf("NewTxFromBytes errored: %s", err)
		}
		// fmt.Printf("Tx: %s\n", tx.Hash().String())

		lineItem := &LineItem{
			TxType:    txd.GetTransactionType(),
			Timestamp: txd.GetTimestamp(),
		}

		switch txd.TransactionType {
		case walletrpc.TransactionDetails_REVOCATION:
			// @FIXME should obtain fee amount and store it in FeeDebit
			stakerevoke := findScript(tx.MsgTx().TxOut, txscript.StakeRevocationTy)
			if stakerevoke != nil {
				lineItem.TicketCostCredit = stakerevoke.Value
			}
			break
		case walletrpc.TransactionDetails_TICKET_PURCHASE:
			stakesubmission := findScript(tx.MsgTx().TxOut, txscript.StakeSubmissionTy)
			if stakesubmission != nil {
				lineItem.TicketCostDebit = stakesubmission.Value
			}
			break
		case walletrpc.TransactionDetails_VOTE:
			stakegen := findScript(tx.MsgTx().TxOut, txscript.StakeGenTy)
			if stakegen != nil {
				lineItem.TicketCostCredit = stakegen.Value
			}
			// @FIXME probably not the proper way to obtain the reward amount
			lineItem.RewardCredit = tx.MsgTx().TxIn[0].ValueIn
			break
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
