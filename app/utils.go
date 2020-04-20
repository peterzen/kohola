package main

import (
	"time"

	"decred.org/dcrwallet/rpc/walletrpc"
)

func timestampToBlockHeight(startTimestamp int64, endTimestamp int64) (startblockHeight uint32, endblockHeight uint32, err error) {

	request := &walletrpc.BestBlockRequest{}
	response, err := walletServiceClient.BestBlock(ctx, request)
	if err != nil {
		return 0, 0, err
	}

	currentTimestamp := time.Now().Unix()
	if endTimestamp == 0 {
		endTimestamp = currentTimestamp
	}
	bestblockHeight := response.GetHeight()
	endblockHeight = bestblockHeight - uint32((currentTimestamp-endTimestamp)/(5*60))
	startblockHeight = bestblockHeight - uint32((currentTimestamp-startTimestamp)/(5*60))
	return startblockHeight, endblockHeight, nil
}
