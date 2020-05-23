package walletgui

import (
	"github.com/getlantern/systray"
	"github.com/peterzen/kohola/icons/systray_icon"
	"github.com/peterzen/kohola/webview"
)

var (
	wv webview.Interface
)

// InitSystray initailze the systray
func InitSystray(w webview.Interface) {
	wv = w
	systray.Register(onReady, nil)
}

func onReady() {
	systray.SetTemplateIcon(systray_icon.Data, systray_icon.Data)
	systray.SetTitle("Kohola")
	systray.SetTooltip("Kohola")

	mShowWindow := systray.AddMenuItem("Show window", "")
	mQuit := systray.AddMenuItem("Quit", "Exit wallet")
	go func() {
		for {
			select {
			case <-mShowWindow.ClickedCh:
				wv.ShowWindow()
			case <-mQuit.ClickedCh:
				systray.Quit()
			}
		}
	}()
}
