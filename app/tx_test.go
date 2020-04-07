package main

import (
	"encoding/base64"
	"testing"
)

func Test_getScriptSize(t *testing.T) {
	type args struct {
		pkScriptB64 string
	}
	tests := []struct {
		name    string
		args    args
		want    int
		wantErr bool
	}{
		{
			name: "test1",
			args: args{
				pkScriptB64: "dqkUm7CrGrRVwiDFdTBKprsx2tPv8ZiIrA==",
			},
			want:    108,
			wantErr: false,
		},
		{
			name: "test2",
			args: args{
				pkScriptB64: "dqkU1RaIVZbeHId6MFNCHM0Gx/vQ0u6IrA==",
			},
			want:    108,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			pkScript, err := base64.StdEncoding.DecodeString(tt.args.pkScriptB64)
			got, err := getScriptSize(pkScript)
			if (err != nil) != tt.wantErr {
				t.Errorf("getScriptSize() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("getScriptSize() = %v, want %v", got, tt.want)
			}
		})
	}
}
