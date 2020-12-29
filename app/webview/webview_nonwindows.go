//+build !windows

package webview

/*
#cgo linux pkg-config: webkit2gtk-4.0
#cgo darwin CFLAGS: -DDARWIN -x objective-c -fobjc-arc
#cgo darwin LDFLAGS: -framework Cocoa -framework Webkit

#include "webview.h"
*/
import "C"
import "unsafe"

func showWindow(window unsafe.Pointer) {
	C.showAppWindow(window)
}
