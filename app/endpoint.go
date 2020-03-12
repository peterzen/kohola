package main

import (
	"context"
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"time"

	// walletjson "github.com/decred/dcrwallet/rpc/jsonrpc/types"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"github.com/decred/dcrd/rpcclient/v6"
	pb "github.com/decred/dcrwallet/rpc/walletrpc"
	walletrpc "github.com/decred/dcrwallet/rpc/walletrpc"
	proto "github.com/golang/protobuf/proto"
	gui "github.com/peterzen/dcrwalletgui/dcrwalletgui"

	"github.com/zserge/lorca"
)

var (
	gRPCConnection *grpc.ClientConn  = nil
	rpcClient      *rpcclient.Client = nil

	walletServiceClient        pb.WalletServiceClient
	votingServiceClient        pb.VotingServiceClient
	agendaServiceClient        pb.AgendaServiceClient
	ticketbuyerv2ServiceClient pb.TicketBuyerV2ServiceClient

	ctx       context.Context    = nil
	ctxCancel context.CancelFunc = nil
)

// WalletAPIInit creates the context
func WalletAPIInit() {
	ctx, ctxCancel = createContext()
}

func createContext() (context.Context, context.CancelFunc) {
	ctx, cancel := context.WithCancel(context.Background())
	return ctx, cancel
}

// connectWallet creates a gRPC client connection
func connectWallet(endpointCfg *gui.GRPCEndpoint) error {

	var err error = nil
	gRPCConnection, err = newGRPCClient(endpointCfg)
	if err != nil {
		log.Println("rpc client error", err)
		return err
	}

	if ctxCancel != nil {
		ctxCancel()
	}

	ctx, ctxCancel = createContext()
	walletServiceClient = walletrpc.NewWalletServiceClient(gRPCConnection)
	votingServiceClient = walletrpc.NewVotingServiceClient(gRPCConnection)
	agendaServiceClient = walletrpc.NewAgendaServiceClient(gRPCConnection)
	ticketbuyerv2ServiceClient = walletrpc.NewTicketBuyerV2ServiceClient(gRPCConnection)

	go monitorEndpoint(walletServiceClient)

	return nil
}

// NewGRPCClient connects to the wallet gRPC server
func newGRPCClient(endpointCfg *gui.GRPCEndpoint) (*grpc.ClientConn, error) {
	// fmt.Printf("%#v", endpointCfg)

	creds, err := credentials.NewClientTLSFromFile(endpointCfg.CertFileName, "localhost")
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	hostPort := fmt.Sprintf("%s:%d", endpointCfg.Hostname, endpointCfg.Port)
	conn, err := grpc.Dial(hostPort, grpc.WithTransportCredentials(creds))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return conn, nil
}

func subscribeTxNotifications(ui lorca.UI) {
	request := &pb.TransactionNotificationsRequest{}
	ntfnStream, err := walletServiceClient.TransactionNotifications(ctx, request)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		ntfnResponse, err := ntfnStream.Recv()
		if err != nil {
			log.Printf("Failed to receive a TransactionNotificationsResponse: %#v", err)
		}
		b, err := proto.Marshal(ntfnResponse)
		if err != nil {
			return
		}
		encodedMsg := hex.EncodeToString(b)
		js := fmt.Sprintf("window.lorcareceiver__OnTxNotification('%s')", encodedMsg)
		ui.Eval(js)
	}
}

// func subscribeConfirmNotifications(ui lorca.UI) {
// 	request := &pb.ConfirmationNotificationsRequest{}
// 	ntfnStream, err := walletServiceClient.ConfirmationNotifications(ctx, request)
// 	if err != nil {
// 		fmt.Println(err)
// 		return
// 	}

// 	for {
// 		ntfnResponse, err := ntfnStream.Recv()
// 		if err != nil {
// 			log.Fatalf("Failed to receive a ConfirmationNotificationsResponse: %#v", err)
// 		}
// 		b, err := proto.Marshal(ntfnResponse)
// 		if err != nil {
// 			return
// 		}
// 		encodedMsg := hex.EncodeToString(b)
// 		js := fmt.Sprintf("window.lorcareceiver__OnConfirmNotification('%s')", encodedMsg)
// 		ui.Eval(js)
// 	}
// }

func subscribeAccountNotifications(ui lorca.UI) {

	request := &pb.AccountNotificationsRequest{}
	ntfnStream, err := walletServiceClient.AccountNotifications(ctx, request)

	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		ntfnResponse, err := ntfnStream.Recv()
		if err != nil {
			log.Printf("Failed to receive a AccountNotificationsResponse: %#v", err)
		}
		b, err := proto.Marshal(ntfnResponse)
		if err != nil {
			return
		}
		encodedMsg := hex.EncodeToString(b)
		js := fmt.Sprintf("window.lorcareceiver__OnAccountNotification('%s')", encodedMsg)
		ui.Eval(js)
	}
}

// SetupNotifications creates subscriptions
func subscribeNotifications(ui lorca.UI) {
	go subscribeTxNotifications(ui)
	go subscribeAccountNotifications(ui)
	// go subscribeConfirmNotifications(ui)
}

func isEndpointConnected() bool {
	return (gRPCConnection != nil)
}

func disconnectEndpoint() {
	if gRPCConnection == nil {
		return
	}
	gRPCConnection = nil
}

func connectEndpoint(endpointID string, ui lorca.UI) (err error) {

	if isEndpointConnected() {
		disconnectEndpoint()
	}

	endpoints := gui.GetConfig().GetWalletEndpoints()
	endpoint := getEndpointByID(endpoints, endpointID)

	if endpoint == nil {
		return errors.New("Endpoint not found")
	}
	isOK, err := checkGRPCConnection(endpoint)
	if !isOK {
		if err != nil {
			err = fmt.Errorf("Cannot connect to dcrwallet: %s", err.Error())
		} else {
			err = fmt.Errorf("Connection check failed for %s", endpoint.Label)
		}
		return err
	}
	err = connectWallet(endpoint)
	if err != nil {
		err = fmt.Errorf("Cannot connect to dcrwallet: %s", err)
		return err
	}
	subscribeNotifications(ui)
	return nil
}

func checkGRPCConnection(endpointCfg *gui.GRPCEndpoint) (bool, error) {
	gRPCConnection, err := newGRPCClient(endpointCfg)
	if err != nil {
		return false, err
	}
	walletServiceClient := walletrpc.NewWalletServiceClient(gRPCConnection)

	request := &pb.PingRequest{}
	_, err = walletServiceClient.Ping(context.Background(), request)
	if err != nil {
		return false, err
	}
	return true, nil
}

var monitorEndPointChangeCallback func(bool, string, int64) = nil

// MonitorEndpoint pings the connected endpoint regularly and calls the
// supplied function when status changes.
func monitorEndpoint(cc pb.WalletServiceClient) {

	request := &pb.PingRequest{}

	lastConnectionStatus := false
	lastErrorMsg := ""
	var lastCheckedTimestamp int64 = 0

	for {
		_, err := cc.Ping(ctx, request)

		lastCheckedTimestamp = time.Now().Unix()
		var isConnected bool

		if err != nil {
			isConnected = false
			lastErrorMsg = err.Error()
		} else {
			isConnected = true
			lastErrorMsg = ""
		}
		if isConnected != lastConnectionStatus {
			log.Printf("monitorEndpoint: status=%v (%s)", isConnected, lastErrorMsg)
			if monitorEndPointChangeCallback != nil {
				monitorEndPointChangeCallback(isConnected, lastErrorMsg, lastCheckedTimestamp)
			}
			lastConnectionStatus = isConnected
		}
		select {
		case <-ctx.Done():
			return
		default:
			time.Sleep(10 * time.Second)
		}
	}
}

func getEndpointByID(endpoints []*gui.GRPCEndpoint, id string) *gui.GRPCEndpoint {
	for _, endpoint := range endpoints {
		if endpoint.Id == id {
			return endpoint
		}
	}
	return nil
}

// TODO
// Make the below factory method work.  The idea is to have a factory method that
// emits wrapper functions, in order to do away with the above repetitive declarations.

type apiInterface func(context.Context, *struct{}, ...grpc.CallOption) (proto.Message, error)

func makeAPIEndpoint(requestClass *struct{}, method apiInterface) func() gui.LorcaMessage {
	return func() (r gui.LorcaMessage) {
		request := requestClass
		response, err := method(ctx, request)
		if err != nil {
			fmt.Println(err)
			r.Err = err
			return r
		}
		r.Payload, err = proto.Marshal(response)
		if err != nil {
			r.Err = err
			return r
		}
		return r
	}
}
