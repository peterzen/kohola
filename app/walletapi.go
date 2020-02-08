package main

import (
	"context"
	"encoding/hex"
	"fmt"
	"io"
	"log"

	// walletjson "github.com/decred/dcrwallet/rpc/jsonrpc/types"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"github.com/decred/dcrd/dcrutil"
	"github.com/decred/dcrd/rpcclient/v6"
	pb "github.com/decred/dcrwallet/rpc/walletrpc"
	walletrpc "github.com/decred/dcrwallet/rpc/walletrpc"
	proto "github.com/golang/protobuf/proto"
	gui "github.com/peterzen/dcrwalletgui/dcrwalletgui"

	"github.com/zserge/lorca"
)

var (
	gRPCConnection *grpc.ClientConn
	rpcClient      *rpcclient.Client

	walletServiceClient pb.WalletServiceClient
	votingServiceClient pb.VotingServiceClient
	agendaServiceClient pb.AgendaServiceClient
)

// InitFrontendGRPC creates a gRPC client connection
func InitFrontendGRPC(endpointCfg *gui.GRPCEndpoint) error {

	var err error = nil
	gRPCConnection, err = newGRPCClient(endpointCfg)
	if err != nil {
		log.Println("rpc client error", err)
		return err
	}

	walletServiceClient = walletrpc.NewWalletServiceClient(gRPCConnection)
	votingServiceClient = walletrpc.NewVotingServiceClient(gRPCConnection)
	agendaServiceClient = walletrpc.NewAgendaServiceClient(gRPCConnection)
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

func getBalance(accountNumber uint32, requiredConfirmations int32) (r gui.LorcaMessage) {

	request := &pb.BalanceRequest{
		AccountNumber:         accountNumber,
		RequiredConfirmations: requiredConfirmations,
	}

	balanceResponse, err := walletServiceClient.Balance(context.Background(), request)
	if err != nil {
		fmt.Println(err)
		r.Err = err
		return r
	}
	r.Payload, err = proto.Marshal(balanceResponse)
	if err != nil {
		r.Err = err
		return r
	}
	fmt.Println("Spendable balance: ", dcrutil.Amount(balanceResponse.Spendable))
	return r
}

func getStakeInfo() (r gui.LorcaMessage) {
	request := &pb.StakeInfoRequest{}
	response, err := walletServiceClient.StakeInfo(context.Background(), request)
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

func getAccounts() (r gui.LorcaMessage) {
	request := &pb.AccountsRequest{}
	response, err := walletServiceClient.Accounts(context.Background(), request)
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

func getTicketPrice() (r gui.LorcaMessage) {
	request := &pb.TicketPriceRequest{}
	response, err := walletServiceClient.TicketPrice(context.Background(), request)
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

func getBestBlock() (r gui.LorcaMessage) {
	request := &pb.BestBlockRequest{}
	response, err := walletServiceClient.BestBlock(context.Background(), request)
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

func getNetwork() (r gui.LorcaMessage) {
	request := &pb.NetworkRequest{}
	response, err := walletServiceClient.Network(context.Background(), request)
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

func getTickets(
	StartingBlockHeight int32,
	EndingBlockHeight int32,
	TargetTicketCount int32) (r gui.LorcaMessage) {
	request := &pb.GetTicketsRequest{
		StartingBlockHeight: StartingBlockHeight,
		EndingBlockHeight:   EndingBlockHeight,
		TargetTicketCount:   TargetTicketCount,
	}
	stream, err := walletServiceClient.GetTickets(context.Background(), request)
	if err != nil {
		fmt.Println(err)
		r.Err = err
		return r
	}
	r.APayload = make([][]byte, 0)
	for {
		ticket, err := stream.Recv()
		if err == io.EOF {
			return r
		}
		if err != nil {
			log.Fatalf("Failed to receive a TicketResponse : %v", err)
		}
		b, err := proto.Marshal(ticket)
		if err != nil {
			r.Err = err
			return r
		}
		r.APayload = append(r.APayload, b)
	}
}

func getTransactions(
	startingBlockHeight int32,
	endingBlockHeight int32,
	targetTransactionCount int32) (r gui.LorcaMessage) {
	request := &pb.GetTransactionsRequest{
		StartingBlockHeight:    startingBlockHeight,
		EndingBlockHeight:      endingBlockHeight,
		TargetTransactionCount: targetTransactionCount,
	}
	stream, err := walletServiceClient.GetTransactions(context.Background(), request)
	if err != nil {
		fmt.Println(err)
		r.Err = err
		return r
	}
	r.APayload = make([][]byte, 0)
	for {
		getTxResponse, err := stream.Recv()
		if err == io.EOF {
			return r
		}
		if err != nil {
			log.Fatalf("Failed to receive a GetTransactionsResponse: %#v", err)
		}
		b, err := proto.Marshal(getTxResponse)
		if err != nil {
			r.Err = err
			return r
		}
		r.APayload = append(r.APayload, b)
	}
}

func getVoteChoices() (r gui.LorcaMessage) {
	request := &pb.VoteChoicesRequest{}
	response, err := votingServiceClient.VoteChoices(context.Background(), request)
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

func doPing() (r gui.LorcaMessage) {
	request := &pb.PingRequest{}
	response, err := walletServiceClient.Ping(context.Background(), request)
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

func getNextAddress(
	account uint32,
	kind walletrpc.NextAddressRequest_Kind,
	gapPolicy walletrpc.NextAddressRequest_GapPolicy) (r gui.LorcaMessage) {
	request := &pb.NextAddressRequest{
		Account:   account,
		Kind:      kind,
		GapPolicy: gapPolicy,
	}
	response, err := walletServiceClient.NextAddress(context.Background(), request)
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

func constructTransaction(requestAsHex string) (r gui.LorcaMessage) {
	request := &pb.ConstructTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.ConstructTransaction(context.Background(), request)
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

func signTransaction(requestAsHex string) (r gui.LorcaMessage) {
	request := &pb.SignTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.SignTransaction(context.Background(), request)
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

func publishTransaction(requestAsHex string) (r gui.LorcaMessage) {
	request := &pb.PublishTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.PublishTransaction(context.Background(), request)
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

/*
uint32 account: Account number containing the keys controlling the output set to query.

int64 target_amount: If positive, the service may limit output results to those that sum to at least this amount (counted in Atoms). This may not be negative.

int32 required_confirmations: The minimum number of block confirmations needed to consider including an output in the return set. This may not be negative.

bool include_immature_coinbases: If true, immature coinbase outputs will also be included.
*/

func listUnspent(
	accountNumber uint32,
	targetAmount int64,
	requiredConfirmations int32,
	includeImmature bool) (r gui.LorcaMessage) {
	request := &pb.UnspentOutputsRequest{
		Account:                  accountNumber,
		TargetAmount:             targetAmount,
		RequiredConfirmations:    requiredConfirmations,
		IncludeImmatureCoinbases: includeImmature,
	}
	m, err := walletServiceClient.UnspentOutputs(context.Background(), request)
	if err != nil {
		log.Fatal(err)
	}

	unspents := make([][]byte, 0, 100)

	for {
		response, err := m.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			r.Err = err
			return r
		}
		b, err := proto.Marshal(response)
		if err != nil {
			r.Err = err
			return r
		}
		unspents = append(unspents, b)
	}

	r.APayload = unspents
	if err != nil {
		r.Err = err
		return r
	}
	return r
}

// // InitFrontendJSONApi initializes a JSON RPC connection to the wallet
// func InitFrontendJSONApi(cfg *gui.AppConfiguration) {
// 	var err error = nil
// 	rpcClient, err = NewJSONRpcClient(cfg)

// 	if err != nil {
// 		log.Println("InitFrontendApi error", err)
// 	}

// }

type notificationSubscriptions struct {
}

func subscribeTxNotifications(ui lorca.UI) {
	request := &pb.TransactionNotificationsRequest{}
	ntfnStream, err := walletServiceClient.TransactionNotifications(context.Background(), request)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		ntfnResponse, err := ntfnStream.Recv()
		if err != nil {
			log.Fatalf("Failed to receive a TransactionNotificationsResponse: %#v", err)
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
// 	ntfnStream, err := walletServiceClient.ConfirmationNotifications(context.Background(), request)
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
	ntfnStream, err := walletServiceClient.AccountNotifications(context.Background(), request)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		ntfnResponse, err := ntfnStream.Recv()
		if err != nil {
			log.Fatalf("Failed to receive a AccountNotificationsResponse: %#v", err)
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
func SetupNotifications(ui lorca.UI) {
	go subscribeTxNotifications(ui)
	go subscribeAccountNotifications(ui)
	// go subscribeConfirmNotifications(ui)
}

// ExportWalletAPI exports the RPC API functions to the UI
func ExportWalletAPI(ui lorca.UI) {

	ui.Bind("walletrpc__Ping", doPing)
	ui.Bind("walletrpc__GetNetwork", getNetwork)
	ui.Bind("walletrpc__GetBestBlock", getBestBlock)
	ui.Bind("walletrpc__GetVoteChoices", getVoteChoices)
	ui.Bind("walletrpc__GetBalance", getBalance)
	ui.Bind("walletrpc__GetAccounts", getAccounts)
	ui.Bind("walletrpc__GetStakeInfo", getStakeInfo)
	ui.Bind("walletrpc__GetTicketPrice", getTicketPrice)
	ui.Bind("walletrpc__GetTickets", getTickets)
	ui.Bind("walletrpc__ListUnspent", listUnspent)
	ui.Bind("walletrpc__NextAddress", getNextAddress)
	ui.Bind("walletrpc__GetTransactions", getTransactions)
	ui.Bind("walletrpc__ConstructTransaction", constructTransaction)
	ui.Bind("walletrpc__SignTransaction", signTransaction)
	ui.Bind("walletrpc__PublishTransaction", publishTransaction)

	ui.Bind("walletgui_CheckGRPCConnection", func(requestAsHex string) (r gui.CheckConnectionResponse) {
		cfg := &gui.GRPCEndpoint{}
		bytes, err := hex.DecodeString(requestAsHex)
		err = proto.Unmarshal(bytes, cfg)

		if err != nil {
			r.Error = err.Error()
		}
		isOK, err := checkGRPCConnection(cfg)
		if !isOK {
			r.IsSuccess = false
			r.Error = err.Error()
			return r
		}
		r.IsSuccess = true
		return r
	})
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

// TODO
// Make the below factory method work.  The idea is to have a factory method that
// emits wrapper functions, in order to do away with the above repetitive declarations.

type apiInterface func(context.Context, *struct{}, ...grpc.CallOption) (proto.Message, error)

func makeAPIEndpoint(requestClass *struct{}, method apiInterface) func() gui.LorcaMessage {
	return func() (r gui.LorcaMessage) {
		request := requestClass
		response, err := method(context.Background(), request)
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
