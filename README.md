## Kohola Decred Wallet 

<abbr title="'Kohola' means 'whale' in Hawaiian">Kohola</abbr> ("whale" in Hawaiian) is a multi platform Decred wallet application for power users running wallets in dedicated, secure environments.  It connects to existing `dcrwallet` instances; it is particularly tailored to expert users that are familiar with operating advanced setups.  For new users, [Decrediton](https://github.com/decred/decrediton) is a better choice.

## Differences to Decrediton

 * It connects to remote `dcrwallet`, does not keep wallet data on the local machine
 * Stores all its configuration in an encrypted form, protecting the user's privacy
 * Supports multiple wallet connections
 * Essential wallet features only
 * Solo staking support
 * Tighter desktop UI integration (OS notifications)
 * No Electron bloat

## Features

![Accounts overview](docs/Screenshot_kohola_2024-01-01_2.png)
### Coin control

### Security and privacy

Kohola protects connection credentials (RPC certificate) and all other connection information by storing its configuration in encrypted form (using AES).  This is optional, but highly recommended, along with a choosing a long, strong passphrase.  The passphrase is prompted when the application is started.

### Solo staking, governance

![Accounts overview](docs/Screenshot_kohola_2024-01-01_1.png)


### UTXO and transaction metadata

Unspent transaction outputs (spendable coins) can be labelled individually in order to keep tabs on the observers associated with a transaction.

### Market overview

![Accounts overview](docs/Screenshot_kohola_2024-01-01_3.png)


## Implementation

Kohola is a hybrid, cross platform application.  Its core that interacts with `dcrwallet` via gRPC is coded in Golang, while the user interface frontend is implemented in TypeScript, using the React and Redux frameworks.  The frontend and the backend communicate over a JSON RPC interface.

## Installation

### `dcrwallet` setup

Kohola connects to `dcrwallet` using GRPC, which can be enabled using the `grpclisten` option in `dcrwallet.conf`:

```
grpclisten=<IP:port>
nogrpc=0
nolegacyrpc=1
```

By default, `dcrwallet` listens on port 9111 (mainnet) or 19111 (testnet).  The specified IP and port must be accessible from the client machine.

## Build

### Linux (Debian, Ubuntu)

##### Dependencies:

 * `yarn`
 * `golang` 1.17
 * development packages:
 ```
 apt-get install libwebkit2gtk-4.0-dev \
	libgtk-3-dev \
	libcairo2-dev \
	libglib2.0-dev \
	libayatana-appindicator3-dev 
```

On Debian Buster, you'll need to install `libappindicator3-dev` instead of `libayatana-appindicator3-dev` for the time being.

`./build-linux.sh`

There is an experimental `Dockerfile` to build without having to install the dev dependencies:

`docker build -t user/kohola .`

### MacOS

`./build-macos.sh`


### Windows

TODO - [contribution welcome](https://github.com/peterzen/kohola/issues/8)

## Development

1. Clone repo

`git clone https://github.com/peterzen/kohola`

2. Build and run React frontend 

```
cd frontend && yarn
yarn start
```

3. Open another terminal, and build and run app binary

`cd app && go build && ./kohola`

