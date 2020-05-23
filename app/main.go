package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/markbates/pkger"

	"github.com/peterzen/kohola/exchangeratebot"
	"github.com/peterzen/kohola/walletgui"
	"github.com/peterzen/kohola/webview"

	_ "net/http/pprof"
)

func main() {

	// go func() {
	// 	log.Println(http.ListenAndServe("localhost:6060", nil))
	// }()

	walletgui.InitConfig("")

	WalletAPIInit()

	w := webview.New(false)
	defer w.Destroy()

	bindUIAPI(w)
	walletgui.InitSystray(w)

	startUI(w)

}

func startUI(w webview.Interface) {

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

func bindUIAPI(w webview.Interface) {

	walletgui.ExportConfigAPI(w)
	walletgui.ExportGUIAPI(w)
	walletgui.ExportDesktopNotificationAPI(w)
	ExportWalletAPI(w)
	ExportStakingHistoryAPI(w)
	ExportDcrdataAPI(w)
	exchangeratebot.ExportExchangeRateAPI(w)

	// @TODO pull these values from AppConfiguration
	altCurrencies := []string{"btc", "usd", "eur"}

	w.Bind("walletgui_onAppOpen", func() {
		fmt.Println("App booted")
		go exchangeratebot.Start(ctx, altCurrencies)
	})

	w.Bind("walletgui_CloseApp", func() {
		fmt.Println("Closing the Chrome UI")
		w.Destroy()
	})

	w.Bind("walletgui_FileOpenDialog", walletgui.FileOpenDialog)
}
