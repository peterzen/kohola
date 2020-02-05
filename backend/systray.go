package main

import "github.com/getlantern/systray"

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
