package walletgui

import (
	"github.com/zserge/webview"
)

// WebViewInterface abstracts lorca and WebView API
type WebViewInterface = webview.WebView

var w webview.WebView = nil

// NewWebView creates a new WebView
func NewWebView() webview.WebView {
	debug := true
	w = webview.New(debug)
	w.SetTitle("Kohola Wallet")
	w.SetSize(1200, 800, webview.HintNone)
	return w
}

// ExecuteJS runs the supplied JS code in the webview.
func ExecuteJS(js string) {
	if w == nil {
		return
	}

	w.Dispatch(func() {
		w.Eval(js)
	})
}