## dcrwalletgui 

This application is a multi platform Decred wallet application for power users running wallets in dedicated, secure environments.  It connects to existing `dcrwallet` instances; it is particularly tailored to expert users that are familiar with operating advanced setups.  For new users, [Decrediton](https://github.com/decred/decrediton) is a better choice.

## `dcrwallet` setup

`dcrwalletgui` connects to `dcrwallet` using GRPC, which can be enabled using the `grpclisten` option in `dcrwallet.conf`:

```
grpclisten=<IP:port>
nogrpc=0
nolegacyrpc=1
```

By default, `dcrwallet` listens on port 9111 (mainnet) or 19111 (testnet).  The specified IP and port must be accessible from the client machine.

## Build

### Linux (Debian, Ubuntu)

`./build-linux.sh`

### MacOS

`./build-macos.sh`

### Windows

TODO - [contribution welcome](https://github.com/peterzen/dcrwalletgui/issues/8)

## Development

1. Clone repo

`git clone --recurse-submodules https://github.com/peterzen/dcrwalletgui && cd dcrwalletgui`

2. Build and run React frontend 

```
cd frontend && yarn
yarn start
```

3. Open another terminal, and build and run app binary

`cd app && go build && ./dcrwalletgui`
