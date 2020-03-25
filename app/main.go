package main

import (
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"runtime"

	proto "github.com/golang/protobuf/proto"
	exchangeratebot "github.com/peterzen/dcrwalletgui/exchangeratebot"
	gui "github.com/peterzen/dcrwalletgui/walletgui"

	"github.com/markbates/pkger"
	"github.com/sqweek/dialog"
	"github.com/zserge/lorca"
)

func main() {

	// go initSystray()

	WalletAPIInit()

	launchUI(func(ui lorca.UI) {

		bindUIAPI(ui)

		// @TODO pull these values from AppConfiguration
		altCurrencies := []string{"btc", "usd", "eur"}

		go exchangeratebot.Start(altCurrencies, func(rates *gui.AltCurrencyRates) {
			b, err := proto.Marshal(rates)
			if err != nil {
				log.Println("proto.Marshal", err)
				return
			}
			encodedMsg := hex.EncodeToString(b)
			js := fmt.Sprintf("window.lorcareceiver__OnExchangeRateUpdate('%s')", encodedMsg)
			ui.Eval(js)
		})
	})
}

func launchUI(callbackFn func(lorca.UI)) {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New("", "", 1200, 800, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	loadConfig(ui)
	callbackFn(ui)

	f, errIndexFile := pkger.Open("/www/index.html")
	if errIndexFile != nil {
		_ = ui.Load("http://localhost:8080")
	} else {
		f.Close()
		ln, err := net.Listen("tcp", "127.0.0.1:0")
		if err != nil {
			log.Fatal(err)
		}
		defer ln.Close()
		go http.Serve(ln, http.FileServer(pkger.Dir("/www")))
		ui.Load(fmt.Sprintf("http://%s", ln.Addr()))
	}

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
		currentIsConfigEncrypted := gui.GetConfig().GetMiscPreferences().GetIsConfigEncrypted()
		requestedIsConfigEncrypted := request.AppConfig.GetMiscPreferences().GetIsConfigEncrypted()
		passphrase := request.GetPassphrase()

		if !currentIsConfigEncrypted && requestedIsConfigEncrypted {
			fmt.Println("Turning on encryption")
			gui.SetPassphrase(passphrase)
		} else if currentIsConfigEncrypted && !requestedIsConfigEncrypted {
			fmt.Println("Turning off encryption")
			if passphrase != gui.GetPassphrase() {
				fmt.Println("Error: invalid passphrase")
				r.Err = errors.New("invalid passphrase")
				return r
			}
			gui.SetPassphrase("")
		}

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
	exchangeratebot.ExportExchangeRateAPI(ui)
	ExportStakingHistoryAPI(ui)
	ExportDcrdataAPI(ui)
}

func loadConfig(ui lorca.UI) {
	err := gui.LoadConfig()
	if err != nil {
		result := make(chan bool)
		go func() {
			ui.Load("data:text/html," + url.PathEscape(`
			<html lang="en">
				<head>
					<title>dcrwalletgui</title>
					<meta name="viewport" content="width=device-width">
					<link rel=icon href=data:,>
				</head>
				<style>
					.password {
						font-size: 40px;
						margin: 50px auto;
						display: block;
						padding: 20px;
						outline-width: 0;
					}
					::placeholder { 
						color: lightgrey;
					}				
					.error {
						color: red;
						border: 2px solid red;
					}
					.success {
						color: green;
						border: 2px solid lightgreen;
					}					
				</style>
				<script>
					document.addEventListener('DOMContentLoaded', function(event) {
  						var passwordInput = document.getElementById("passphrase");
						passwordInput.addEventListener("keydown", function (e) {
							document.getElementById('passphrase').className = 'password'
							if (e.keyCode === 13) {
								submitPassword();
							}
						});
						passwordInput.focus();					
					})
					const submitPassword = () => onPassphraseSubmit(document.getElementById('passphrase').value);
					const showError = () =>	document.getElementById('passphrase').className = 'password error';
					const showSuccess = () => document.getElementById('passphrase').className = 'password success';
				</script>
				<body>
					<input class="password" type="password" id="passphrase" placeholder="Enter your passphrase"/>
				</body>
			</html>
			`))

			ui.Bind("onPassphraseSubmit", func(passphrase string) {
				gui.SetPassphrase(passphrase)
				err := gui.LoadConfig()
				if err != nil {
					ui.Eval(`showError()`)
				} else {
					ui.Eval(`showSuccess()`)
					result <- true
				}
			})
		}()
		<-result
	} else if err != nil {
		log.Fatalf("Error in LoadConfig: %#v", err)
	}
}

func showDialog() {
	// dialog.Message("%s", "Please select a file").Title("Hello world!").Info()
	file, err := dialog.File().Title("Save As").Filter("All Files", "*").Save()
	fmt.Println(file)
	fmt.Println("Error:", err)
	dialog.Message("You chose file: %s", file).Title("Goodbye world!").Error()
	dialog.Directory().Title("Now find a dir").Browse()
}
