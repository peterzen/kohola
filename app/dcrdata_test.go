package main

import (
	"fmt"
	"testing"
)

func Test_queryDcrdata(t *testing.T) {
	tests := []struct {
		name string
	}{
		// TODO: Add test cases.
	}
	_ = tests
	sdiffHistory, err := fetchStakeDiffHistory(433000, 434000)
	if err != nil {
		return
	}

	fmt.Printf("%v", sdiffHistory)

	// for _, tt := range tests {
	// 	t.Run(tt.name, func(t *testing.T) {
	// 		queryDcrdata()
	// 	})
	// }
}
6
