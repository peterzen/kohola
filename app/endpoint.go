package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/status"

	"decred.org/dcrwallet/rpc/walletrpc"
	"github.com/golang/protobuf/proto"
	"github.com/peterzen/kohola/walletgui"
	"github.com/peterzen/kohola/webview"
)

var (
	gRPCConnection  *grpc.ClientConn        = nil
	currentEndpoint *walletgui.GRPCEndpoint = nil

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
func connectWallet(endpointCfg *walletgui.GRPCEndpoint) error {

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
func newGRPCClient(endpointCfg *walletgui.GRPCEndpoint) (*grpc.ClientConn, error) {
	// fmt.Printf("%#v", endpointCfg)
	var err error = nil

	serverCAs := x509.NewCertPool()
	if !serverCAs.AppendCertsFromPEM([]byte(endpointCfg.CertBlob)) {
		return nil, fmt.Errorf("credentials: failed to append certificates")
	}
	keypair, err := tls.X509KeyPair([]byte(endpointCfg.ClientCertBlob), []byte(endpointCfg.ClientKeyBlob))
	if err != nil {
		return nil, fmt.Errorf("credentials: client cert not found")
	}
	creds := credentials.NewTLS(&tls.Config{
		Certificates: []tls.Certificate{keypair},
		RootCAs:      serverCAs,
	})

	hostPort := fmt.Sprintf("%s:%d", endpointCfg.Hostname, endpointCfg.Port)
	conn, err := grpc.Dial(hostPort, grpc.WithTransportCredentials(creds))
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return conn, nil
}

func subscribeTxNotifications(w webview.Interface) {
	request := &walletrpc.TransactionNotificationsRequest{}
	ntfnStream, err := walletServiceClient.TransactionNotifications(ctx, request)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		ntfnResponse, err := ntfnStream.Recv()
		if err == io.EOF {
			log.Printf("TransactionNotificationsResponse got io.EOF")
			return
		}
		if err != nil {
			log.Printf("Failed to receive a TransactionNotificationsResponse: %#v", err)
			return
		}
		if len(ntfnResponse.GetUnminedTransactions()) < 1 {
			continue
		}
		// mark cached change addresses as used
		usedAddressMonitor(ntfnResponse)

		b, err := proto.Marshal(ntfnResponse)
		if err != nil {
			return
		}
		encodedMsg := hex.EncodeToString(b)
		js := fmt.Sprintf("window.lorcareceiver__OnTxNotification('%s')", encodedMsg)
		webview.ExecuteJS(js)
	}
}

func subscribeConfirmNotifications(w webview.Interface) {
	// request := &walletrpc.ConfirmationNotificationsRequest{}
	ntfnStream, err := walletServiceClient.ConfirmationNotifications(ctx)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		ntfnResponse, err := ntfnStream.Recv()
		if err != nil {
			log.Fatalf("Failed to receive a ConfirmationNotificationsResponse: %#v", err)
		}
		b, err := proto.Marshal(ntfnResponse)
		if err != nil {
			return
		}
		encodedMsg := hex.EncodeToString(b)
		js := fmt.Sprintf("window.lorcareceiver__OnConfirmNotification('%s')", encodedMsg)
		webview.ExecuteJS(js)
	}
}

func subscribeAccountNotifications(w webview.Interface) {

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
		webview.ExecuteJS(js)
	}
}

// SetupNotifications creates subscriptions
func subscribeNotifications(w webview.Interface) {
	go subscribeTxNotifications(w)
	go subscribeAccountNotifications(w)
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

func connectEndpoint(endpointID string, w webview.Interface) (endpoint *walletgui.GRPCEndpoint, err error) {

	if isEndpointConnected() {
		disconnectEndpoint()
	}

	endpoints := walletgui.GetConfig().GetWalletEndpoints()
	endpoint = getEndpointByID(endpoints, endpointID)

	if endpoint == nil {
		return nil, errors.New("endpoint not found")
	}
	isOK, err := checkGRPCConnection(endpoint)
	if !isOK {
		if err != nil {
			err = fmt.Errorf("cannot connect to dcrwallet: %s", err.Error())
		} else {
			err = fmt.Errorf("connection check failed for %s", endpoint.Label)
		}
		return nil, err
	}
	err = connectWallet(endpoint)
	if err != nil {
		err = fmt.Errorf("cannot connect to dcrwallet: %s", err)
		return nil, err
	}
	cointType, err := getCointType()
	if cointType != nil {
		endpoint.CoinType = cointType.CoinType
	}
	if err != nil && status.Code(err) == 12 {
		endpoint.IsWatchingOnly = true
	}
	network, _ := getNetwork()
	if network != nil {
		endpoint.ActiveNetwork = network.ActiveNetwork
	}
	subscribeNotifications(w)
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

func checkGRPCConnection(endpointCfg *walletgui.GRPCEndpoint) (bool, error) {
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

func getEndpointByID(endpoints []*walletgui.GRPCEndpoint, id string) *walletgui.GRPCEndpoint {
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

func makeAPIEndpoint(requestClass *struct{}, method apiInterface) func() walletgui.LorcaMessage {
	return func() (r walletgui.LorcaMessage) {
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
