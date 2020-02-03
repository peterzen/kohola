// Copyright (c) 2013-2015 The btcsuite developers
// Copyright (c) 2015-2019 The Decred developers
// Use of this source code is governed by an ISC
// license that can be found in the LICENSE file.

package main

import (
	"fmt"
	"github.com/decred/dcrd/dcrutil"
	pb "github.com/decred/dcrwallet/rpc/walletrpc"

	"context"
	"github.com/getlantern/systray"
	"github.com/zserge/lorca"
	"log"
	"os"
	"os/signal"
	"runtime"
	"sync"
)

var walletServiceClient pb.WalletServiceClient

func main() {

	// go initSystray()

	cfg, _, err := loadConfig()
	if err != nil {
		log.Println("Load config error", err)
		os.Exit(1)
	}

	walletServiceClient, err = NewWalletClient(cfg)
	if err != nil {
		log.Println("rpc client error", err)
	}
	// fmt.Println("%v", walletServiceClient)

	DoBalanceRequest(walletServiceClient)

	launchUI()
}

type balance struct {
	sync.Mutex
	request *pb.BalanceRequest
}

type lorcaBalanceResponse struct {
	Payload *pb.BalanceResponse `json:"payload,omitempty"`
	Err     error               `json:"error,omitempty"`
}

func (b *balance) GetBalance(accountNumber uint32, requiredConfirmations int32) (r lorcaBalanceResponse) {
	b.Lock()
	defer b.Unlock()

	b.request = &pb.BalanceRequest{
		AccountNumber:         accountNumber,
		RequiredConfirmations: requiredConfirmations,
	}

	balanceResponse, err := walletServiceClient.Balance(context.Background(), b.request)
	if err != nil {
		fmt.Println(err)
		r.Err = err
		return r
	}
	r.Payload = balanceResponse
	fmt.Println("Spendable balance: ", dcrutil.Amount(balanceResponse.Spendable))
	return r
}

func launchUI() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New("https://localhost:8081", "", 1024, 800, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	// A simple way to know when UI is ready (uses body.onload event in JS)
	ui.Bind("start", func() {
		log.Println("UI is ready")
	})

	ui.Bind("closeApp", func() {
		fmt.Println("Closing the Chrome UI")
		ui.Close()
	})

	b := &balance{}
	ui.Bind("GetBalance", b.GetBalance)

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	log.Println("exiting...")
}

func initSystray() {
	systray.Run(onReady, onExit)
}

func onReady() {
	// systray.SetIcon(icon.Data)
	systray.SetTitle("dcrwalletgui")
	systray.SetTooltip("dcrwalletgui")
	_ = systray.AddMenuItem("Quit", "Exit wallet")

	// Sets the icon of a menu item. Only available on Mac.
	// mQuit.SetIcon(icon.Data)
}

func onExit() {
	// clean up here
}

func showDialog() {
	// dialog.Message("%s", "Please select a file").Title("Hello world!").Info()
	// file, err := dialog.File().Title("Save As").Filter("All Files", "*").Save()
	// fmt.Println(file)
	// fmt.Println("Error:", err)
	// dialog.Message("You chose file: %s", file).Title("Goodbye world!").Error()
	// dialog.Directory().Title("Now find a dir").Browse()
}

func onBlockConnected(blockHeader []byte, transactions [][]byte) {
	log.Printf("Block connected: %v %v", blockHeader, transactions)
}
func onBlockDisconnected(blockHeader []byte) {
	log.Printf("Block disconnected: %v", blockHeader)
}
