package main

import (
	"context"
	"crypto/x509"
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"time"

	// walletjson "github.com/decred/dcrwallet/rpc/jsonrpc/types"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	walletrpc "decred.org/dcrwallet/rpc/walletrpc"
	proto "github.com/golang/protobuf/proto"
	gui "github.com/peterzen/dcrwalletgui/walletgui"

	"github.com/zserge/lorca"
)

var (
	gRPCConnection  *grpc.ClientConn  = nil
	currentEndpoint *gui.GRPCEndpoint = nil

	walletServiceClient        walletrpc.WalletServiceClient
	votingServiceClient        walletrpc.VotingServiceClient
	agendaServiceClient        walletrpc.AgendaServiceClient
	decodeMessageServiceClient walletrpc.DecodeMessageServiceClient
	mixerServiceClient         walletrpc.AccountMixerServiceClient
	ticketbuyerv2ServiceClient walletrpc.TicketBuyerV2ServiceClient

	ctx       context.Context    = nil
	ctxCancel context.CancelFunc = nil
)

// WalletAPIInit creates the context
func WalletAPIInit() {
	ctx, ctxCancel = context.WithCancel(context.Background())
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

	currentEndpoint = endpointCfg

	ctx, ctxCancel = context.WithCancel(context.Background())
	walletServiceClient = walletrpc.NewWalletServiceClient(gRPCConnection)
	votingServiceClient = walletrpc.NewVotingServiceClient(gRPCConnection)
	agendaServiceClient = walletrpc.NewAgendaServiceClient(gRPCConnection)
	decodeMessageServiceClient = walletrpc.NewDecodeMessageServiceClient(gRPCConnection)
	mixerServiceClient = walletrpc.NewAccountMixerServiceClient(gRPCConnection)
	ticketbuyerv2ServiceClient = walletrpc.NewTicketBuyerV2ServiceClient(gRPCConnection)

	monitorCtx, monitorCtxCancel := context.WithCancel(ctx)
	// @FIXME there must be a clean way of doing this.  We just need monitorCtx
	// to get cancelled along with the parent context.
	_ = monitorCtxCancel
	go monitorEndpoint(monitorCtx, walletServiceClient)

	return nil
}

// NewGRPCClient connects to the wallet gRPC server
func newGRPCClient(endpointCfg *gui.GRPCEndpoint) (*grpc.ClientConn, error) {
	// fmt.Printf("%#v", endpointCfg)
	var creds credentials.TransportCredentials = nil
	var err error = nil

	cp := x509.NewCertPool()
	if !cp.AppendCertsFromPEM([]byte(endpointCfg.CertBlob)) {
		return nil, fmt.Errorf("credentials: failed to append certificates")
	}
	creds = credentials.NewClientTLSFromCert(cp, "localhost")

	hostPort := fmt.Sprintf("%s:%d", endpointCfg.Hostname, endpointCfg.Port)
	conn, err := grpc.Dial(hostPort, grpc.WithTransportCredentials(creds))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return conn, nil
}

func subscribeTxNotifications(ui lorca.UI) {
	request := &walletrpc.TransactionNotificationsRequest{}
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
// 	request := &walletrpc.ConfirmationNotificationsRequest{}
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

	request := &walletrpc.AccountNotificationsRequest{}
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

func connectEndpoint(endpointID string, ui lorca.UI) (endpoint *gui.GRPCEndpoint, err error) {

	if isEndpointConnected() {
		disconnectEndpoint()
	}

	endpoints := gui.GetConfig().GetWalletEndpoints()
	endpoint = getEndpointByID(endpoints, endpointID)

	if endpoint == nil {
		return nil, errors.New("Endpoint not found")
	}
	isOK, err := checkGRPCConnection(endpoint)
	if !isOK {
		if err != nil {
			err = fmt.Errorf("Cannot connect to dcrwallet: %s", err.Error())
		} else {
			err = fmt.Errorf("Connection check failed for %s", endpoint.Label)
		}
		return nil, err
	}
	err = connectWallet(endpoint)
	if err != nil {
		err = fmt.Errorf("Cannot connect to dcrwallet: %s", err)
		return nil, err
	}
	cointType, err := getCointType()
	if cointType != nil {
		endpoint.CoinType = cointType.CoinType
	}
	if err != nil && grpc.Code(err) == 12 {
		endpoint.IsWatchingOnly = true
	}
	network, err := getNetwork()
	if network != nil {
		endpoint.ActiveNetwork = network.ActiveNetwork
	}
	subscribeNotifications(ui)
	return endpoint, nil
}

func getCointType() (*walletrpc.CoinTypeResponse, error) {
	request := &walletrpc.CoinTypeRequest{}
	coinType, err := walletServiceClient.CoinType(ctx, request)
	if err != nil {
		return nil, err
	}
	return coinType, nil
}

func getNetwork() (*walletrpc.NetworkResponse, error) {
	request := &walletrpc.NetworkRequest{}
	response, err := walletServiceClient.Network(ctx, request)
	if err != nil {
		return nil, err
	}
	return response, nil
}

func checkGRPCConnection(endpointCfg *gui.GRPCEndpoint) (bool, error) {
	gRPCConnection, err := newGRPCClient(endpointCfg)
	if err != nil {
		return false, err
	}
	walletServiceClient := walletrpc.NewWalletServiceClient(gRPCConnection)

	request := &walletrpc.PingRequest{}
	_, err = walletServiceClient.Ping(context.Background(), request)
	if err != nil {
		return false, err
	}
	return true, nil
}

var monitorEndPointChangeCallback func(bool, string, int64) = nil

// MonitorEndpoint pings the connected endpoint regularly and calls the
// supplied function when status changes.
func monitorEndpoint(ctx context.Context, cc walletrpc.WalletServiceClient) {

	request := &walletrpc.PingRequest{}

	lastConnectionStatus := true
	lastErrorMsg := ""
	var lastCheckedTimestamp int64 = 0

	for {
		time.Sleep(10 * time.Second)

		select {
		case <-ctx.Done():
			log.Printf("monitorEndpoint stopped")
			return
		default:
		}
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
