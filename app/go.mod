module github.com/peterzen/dcrwalletgui

go 1.13

require (
	decred.org/dcrwallet v1.2.3-0.20200322211959-ec65a80865c2
	github.com/decred/dcrd/dcrutil/v3 v3.0.0-20200311044114-143c1884e4c8
	github.com/decred/dcrd/txscript v1.1.0
	github.com/decred/dcrd/wire v1.3.0
	github.com/getlantern/systray v0.0.0-20200109124156-9abdfb6448b3
	github.com/go-resty/resty/v2 v2.2.0
	github.com/golang/protobuf v1.3.5
	github.com/gotk3/gotk3 v0.0.0-20200129211157-69caac910e50 // indirect
	github.com/kr/pretty v0.2.0 // indirect
	github.com/markbates/pkger v0.15.0
	github.com/sqweek/dialog v0.0.0-20190728103509-6254ed5b0d3c
	github.com/superoo7/go-gecko v1.0.0
	github.com/zserge/lorca v0.1.9
	google.golang.org/grpc v1.28.0
)

replace decred.org/dcrwallet => ../deps/dcrwallet
