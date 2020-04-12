package main

import (
	"encoding/hex"
	"fmt"
	"log"
	"net"
	"net/http"

	proto "github.com/golang/protobuf/proto"
	exchangeratebot "github.com/peterzen/kohola/exchangeratebot"
	"github.com/peterzen/kohola/walletgui"

	"github.com/markbates/pkger"
)

func main() {

	WalletAPIInit()

	launchUI(func(ui walletgui.WebViewInterface) {

		bindUIAPI(ui)

		// @TODO pull these values from AppConfiguration
		altCurrencies := []string{"btc", "usd", "eur"}

		go exchangeratebot.Start(altCurrencies, func(rates *walletgui.AltCurrencyRates) {
			b, err := proto.Marshal(rates)
			if err != nil {
				log.Println("proto.Marshal", err)
				return
			}
			encodedMsg := hex.EncodeToString(b)
			js := fmt.Sprintf("window.lorcareceiver__OnExchangeRateUpdate('%s')", encodedMsg)
			walletgui.ExecuteJS(js)
		})

		// go walletgui.initSystray()

	})
}

func launchUI(callbackFn func(walletgui.WebViewInterface)) {

	w := walletgui.InitWebView()
	defer w.Destroy()

	callbackFn(w)

	f, errIndexFile := pkger.Open("/www/index.html")
	if errIndexFile != nil {
		w.Navigate("http://localhost:8080")
	} else {
		f.Close()
		ln, err := net.Listen("tcp", "127.0.0.1:0")
		if err != nil {
			log.Fatal(err)
		}
		defer ln.Close()
		go http.Serve(ln, http.FileServer(pkger.Dir("/www")))
		w.Navigate(fmt.Sprintf("http://%s", ln.Addr()))
	}

	w.Run()

	log.Println("exiting...")

}

func bindUIAPI(ui walletgui.WebViewInterface) {
	// captures the body.onload event from the frontend
	ui.Bind("start", func() {
		log.Println("UI is ready")
	})

	ui.Bind("closeApp", func() {
		fmt.Println("Closing the Chrome UI")
		// ui.Destroy()
	})

	ui.Bind("walletgui_FileOpenDialog", walletgui.FileOpenDialog)

	walletgui.ExportConfigAPI(ui)
	ExportWalletAPI(ui)
	exchangeratebot.ExportExchangeRateAPI(ui)
	ExportStakingHistoryAPI(ui)
	ExportDcrdataAPI(ui)
}
