module github.com/peterzen/dcrwalletgui

go 1.13

require (
	github.com/Kairi/godash v0.0.0-20140922054955-402b6c21bf23
	github.com/aead/siphash v1.0.1 // indirect
	github.com/davecgh/go-spew v1.1.1
	github.com/dchest/blake256 v1.1.0 // indirect
	github.com/decred/dcrd/blockchain/stake v1.2.1 // indirect
	github.com/decred/dcrd/chaincfg v1.5.2 // indirect
	github.com/decred/dcrd/dcrec/secp256k1 v1.0.3 // indirect
	github.com/decred/dcrd/dcrjson/v3 v3.0.1
	github.com/decred/dcrd/dcrutil v1.3.0
	github.com/decred/dcrd/dcrutil/v3 v3.0.0-20200112011755-e3547d0822db
	github.com/decred/dcrd/gcs v1.1.0 // indirect
	github.com/decred/dcrd/rpc/jsonrpc/types/v2 v2.0.0
	github.com/decred/dcrd/rpcclient/v6 v6.0.0-20200131210503-db5916e60379
	github.com/decred/dcrwallet/errors v1.1.0
	github.com/decred/dcrwallet/rpc/jsonrpc/types v1.3.0
	github.com/decred/dcrwallet/rpc/walletrpc v0.3.0
	github.com/decred/go-socks v1.1.0
	github.com/getlantern/systray v0.0.0-20200109124156-9abdfb6448b3
	github.com/golang/protobuf v1.3.5
	github.com/gorilla/websocket v1.4.1
	github.com/gotk3/gotk3 v0.0.0-20200129211157-69caac910e50 // indirect
	github.com/jessevdk/go-flags v1.4.0
	github.com/kr/pretty v0.2.0 // indirect
	github.com/peterzen/dcrwalletgui/dcrwalletgui v0.0.0-00010101000000-000000000000
	github.com/peterzen/dcrwalletgui/exchangeratebot v0.0.0-00010101000000-000000000000
	github.com/sqweek/dialog v0.0.0-20190728103509-6254ed5b0d3c
	github.com/superoo7/go-gecko v1.0.0
	github.com/zserge/lorca v0.1.8
	golang.org/x/crypto v0.0.0-20200204104054-c9f3fb736b72 // indirect
	google.golang.org/grpc v1.28.0

)

replace (
	github.com/decred/dcrd/rpc/jsonrpc/types/v2 => ../deps/dcrd/rpc/jsonrpc/types/
	github.com/decred/dcrwallet/rpc/walletrpc v0.3.0 => ../deps/dcrwallet/rpc/walletrpc
	github.com/peterzen/dcrwalletgui/dcrwalletgui => ./walletgui
	github.com/peterzen/dcrwalletgui/exchangeratebot => ./exchangeratebot
)
