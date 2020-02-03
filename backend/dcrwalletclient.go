package main

import (
	"fmt"
	"path/filepath"

	"context"
	pb "github.com/decred/dcrwallet/rpc/walletrpc"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"github.com/decred/dcrd/dcrutil"
)

var certificateFile = filepath.Join(dcrutil.AppDataDir("dcrwallet", false), "rpc.cert")

func NewWalletClient(cfg *config) (pb.WalletServiceClient, error) {
	fmt.Printf("%#v", cfg)
	creds, err := credentials.NewClientTLSFromFile(cfg.RPCCert, "localhost")
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	conn, err := grpc.Dial(cfg.WalletRPCServer, grpc.WithTransportCredentials(creds))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	// defer conn.Close()
	c := pb.NewWalletServiceClient(conn)

	return c, nil

}

func DoBalanceRequest(c pb.WalletServiceClient) {

	balanceRequest := &pb.BalanceRequest{
		AccountNumber:         0,
		RequiredConfirmations: 1,
	}
	balanceResponse, err := c.Balance(context.Background(), balanceRequest)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Spendable balance: ", dcrutil.Amount(balanceResponse.Spendable))
}
