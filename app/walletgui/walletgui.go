package walletgui

import (
	"log"
	"os/exec"
	"runtime"

	"github.com/peterzen/kohola/webview"
)

// ExportGUIAPI exports miscellaneous GUI related helper methods to the JS frontend
func ExportGUIAPI(w webview.Interface) {
	w.Bind("walletgui__FileOpen", func(url string) {

		var err error
		switch runtime.GOOS {
		case "linux":
			err = exec.Command("xdg-open", url).Start()
			break
		case "windows":
			err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
			break
		case "darwin":
			err = exec.Command("open", url).Start()
			break
		}
		if err != nil {
			log.Printf(err.Error())
		}
	})
}
