package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"decred.org/dcrwallet/rpc/walletrpc"
	"github.com/go-resty/resty/v2"
	"github.com/golang/protobuf/proto"

	"github.com/peterzen/kohola/walletgui"
	"github.com/peterzen/kohola/webview"
)

const baseURL = "https://explorer.dcrdata.org/api"

func queryDcrdata(path string) ([]byte, error) {

	client := resty.New()
	resp, err := client.R().
		Get(fmt.Sprintf("%s%s", baseURL, path))

	if err != nil {
		log.Printf("error: %s", err)
		return nil, err
	}
	return resp.Body(), nil
}

func fetchStakeDiffHistory(startBlock uint32, endBlock uint32) (history *walletgui.StakeDiffHistory, err error) {

	apiPath := fmt.Sprintf("/stake/diff/r/%d/%d", startBlock, endBlock)
	jsonResponse, err := queryDcrdata(apiPath)
	if err != nil {
		return nil, err
	}

	history = &walletgui.StakeDiffHistory{
		StartBlock: startBlock,
		EndBlock:   endBlock,
	}

	err = json.Unmarshal([]byte(jsonResponse), &history.SdiffValues)
	if err != nil {
		log.Printf("error: %s", err)
		return nil, err
	}

	return history, nil
}

// ExportDcrdataAPI exports functions to the UI
func ExportDcrdataAPI(w webview.Interface) {
	w.Bind("walletgui__FetchStakeDiffHistory", func(startTimestamp int64, endTimestamp int64) (r walletgui.LorcaMessage) {

		request := &walletrpc.BestBlockRequest{}
		response, err := walletServiceClient.BestBlock(ctx, request)
		if err != nil {
			fmt.Println(err)
			r.Err = err
			return r
		}

		currentTimestamp := time.Now().Unix()
		if endTimestamp == 0 {
			endTimestamp = currentTimestamp
		}
		bestblockHeight := response.GetHeight()
		endblockHeight := bestblockHeight - uint32((currentTimestamp-endTimestamp)/(5*60))
		startblockHeight := bestblockHeight - uint32((currentTimestamp-startTimestamp)/(5*60))

		history, err := fetchStakeDiffHistory(startblockHeight, endblockHeight)
		r.Err = err
		if err == nil {
			r.Payload, _ = proto.Marshal(history)
		}
		return r
	})
}
