// Copyright (c) 2013-2015 The btcsuite developers
// Copyright (c) 2015-2019 The Decred developers
// Use of this source code is governed by an ISC
// license that can be found in the LICENSE file.

package main

import (
	"fmt"

	"github.com/zserge/lorca"
	"log"
	"os"
	"os/signal"
	"runtime"
)

func main() {

	// go initSystray()

	cfg, _, err := loadConfig()
	if err != nil {
		log.Println("Load config error", err)
		os.Exit(1)
	}

	// InitFrontendApi(cfg)

	InitFrontendGRPC(cfg)

	launchUI()
}

func launchUI() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New("https://localhost:8080", "", 1024, 800, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	// captures the body.unload event from the frontend
	ui.Bind("start", func() {
		log.Println("UI is ready")
	})

	ui.Bind("closeApp", func() {
		fmt.Println("Closing the Chrome UI")
		ui.Close()
	})

	ExportAPI(ui)

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	log.Println("exiting...")
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
