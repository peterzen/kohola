package walletgui

import "github.com/getlantern/systray"

func initSystray() {
	systray.Run(onReady, onExit)
}

func onReady() {
	// systray.SetIcon(icon.Data)
	systray.SetTitle("Kohola")
	systray.SetTooltip("Kohola")
	_ = systray.AddMenuItem("Quit", "Exit wallet")

	// Sets the icon of a menu item. Only available on Mac.
	// mQuit.SetIcon(icon.Data)
}

func onExit() {
	// clean up here
}
