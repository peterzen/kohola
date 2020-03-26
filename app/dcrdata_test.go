package main

import (
	"reflect"
	"testing"

	gui "github.com/peterzen/dcrwalletgui/walletgui"
)

func Test_fetchStakeDiffHistory(t *testing.T) {
	type args struct {
		startBlock uint32
		endBlock   uint32
	}
	tests := []struct {
		name        string
		args        args
		wantHistory *gui.StakeDiffHistory
		wantErr     bool
	}{
		{
			name: "bestblock",
			args: args{
				startBlock: 433000,
				endBlock:   433001,
			},
			wantHistory: &gui.StakeDiffHistory{
				SdiffValues: []float32{135.54547, 135.54547},
				StartBlock:  433000,
				EndBlock:    433001,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotHistory, err := fetchStakeDiffHistory(tt.args.startBlock, tt.args.endBlock)
			if (err != nil) != tt.wantErr {
				t.Errorf("fetchStakeDiffHistory() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(gotHistory, tt.wantHistory) {
				t.Errorf("fetchStakeDiffHistory() = %v, want %v", gotHistory, tt.wantHistory)
			}
		})
	}
}
