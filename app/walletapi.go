package main

import (
	"context"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"log"
	"time"

	walletrpc "decred.org/dcrwallet/rpc/walletrpc"
	"github.com/decred/dcrd/dcrutil/v3"
	proto "github.com/golang/protobuf/proto"
	gui "github.com/peterzen/dcrwalletgui/walletgui"

	"github.com/zserge/lorca"
)

// ExportWalletAPI exports the RPC API functions to the UI
func ExportWalletAPI(ui lorca.UI) {

	var (
		tbCtx       context.Context
		tbCtxCancel context.CancelFunc

		mixerCtx       context.Context
		mixerCtxCancel context.CancelFunc
	)

	ui.Bind("walletrpc__GetBestBlock", getBestBlock)
	ui.Bind("walletrpc__GetVoteChoices", getVoteChoices)
	ui.Bind("walletrpc__SetVoteChoices", setVoteChoices)
	ui.Bind("walletrpc__GetAgendas", getAgendas)
	ui.Bind("walletrpc__GetBalance", getBalance)
	ui.Bind("walletrpc__GetAccounts", getAccounts)
	ui.Bind("walletrpc__GetStakeInfo", getStakeInfo)
	ui.Bind("walletrpc__GetTicketPrice", getTicketPrice)
	ui.Bind("walletrpc__GetTickets", getTickets)
	ui.Bind("walletrpc__ListUnspent", listUnspent)
	ui.Bind("walletrpc__NextAddress", getNextAddress)
	ui.Bind("walletrpc__NextAccount", getNextAccount)
	ui.Bind("walletrpc__RenameAccount", renameAccount)
	ui.Bind("walletrpc__GetTransactions", getTransactions)
	ui.Bind("walletrpc__ConstructTransaction", constructTransaction)
	ui.Bind("walletrpc__CreateRawTransaction", createRawTransaction)
	ui.Bind("walletrpc__SignTransaction", signTransaction)
	ui.Bind("walletrpc__PublishTransaction", publishTransaction)
	ui.Bind("walletrpc__PurchaseTickets", purchaseTickets)
	ui.Bind("walletrpc__RevokeTickets", revokeExpiredTickets)
	ui.Bind("walletrpc__RunTicketBuyer", func(requestAsHex string, onErrorFnName string, onDoneFnName string, onStopFnName string) {

		onErrorFn := func(err error) {
			js := fmt.Sprintf("%s('%s')", onErrorFnName, err.Error())
			ui.Eval(js)
		}
		onDoneFn := func() {
			js := fmt.Sprintf("%s()", onDoneFnName)
			ui.Eval(js)
		}
		onStopFn := func() {
			js := fmt.Sprintf("%s()", onStopFnName)
			ui.Eval(js)
		}

		request := &walletrpc.RunTicketBuyerRequest{}
		bytes, err := hex.DecodeString(requestAsHex)
		err = proto.Unmarshal(bytes, request)
		if err != nil {
			fmt.Println(err)
			onErrorFn(err)
		}
		tbCtx, tbCtxCancel = context.WithCancel(ctx)
		runTicketbuyer(tbCtx, request, onErrorFn, onDoneFn, onStopFn)
	})

	ui.Bind("walletrpc__StopTicketBuyer", func() {
		if tbCtxCancel != nil {
			tbCtxCancel()
		}
	})

	ui.Bind("walletrpc__RunAccountMixer", func(requestAsHex string, onErrorFnName string, onDoneFnName string, onStopFnName string) {

		onErrorFn := func(err error) {
			js := fmt.Sprintf("%s('%s')", onErrorFnName, err.Error())
			ui.Eval(js)
		}
		onDoneFn := func() {
			js := fmt.Sprintf("%s()", onDoneFnName)
			ui.Eval(js)
		}
		onStopFn := func() {
			js := fmt.Sprintf("%s()", onStopFnName)
			ui.Eval(js)
		}

		request := &walletrpc.RunAccountMixerRequest{}
		bytes, err := hex.DecodeString(requestAsHex)
		err = proto.Unmarshal(bytes, request)
		if err != nil {
			fmt.Println(err)
			onErrorFn(err)
		}
		mixerCtx, mixerCtxCancel = context.WithCancel(ctx)
		runAccountMixer(mixerCtx, request, onErrorFn, onDoneFn, onStopFn)
	})

	ui.Bind("walletrpc__StopAccountMixer", func() {
		if mixerCtxCancel != nil {
			mixerCtxCancel()
		}
	})

	ui.Bind("walletgui__ConnectWalletEndpoint", func(endpointID string) (r gui.LorcaMessage) {
		if !gui.HaveConfig() {
			r.Err = errors.New("Missing dcrwallet entry in config file")
			return r
		}
		endpoint, err := connectEndpoint(endpointID, ui)
		r.Err = err
		if err == nil {
			r.Payload, _ = proto.Marshal(endpoint)
		}
		return r
	})

	ui.Bind("walletgui__CheckGRPCConnection", func(requestAsHex string) (r gui.CheckConnectionResponse) {
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

	monitorEndPointChangeCallback = func(isConnected bool, errMsg string, lastCheckTimestamp int64) {
		js := fmt.Sprintf(
			"window.lorcareceiver__onEndpointConnectionStatusChange(%t, '%s', %d)",
			isConnected, errMsg, lastCheckTimestamp)
		ui.Eval(js)
	}
}

func getBalance(accountNumber uint32, requiredConfirmations int32) (r gui.LorcaMessage) {

	request := &walletrpc.BalanceRequest{
		AccountNumber:         accountNumber,
		RequiredConfirmations: requiredConfirmations,
	}

	balanceResponse, err := walletServiceClient.Balance(ctx, request)
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
	request := &walletrpc.StakeInfoRequest{}
	response, err := walletServiceClient.StakeInfo(ctx, request)
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
	request := &walletrpc.AccountsRequest{}
	response, err := walletServiceClient.Accounts(ctx, request)
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
	request := &walletrpc.TicketPriceRequest{}
	response, err := walletServiceClient.TicketPrice(ctx, request)
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

func getAgendas() (r gui.LorcaMessage) {
	request := &walletrpc.AgendasRequest{}
	response, err := agendaServiceClient.Agendas(ctx, request)
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

func getVoteChoices() (r gui.LorcaMessage) {
	request := &walletrpc.VoteChoicesRequest{}
	response, err := votingServiceClient.VoteChoices(ctx, request)
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

func setVoteChoices(agendaID string, choiceID string) (r gui.LorcaMessage) {
	request := &walletrpc.SetVoteChoicesRequest{
		Choices: []*walletrpc.SetVoteChoicesRequest_Choice{
			&walletrpc.SetVoteChoicesRequest_Choice{
				AgendaId: agendaID,
				ChoiceId: choiceID,
			},
		},
	}
	response, err := votingServiceClient.SetVoteChoices(ctx, request)
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
	request := &walletrpc.BestBlockRequest{}
	response, err := walletServiceClient.BestBlock(ctx, request)
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
	request := &walletrpc.GetTicketsRequest{
		StartingBlockHeight: StartingBlockHeight,
		EndingBlockHeight:   EndingBlockHeight,
		TargetTicketCount:   TargetTicketCount,
	}
	stream, err := walletServiceClient.GetTickets(ctx, request)
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
			log.Printf("Failed to receive a TicketResponse : %v", err)
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
	request := &walletrpc.GetTransactionsRequest{
		StartingBlockHeight:    startingBlockHeight,
		EndingBlockHeight:      endingBlockHeight,
		TargetTransactionCount: targetTransactionCount,
	}
	stream, err := walletServiceClient.GetTransactions(ctx, request)
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
			log.Printf("Failed to receive a GetTransactionsResponse: %#v", err)
		}
		b, err := proto.Marshal(getTxResponse)
		if err != nil {
			r.Err = err
			return r
		}
		r.APayload = append(r.APayload, b)
	}
}

func getNextAddress(
	account uint32,
	kind walletrpc.NextAddressRequest_Kind,
	gapPolicy walletrpc.NextAddressRequest_GapPolicy) (r gui.LorcaMessage) {
	request := &walletrpc.NextAddressRequest{
		Account:   account,
		Kind:      kind,
		GapPolicy: gapPolicy,
	}
	response, err := walletServiceClient.NextAddress(ctx, request)
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

func getNextAccount(
	accountName string,
	passphrase string) (r gui.LorcaMessage) {
	pp := []byte(passphrase)

	request := &walletrpc.NextAccountRequest{
		AccountName: accountName,
		Passphrase:  pp,
	}
	response, err := walletServiceClient.NextAccount(ctx, request)
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

func renameAccount(
	accountNumber uint32,
	newName string) (r gui.LorcaMessage) {

	request := &walletrpc.RenameAccountRequest{
		AccountNumber: accountNumber,
		NewName:       newName,
	}

	response, err := walletServiceClient.RenameAccount(ctx, request)
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
	request := &walletrpc.ConstructTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.ConstructTransaction(ctx, request)
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

func createRawTransaction(requestAsHex string) (r gui.LorcaMessage) {
	request := &walletrpc.CreateRawTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.CreateRawTransaction(ctx, request)
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
	request := &walletrpc.SignTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.SignTransaction(ctx, request)
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
	request := &walletrpc.PublishTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.PublishTransaction(ctx, request)
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

func purchaseTickets(requestAsHex string) (r gui.LorcaMessage) {
	request := &walletrpc.PurchaseTicketsRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.PurchaseTickets(ctx, request)
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

func revokeExpiredTickets(passphrase string) (r gui.LorcaMessage) {
	request := &walletrpc.RevokeTicketsRequest{}
	request.Passphrase = []byte(passphrase)
	response, err := walletServiceClient.RevokeTickets(ctx, request)
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

func runTicketbuyer(ctx context.Context, request *walletrpc.RunTicketBuyerRequest, onErrorFn func(error), onDoneFn func(), onStopFn func()) {

	stream, err := ticketbuyerv2ServiceClient.RunTicketBuyer(ctx, request)
	if err != nil {
		fmt.Println(err)
		onErrorFn(err)
	}

	var tbErr error
	go func() {
		for {
			_, tbErr = stream.Recv()
			if tbErr == io.EOF {
				onStopFn()
				return
			}
			if tbErr != nil {
				log.Printf("runTicketbuyer: %#v", tbErr)
				onErrorFn(tbErr)
				return
			}
		}
	}()

	time.Sleep(2 * time.Second)

	if tbErr == nil {
		onDoneFn()
	}
}
func runAccountMixer(ctx context.Context, request *walletrpc.RunAccountMixerRequest, onErrorFn func(error), onDoneFn func(), onStopFn func()) {

	stream, err := mixerServiceClient.RunAccountMixer(ctx, request)
	if err != nil {
		fmt.Println(err)
		onErrorFn(err)
	}

	var tbErr error
	go func() {
		for {
			_, tbErr = stream.Recv()
			if tbErr == io.EOF {
				onStopFn()
				return
			}
			if tbErr != nil {
				log.Printf("runAccountMixer: %#v", tbErr)
				onErrorFn(tbErr)
				return
			}
		}
	}()

	time.Sleep(2 * time.Second)

	if tbErr == nil {
		onDoneFn()
	}
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
	request := &walletrpc.UnspentOutputsRequest{
		Account:                  accountNumber,
		TargetAmount:             targetAmount,
		RequiredConfirmations:    requiredConfirmations,
		IncludeImmatureCoinbases: includeImmature,
	}
	m, err := walletServiceClient.UnspentOutputs(ctx, request)
	if err != nil {
		log.Printf(err.Error())
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
