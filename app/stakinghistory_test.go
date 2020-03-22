package main

import (
	"fmt"
	"testing"

	// proto "github.com/golang/protobuf/proto"
	gui "github.com/peterzen/dcrwalletgui/dcrwalletgui"
)

func Test_GetStakingHistory(t *testing.T) {
	tests := []struct {
		name string
	}{

		// TODO: Add test cases.
	}
	_ = tests

	WalletAPIInit()
	err := gui.LoadConfig()

	if err != nil {
		fmt.Printf("err loadconfig")
	}

	endpointID := "6b4812af-e071-4bf7-9dbb-0e2de896abab"

	endpoints := gui.GetConfig().GetWalletEndpoints()
	endpoint := getEndpointByID(endpoints, endpointID)

	if endpoint == nil {
		fmt.Printf("Missing endpoint in config")
	}

	connectWallet(endpoint)

	history, err := GetStakingHistory()

	if err != nil {
		fmt.Printf("Missing endpoint in config")
		return
	}

	for _, lineItem := range history {
		fmt.Printf("%s\t%d\t%d\t%d\t%d\n",
			lineItem.TxType, lineItem.RewardCredit, lineItem.TicketCostCredit, lineItem.TicketCostDebit, lineItem.FeeDebit)
	}

	// for _, tt := range tests {
	// 	t.Run(tt.name, func(t *testing.T) {
	// 		getStakingHistory()
	// 	})
	// }
}
