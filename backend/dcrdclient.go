package main

/*
import (
	"context"
	"io/ioutil"
	"log"
	"path/filepath"
	"time"

	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/decred/dcrd/rpcclient/v6"
)

func GetNotificationHandlers(
	onBlockConnected func(blockHeader []byte, transactions [][]byte),
	onBlockDisconnected func(blockHeader []byte)

) NotificationHandlers{
	// Only override the handlers for notifications you care about.
	// Also note most of these handlers will only be called if you register
	// for notifications.  See the documentation of the rpcclient.
	// NotificationHandlers type for more details about each handler.
	ntfnHandlers := rpcclient.NotificationHandlers{
		OnBlockConnected:onBlockConnected,
		OnBlockDisconnected: onBlockDisconnected
	}
	return ntfnHandlers
}

func NewDcrdClient(cfg *config) {


	// Connect to local dcrd RPC server using websockets.
	certs, err := ioutil.ReadFile("../dcrd-simnet.cert"))
	if err != nil {
		log.Fatal(err)
	}
	connCfg := &rpcclient.ConnConfig{
		Host:         "localhost:19556",
		Endpoint:     "ws",
		User:         "gcUGfbMiULCnMm5OkmtDiS845GI=",
		Pass:         "azU+CHeww4WgmBTtRrmyoahL81U=",
		Certificates: certs,
	}
	// client, err := rpcclient.New(connCfg, &ntfnHandlers)
	client, err := rpcclient.New(connCfg)
	if err != nil {
		log.Fatal(err)
	}

	// Register for block connect and disconnect notifications.
	ctx := context.Background()
	if err := client.NotifyBlocks(ctx); err != nil {
		log.Fatal(err)
	}
	log.Println("NotifyBlocks: Registration Complete")

	// Get the current block count.
	blockCount, err := client.GetBlockCount(ctx)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Block count: %d", blockCount)

	// For this example gracefully shutdown the client after 10 seconds.
	// Ordinarily when to shutdown the client is highly application
	// specific.
	log.Println("Client shutdown in 10 seconds...")
	time.AfterFunc(time.Second*10, func() {
		log.Println("Client shutting down...")
		client.Shutdown()
		log.Println("Client shutdown complete.")
	})

	// Wait until the client either shuts down gracefully (or the user
	// terminates the process with Ctrl+C).
	client.WaitForShutdown()
}
*/
