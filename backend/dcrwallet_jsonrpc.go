package main

import (
	"io/ioutil"
	"log"

	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/decred/dcrd/rpcclient/v6"
)

// NewJSONRpcClient connects to the wallet JSON RPC
func NewJSONRpcClient(cfg *config) (*rpcclient.Client, error) {
	// Only override the handlers for notifications you care about.
	// Also note most of the handlers will only be called if you register
	// for notifications.  See the documentation of the rpcclient
	// NotificationHandlers type for more details about each handler.
	ntfnHandlers := rpcclient.NotificationHandlers{
		OnAccountBalance: func(account string, balance dcrutil.Amount, confirmed bool) {
			log.Printf("New balance for account %s: %v", account,
				balance)
		},
	}

	// Connect to local dcrwallet RPC server using websockets.
	certs, err := ioutil.ReadFile(cfg.RPCCert)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	connCfg := &rpcclient.ConnConfig{
		Host:         cfg.WalletRPCServer,
		Endpoint:     "ws",
		User:         cfg.RPCUser,
		Pass:         cfg.RPCPassword,
		Certificates: certs,
	}
	client, err := rpcclient.New(connCfg, &ntfnHandlers)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return client, nil

	// // Get the list of unspent transaction outputs (utxos) that the
	// // connected wallet has at least one private key for.
	// unspent, err := client.ListUnspent(context.Background())
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// log.Printf("Num unspent outputs (utxos): %d", len(unspent))
	// if len(unspent) > 0 {
	// 	log.Printf("First utxo:\n%v", spew.Sdump(unspent[0]))
	// }

	// For this example gracefully shutdown the client after 10 seconds.
	// Ordinarily when to shutdown the client is highly application
	// specific.
	// log.Println("Client shutdown in 10 seconds...")
	// time.AfterFunc(time.Second*10, func() {
	// 	log.Println("Client shutting down...")
	// 	client.Shutdown()
	// 	log.Println("Client shutdown complete.")
	// })

	// Wait until the client either shuts down gracefully (or the user
	// terminates the process with Ctrl+C).
	// client.WaitForShutdown()
}
