module github.com/peterzen/dcrwalletgui

go 1.13

require (
	github.com/decred/dcrd/chaincfg v1.5.2 // indirect
	github.com/decred/dcrd/dcrec/secp256k1 v1.0.3 // indirect
	github.com/decred/dcrd/dcrjson/v3 v3.0.1
	github.com/decred/dcrd/dcrutil v1.4.0
	github.com/decred/dcrd/dcrutil/v3 v3.0.0-20200112011755-e3547d0822db
	github.com/decred/dcrd/rpc/jsonrpc/types/v2 v2.0.0
	github.com/decred/dcrd/rpcclient/v6 v6.0.0-20200131210503-db5916e60379
	github.com/decred/dcrwallet/rpc/jsonrpc/types v1.3.0
	github.com/decred/dcrwallet/rpc/walletrpc v0.3.0
	github.com/decred/go-socks v1.1.0
	github.com/getlantern/systray v0.0.0-20200109124156-9abdfb6448b3
	github.com/golang/protobuf v1.3.2
	github.com/gorilla/websocket v1.4.1
	github.com/jessevdk/go-flags v1.4.0
	github.com/kr/pretty v0.2.0 // indirect
	github.com/onsi/ginkgo v1.7.0 // indirect
	github.com/onsi/gomega v1.4.3 // indirect
	github.com/zserge/lorca v0.1.8
	golang.org/x/crypto v0.0.0-20200128174031-69ecbb4d6d5d // indirect
	google.golang.org/grpc v1.27.0
	gopkg.in/check.v1 v1.0.0-20180628173108-788fd7840127 // indirect
	gopkg.in/yaml.v2 v2.2.2 // indirect

)

replace github.com/zserge/lorca => ../lorca
