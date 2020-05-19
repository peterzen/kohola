module github.com/peterzen/kohola

go 1.13

require (
	decred.org/dcrwallet v1.2.3-0.20200322211959-ec65a80865c2
	github.com/decred/dcrd/chaincfg/chainhash v1.0.2
	github.com/decred/dcrd/chaincfg/v3 v3.0.0-20200311044114-143c1884e4c8
	github.com/decred/dcrd/dcrutil v1.3.0
	github.com/decred/dcrd/dcrutil/v3 v3.0.0-20200311044114-143c1884e4c8
	github.com/decred/dcrd/txscript v1.3.0
	github.com/decred/dcrd/txscript/v3 v3.0.0-20200311044114-143c1884e4c8
	github.com/decred/dcrd/wire v1.3.0
	github.com/decred/dcrwallet/wallet v1.3.0
	github.com/gen2brain/beeep v0.0.0-20200420150314-13046a26d502
	github.com/gen2brain/dlgs v0.0.0-20200211102745-b9c2664df42f
	github.com/getlantern/systray v0.0.0-20200518005515-1e7b8346e907
	github.com/go-resty/resty/v2 v2.2.0
	github.com/golang/protobuf v1.4.2
	github.com/gopherjs/gopherjs v0.0.0-20200217142428-fce0ec30dd00 // indirect
	github.com/gotk3/gotk3 v0.0.0-20200129211157-69caac910e50 // indirect
	github.com/kr/pretty v0.2.0 // indirect
	github.com/markbates/pkger v0.16.0
	github.com/sqweek/dialog v0.0.0-20200304031853-0dcd55bfe06a
	github.com/superoo7/go-gecko v1.0.0
	github.com/zserge/lorca v0.1.9
	github.com/zserge/webview v0.0.0-20200516134046-4caf698fad53
	google.golang.org/grpc v1.29.1
)

//replace decred.org/dcrwallet => ../deps/dcrwallet
