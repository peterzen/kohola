## dcrwalletgui 

This application is a multi platform Decred wallet application for power users having existing wallets running in secure environments.  It connects to existing `dcrwallet` instances.

## `dcrwallet` setup

`dcrwalletgui` connects to `dcrwallet` using GRPC, which can be enabled using the `grpclisten` option in `dcrwallet.conf`:

```
grpclisten=<IP:port>
nogrpc=0
nolegacyrpc=1
```

By default, `dcrwallet` listens on port 9111 (mainnet) or 19111 (testnet).  The specified IP and port must be accessible from the client machine.

## Development

1. Clone repo

`git clone https://github.com/peterzen/dcrwalletgui && cd dcrwalletgui`

2. Run prep script that creates `dcrwallet/rpc/walletrpc/go.mod` so that it can be `require`'d by the Go code:

`./prep-repo.sh`

3. Build and run React frontend 

`cd frontend && yarn`
`yarn start`

4. Open another terminal, and build and run app binary

`cd app && go build && ./dcrwalletgui`
