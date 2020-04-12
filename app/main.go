package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/markbates/pkger"

	"github.com/peterzen/kohola/exchangeratebot"
	"github.com/peterzen/kohola/walletgui"
)

func main() {

	WalletAPIInit()

	w := walletgui.NewWebView()
	defer w.Destroy()

	bindUIAPI(w)

	// @TODO pull these values from AppConfiguration
	altCurrencies := []string{"btc", "usd", "eur"}

	go exchangeratebot.Start(altCurrencies)

	startUI(w)

	// go walletgui.initSystray()

}

func startUI(w walletgui.WebViewInterface) {

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

func bindUIAPI(w walletgui.WebViewInterface) {

	w.Bind("walletgui_CloseApp", func() {
		fmt.Println("Closing the Chrome UI")
		w.Destroy()
	})

	w.Bind("walletgui_FileOpenDialog", walletgui.FileOpenDialog)

	walletgui.ExportConfigAPI(w)
	ExportWalletAPI(w)
	exchangeratebot.ExportExchangeRateAPI(w)
	ExportStakingHistoryAPI(w)
	ExportDcrdataAPI(w)
}
