// Copyright (c) 2013-2015 The btcsuite developers
// Copyright (c) 2015-2019 The Decred developers
// Use of this source code is governed by an ISC
// license that can be found in the LICENSE file.

package main

import (
	"encoding/hex"
	"fmt"
	"log"
	"os"
	"os/signal"
	"runtime"

	proto "github.com/golang/protobuf/proto"
	gui "github.com/peterzen/dcrwalletgui/dcrwalletgui"

	"github.com/sqweek/dialog"
	"github.com/zserge/lorca"
)

func main() {

	// go initSystray()

	launchUI(func(ui lorca.UI) {
		err := gui.LoadConfig()
		if err != nil {
			log.Fatalf("Error in LoadConfig: %#v", err)
		}

		bindUIAPI(ui)
	})
}

func launchUI(callbackFn func(lorca.UI)) {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New("https://localhost:8080", "", 1200, 800, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	callbackFn(ui)

	// _ = ui.Load("https://localhost:8080")

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	log.Println("exiting...")
}

func bindUIAPI(ui lorca.UI) {
	// captures the body.onload event from the frontend
	ui.Bind("start", func() {
		log.Println("UI is ready")
	})

	ui.Bind("closeApp", func() {
		fmt.Println("Closing the Chrome UI")
		ui.Close()
	})

	ui.Bind("walletgui__GetConfig", func() (r gui.LorcaMessage) {
		// signal the UI that the configuration is empty, needs initial setup
		if !gui.HaveConfig() {
			r.Payload = nil
			r.Err = nil
			return r
		}
		r.Payload, r.Err = gui.GetConfigMarshaled()
		return r
	})

	ui.Bind("walletgui__SetConfig", func(requestAsHex string) (r gui.LorcaMessage) {
		request := &gui.SetConfigRequest{}
		bytes, err := hex.DecodeString(requestAsHex)
		err = proto.Unmarshal(bytes, request)
		gui.SetConfig(request.AppConfig)

		err = gui.WriteConfig()
		if err != nil {
			r.Err = err
			return r
		}

		// initializeApplication()
		return r
	})

	ui.Bind("walletgui_FileOpenDialog", func() string {
		file, _ := dialog.File().Title("Open").Filter("All Files", "*").Filter("Certs", "cert").Load()
		return file
	})

	ExportWalletAPI(ui)
}

func showDialog() {
	// dialog.Message("%s", "Please select a file").Title("Hello world!").Info()
	file, err := dialog.File().Title("Save As").Filter("All Files", "*").Save()
	fmt.Println(file)
	fmt.Println("Error:", err)
	dialog.Message("You chose file: %s", file).Title("Goodbye world!").Error()
	dialog.Directory().Title("Now find a dir").Browse()
}
