package walletgui

import (
	"github.com/gen2brain/beeep"
	"github.com/peterzen/kohola/webview"
)

// ExportDesktopNotificationAPI exports miscellaneous desktop notification related helper methods to the JS frontend
func ExportDesktopNotificationAPI(w webview.Interface) {
	w.Bind("walletgui__SendDesktopNotification", func(title string, message string) (r LorcaMessage) {
		err := beeep.Notify(title, message, "icons/icon-256.png")
		if err != nil {
			r.Err = err
		}
		return r
	})
}
