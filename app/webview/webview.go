package webview

import (
	"fmt"
	"os"
	"os/signal"
	"runtime"

	"github.com/webview/webview"
	"github.com/zserge/lorca"
)

// Interface abstracts lorca and WebView APIs
type Interface interface {
	Run()
	Navigate(url string)
	Eval(js string)
	Bind(name string, f interface{}) error
	Destroy()
	ShowWindow()
}

type webviewUI struct {
	w webview.WebView
}

// NewWebview creates a new Webview
func NewWebview() Interface {
	ui := &webviewUI{}
	ui.w = webview.New(true)
	ui.w.SetTitle("Kohola Wallet")
	ui.w.SetSize(1200, 800, webview.HintNone)
	return ui
}

func (ui *webviewUI) Run() {
	ui.w.Run()
}

func (ui *webviewUI) Destroy() {
	ui.w.Destroy()
}

func (ui *webviewUI) Navigate(url string) {
	ui.w.Navigate(url)
}

func (ui *webviewUI) Eval(js string) {
	ui.w.Dispatch(func() {
		ui.w.Eval(js)
	})
}

func (ui *webviewUI) Bind(name string, f interface{}) error {
	return ui.w.Bind(name, f)
}

func (ui *webviewUI) ShowWindow() {
	window := ui.w.Window()
	showWindow(window)
}

// Lorca

type lorcaUI struct {
	w lorca.UI
}

// NewLorca creates a new Lorca
func NewLorca() Interface {
	ui := &lorcaUI{}
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	u, _ := lorca.New("", "", 1200, 800, args...)
	ui.w = u
	return ui
}

func (ui *lorcaUI) Run() {
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.w.Done():
	}
}

func (ui *lorcaUI) Destroy() {
	ui.w.Close()
}

func (ui *lorcaUI) Navigate(url string) {
	ui.w.Load(url)
}

func (ui *lorcaUI) Eval(js string) {
	ui.w.Eval(js)
}

func (ui *lorcaUI) Bind(name string, f interface{}) error {
	return ui.w.Bind(name, f)
}

func (ui *lorcaUI) ShowWindow() {
	fmt.Println("Not supported in LorcaUI")
}

var wvInstance Interface

// New creates a Webview or Lorca instance
func New(production bool) Interface {
	if production {
		wvInstance = NewWebview()
	} else {
		wvInstance = NewLorca()
	}
	return wvInstance
}

// ExecuteJS runs the supplied JS code in the webview.
func ExecuteJS(js string) {
	if wvInstance == nil {
		return
	}

	wvInstance.Eval(js)
}

// Navigate navigates webview to the given URL
func Navigate(url string) {
	wvInstance.Navigate(url)
}

// Bind binds a callback function
func Bind(name string, f interface{}) error {
	return wvInstance.Bind(name, f)
}
