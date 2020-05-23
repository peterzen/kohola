package webview

import (
	"unsafe"

	"github.com/lxn/win"
)

func showWindow(pointer unsafe.Pointer) {
	hwnd := (win.HWND)(pointer)
	win.ShowWindow(hwnd, win.SW_SHOWNORMAL)
	win.BringWindowToTop(hwnd)
}
