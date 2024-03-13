module github.com/peterzen/kohola

go 1.17

require (
	decred.org/dcrwallet v1.2.3-0.20200322211959-ec65a80865c2
	github.com/decred/dcrd/chaincfg/chainhash v1.0.2
	github.com/decred/dcrd/chaincfg/v3 v3.0.0-20200311044114-143c1884e4c8
	github.com/decred/dcrd/dcrutil v1.3.0
	github.com/decred/dcrd/dcrutil/v3 v3.0.0-20200311044114-143c1884e4c8
	github.com/decred/dcrd/txscript v1.1.0
	github.com/decred/dcrd/txscript/v3 v3.0.0-20200311044114-143c1884e4c8
	github.com/decred/dcrd/wire v1.3.0
	github.com/decred/dcrwallet/wallet v1.3.0
	github.com/gen2brain/beeep v0.0.0-20200420150314-13046a26d502
	github.com/gen2brain/dlgs v0.0.0-20200211102745-b9c2664df42f
	github.com/getlantern/systray v1.2.0
	github.com/go-resty/resty/v2 v2.2.0
	github.com/golang/protobuf v1.5.0
	github.com/lxn/win v0.0.0-20210218163916-a377121e959e
	github.com/markbates/pkger v0.17.1
	github.com/sqweek/dialog v0.0.0-20200304031853-0dcd55bfe06a
	github.com/superoo7/go-gecko v1.0.0
	github.com/webview/webview v0.0.0-20210330151455-f540d88dde4e
	github.com/zserge/lorca v0.1.9
	google.golang.org/grpc v1.29.1
)

require (
	github.com/TheTitanrain/w32 v0.0.0-20180517000239-4f5cfb03fabf // indirect
	github.com/agl/ed25519 v0.0.0-20170116200512-5312a6153412 // indirect
	github.com/decred/base58 v1.0.2 // indirect
	github.com/decred/dcrd/blockchain v1.1.1 // indirect
	github.com/decred/dcrd/blockchain/stake v1.1.0 // indirect
	github.com/decred/dcrd/chaincfg v1.5.1 // indirect
	github.com/decred/dcrd/crypto/blake256 v1.0.0 // indirect
	github.com/decred/dcrd/crypto/ripemd160 v1.0.0 // indirect
	github.com/decred/dcrd/database v1.0.3 // indirect
	github.com/decred/dcrd/dcrec v1.0.0 // indirect
	github.com/decred/dcrd/dcrec/edwards v1.0.0 // indirect
	github.com/decred/dcrd/dcrec/edwards/v2 v2.0.0 // indirect
	github.com/decred/dcrd/dcrec/secp256k1 v1.0.2 // indirect
	github.com/decred/dcrd/dcrec/secp256k1/v3 v3.0.0-20200312171759-0a8cc56a776e // indirect
	github.com/decred/dcrwallet/errors v1.0.1 // indirect
	github.com/decred/dcrwallet/internal/helpers v1.0.1 // indirect
	github.com/decred/slog v1.0.0 // indirect
	github.com/getlantern/context v0.0.0-20190109183933-c447772a6520 // indirect
	github.com/getlantern/errors v0.0.0-20190325191628-abdb3e3e36f7 // indirect
	github.com/getlantern/golog v0.0.0-20190830074920-4ef2e798c2d7 // indirect
	github.com/getlantern/hex v0.0.0-20190417191902-c6586a6fe0b7 // indirect
	github.com/getlantern/hidden v0.0.0-20190325191715-f02dbb02be55 // indirect
	github.com/getlantern/ops v0.0.0-20190325191751-d70cb0d6f85f // indirect
	github.com/go-stack/stack v1.8.0 // indirect
	github.com/go-toast/toast v0.0.0-20190211030409-01e6764cf0a4 // indirect
	github.com/gobuffalo/here v0.6.2 // indirect
	github.com/godbus/dbus v4.1.0+incompatible // indirect
	github.com/gopherjs/gopherjs v0.0.0-20200217142428-fce0ec30dd00 // indirect
	github.com/gopherjs/gopherwasm v1.1.0 // indirect
	github.com/gotk3/gotk3 v0.6.1 // indirect
	github.com/nu7hatch/gouuid v0.0.0-20131221200532-179d4d0c4d8d // indirect
	github.com/oxtoacart/bpool v0.0.0-20190530202638-03653db5a59c // indirect
	github.com/tadvi/systray v0.0.0-20190226123456-11a2b8fa57af // indirect
	golang.org/x/crypto v0.0.0-20200214034016-1d94cc7ab1c6 // indirect
	golang.org/x/net v0.0.0-20200222125558-5a598a2470a0 // indirect
	golang.org/x/sys v0.0.0-20201018230417-eeed37f84f13 // indirect
	golang.org/x/text v0.3.2 // indirect
	golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543 // indirect
	google.golang.org/genproto v0.0.0-20190819201941-24fa4b261c55 // indirect
	google.golang.org/protobuf v1.33.0 // indirect
)

//replace decred.org/dcrwallet => ../deps/dcrwallet
