package main

import (
	"context"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"log"
	"time"

	"decred.org/dcrwallet/rpc/walletrpc"
	"github.com/decred/dcrd/chaincfg/v3"
	"github.com/decred/dcrd/dcrutil/v3"
	"github.com/decred/dcrd/txscript/v3"
	"github.com/decred/dcrwallet/wallet/txrules"
	"github.com/golang/protobuf/proto"

	"github.com/peterzen/kohola/walletgui"
	"github.com/peterzen/kohola/webview"
)

// ExportWalletAPI exports the RPC API functions to the UI
func ExportWalletAPI(w webview.Interface) {

	var (
		tbCtx       context.Context
		tbCtxCancel context.CancelFunc

		mixerCtx       context.Context
		mixerCtxCancel context.CancelFunc
	)

	w.Bind("walletrpc__GetBestBlock", getBestBlock)
	w.Bind("walletrpc__GetVoteChoices", getVoteChoices)
	w.Bind("walletrpc__SetVoteChoices", setVoteChoices)
	w.Bind("walletrpc__GetAgendas", getAgendas)
	w.Bind("walletrpc__GetBalance", getBalance)
	w.Bind("walletrpc__GetAccounts", getAccounts)
	w.Bind("walletrpc__GetStakeInfo", getStakeInfo)
	w.Bind("walletrpc__GetTicketPrice", getTicketPrice)
	w.Bind("walletrpc__GetTickets", getTickets)
	w.Bind("walletrpc__ListUnspent", listUnspent)
	w.Bind("walletrpc__NextAddress", getNextAddress)
	w.Bind("walletrpc__NextAccount", getNextAccount)
	w.Bind("walletrpc__RenameAccount", renameAccount)
	w.Bind("walletrpc__GetTransactions", getTransactions)
	w.Bind("walletrpc__CreateTransaction", createTransaction)
	w.Bind("walletrpc__SignTransaction", signTransaction)
	w.Bind("walletrpc__PublishTransaction", publishTransaction)
	w.Bind("walletrpc__PublishUnminedTransactions", publishUnminedTransactions)
	w.Bind("walletrpc__PurchaseTickets", purchaseTickets)
	w.Bind("walletrpc__RevokeTickets", revokeExpiredTickets)
	w.Bind("walletrpc__DecodeRawTransaction", decodeRawTransaction)
	w.Bind("walletrpc__RunTicketBuyer", func(requestAsHex string, onErrorFnName string, onDoneFnName string, onStopFnName string) {

		onErrorFn := func(err error) {
			js := fmt.Sprintf("%s('%s')", onErrorFnName, err.Error())
			webview.ExecuteJS(js)
		}
		onDoneFn := func() {
			js := fmt.Sprintf("%s()", onDoneFnName)
			webview.ExecuteJS(js)
		}
		onStopFn := func() {
			js := fmt.Sprintf("%s()", onStopFnName)
			webview.ExecuteJS(js)
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

	w.Bind("walletrpc__StopTicketBuyer", func() {
		if tbCtxCancel != nil {
			tbCtxCancel()
		}
	})

	w.Bind("walletrpc__RunAccountMixer", func(requestAsHex string, onErrorFnName string, onDoneFnName string, onStopFnName string) {

		onErrorFn := func(err error) {
			js := fmt.Sprintf("%s('%s')", onErrorFnName, err.Error())
			webview.ExecuteJS(js)
		}
		onDoneFn := func() {
			js := fmt.Sprintf("%s()", onDoneFnName)
			webview.ExecuteJS(js)
		}
		onStopFn := func() {
			js := fmt.Sprintf("%s()", onStopFnName)
			webview.ExecuteJS(js)
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

	w.Bind("walletrpc__StopAccountMixer", func() {
		if mixerCtxCancel != nil {
			mixerCtxCancel()
		}
	})

	w.Bind("walletgui__ConnectWalletEndpoint", func(endpointID string) (r walletgui.LorcaMessage) {
		if !walletgui.HaveConfig() {
			r.Err = errors.New("Missing dcrwallet entry in config file")
			return r
		}
		endpoint, err := connectEndpoint(endpointID, w)
		r.Err = err
		if err == nil {
			r.Payload, _ = proto.Marshal(endpoint)
		}
		return r
	})

	w.Bind("walletgui__CheckGRPCConnection", func(requestAsHex string) (r walletgui.CheckConnectionResponse) {
		cfg := &walletgui.GRPCEndpoint{}
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
		webview.ExecuteJS(js)
	}
}

func getBalance(accountNumber uint32, requiredConfirmations int32) (r walletgui.LorcaMessage) {

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

func getStakeInfo() (r walletgui.LorcaMessage) {
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

func decodeRawTransaction(txAsHex string) (r walletgui.LorcaMessage) {
	txBytes, err := hex.DecodeString(txAsHex)
	request := &walletrpc.DecodeRawTransactionRequest{
		SerializedTransaction: txBytes,
	}
	response, err := decodeMessageServiceClient.DecodeRawTransaction(ctx, request)
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

func getAccounts() (r walletgui.LorcaMessage) {
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

func getTicketPrice() (r walletgui.LorcaMessage) {
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

func getAgendas() (r walletgui.LorcaMessage) {
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

func getVoteChoices() (r walletgui.LorcaMessage) {
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

func setVoteChoices(agendaID string, choiceID string) (r walletgui.LorcaMessage) {
	request := &walletrpc.SetVoteChoicesRequest{
		Choices: []*walletrpc.SetVoteChoicesRequest_Choice{
			{
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

func getBestBlock() (r walletgui.LorcaMessage) {
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
	TargetTicketCount int32) (r walletgui.LorcaMessage) {

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
	targetTransactionCount int32) (r walletgui.LorcaMessage) {
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
	gapPolicy walletrpc.NextAddressRequest_GapPolicy) (r walletgui.LorcaMessage) {
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
	passphrase string) (r walletgui.LorcaMessage) {
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
	newName string) (r walletgui.LorcaMessage) {

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

func createTransaction(requestAsHex string) (r walletgui.LorcaMessage) {
	request := &walletgui.CreateTransactionRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)

	if request.FeeRate == 0 {
		request.FeeRate = int32(txrules.DefaultRelayFeePerKb)
	}

	var response *walletrpc.ConstructTransactionResponse
	if request.SourceOutputs != nil && len(request.SourceOutputs) > 0 {
		// manual UTXO selection
		response, err = CreateTransaction(ctx, request)
	} else {
		// default automatic UTXO selection
		response, err = ConstructTransaction(ctx, request)
	}
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

func signTransaction(requestAsHex string) (r walletgui.LorcaMessage) {
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

func publishTransaction(requestAsHex string) (r walletgui.LorcaMessage) {
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

func publishUnminedTransactions(requestAsHex string) (r walletgui.LorcaMessage) {
	request := &walletrpc.PublishUnminedTransactionsRequest{}
	bytes, err := hex.DecodeString(requestAsHex)
	err = proto.Unmarshal(bytes, request)
	response, err := walletServiceClient.PublishUnminedTransactions(ctx, request)
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

func purchaseTickets(requestAsHex string) (r walletgui.LorcaMessage) {
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

func revokeExpiredTickets(passphrase string) (r walletgui.LorcaMessage) {
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
	includeImmature bool) (r walletgui.LorcaMessage) {

	request := &walletrpc.UnspentOutputsRequest{
		Account:                  accountNumber,
		TargetAmount:             targetAmount,
		RequiredConfirmations:    requiredConfirmations,
		IncludeImmatureCoinbases: includeImmature,
	}
	m, err := walletServiceClient.UnspentOutputs(ctx, request)
	if err != nil {
		log.Printf(err.Error())
		r.Err = err
		return r
	}

	// @TODO @FIXME this slice must be grown dynamically
	unspents := make([][]byte, 0, 100)

	for {
		u, err := m.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			r.Err = err
			return r
		}

		sc, addrs, _, err := txscript.ExtractPkScriptAddrs(0, u.PkScript, getChainParams())

		if err != nil {
			log.Printf("Error getting address from pkScript in %v", u.TransactionHash)
			continue
		}

		addressStr := make([]string, len(addrs))
		for i, addr := range addrs {
			addressStr[i] = addr.Address()
		}

		utxo := &walletgui.UnspentOutput{
			TransactionHash: u.TransactionHash,
			OutputIndex:     u.OutputIndex,
			Amount:          u.Amount,
			PkScript:        u.PkScript,
			ReceiveTime:     u.ReceiveTime,
			FromCoinbase:    u.FromCoinbase,
			Tree:            u.Tree,
			AmountSum:       u.AmountSum,
			ScriptClass:     int32(sc),
			Address:         addressStr[0],
		}

		b, err := proto.Marshal(utxo)
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

func getChainParams() *chaincfg.Params {
	switch currentEndpoint.Network {
	case walletgui.Network_TESTNET:
		return chaincfg.TestNet3Params()
	case walletgui.Network_SIMNET:
		return chaincfg.SimNetParams()
	case walletgui.Network_MAINNET:
		return chaincfg.MainNetParams()
	default:
		return nil
	}
}

type changeAddressCache map[string]*dcrutil.Address

var accountChangeAddressCache = make(map[uint32]changeAddressCache)

func getChangeAddress(accountNumber uint32) (address *dcrutil.Address, err error) {
	accountAddresses := accountChangeAddressCache[accountNumber]
	if accountAddresses == nil {
		accountChangeAddressCache[accountNumber] = make(changeAddressCache)
	}
	for _, addr := range accountChangeAddressCache[accountNumber] {
		if addr != nil {
			return addr, nil
		}
	}

	addr, err := getNewChangeAddress(accountNumber)
	if err != nil {
		return nil, err
	}

	addrStr := (*addr).Address()
	accountChangeAddressCache[accountNumber][addrStr] = addr
	return addr, nil
}

func getNewChangeAddress(accountNumber uint32) (address *dcrutil.Address, err error) {

	request := &walletrpc.NextAddressRequest{
		Account:   accountNumber,
		Kind:      walletrpc.NextAddressRequest_BIP0044_INTERNAL,
		GapPolicy: walletrpc.NextAddressRequest_GAP_POLICY_ERROR,
	}
	response, err := walletServiceClient.NextAddress(ctx, request)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	addr, err := dcrutil.DecodeAddress(response.Address, getChainParams())
	if err != nil {
		return nil, err
	}
	return &addr, nil
}

func usedAddressMonitor(ntfn *walletrpc.TransactionNotificationsResponse) {
	if ntfn == nil || len(ntfn.UnminedTransactions) < 1 {
		return
	}
	// harvest credit addresses from unmined transactions
	seenAddressList := make(map[string]bool)
	for _, txDetails := range ntfn.UnminedTransactions {
		for _, credit := range txDetails.Credits {
			seenAddressList[credit.Address] = true
		}
	}

	// set seen addresses to nil in address cache
	for account, addressCache := range accountChangeAddressCache {
		for address := range addressCache {
			if seenAddressList[address] == true {
				accountChangeAddressCache[account][address] = nil
			}
		}
	}
}
