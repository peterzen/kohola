// package: walletrpc
// file: api.proto

import * as api_pb from "./api_pb";
import {grpc} from "@improbable-eng/grpc-web";

type VersionServiceVersion = {
  readonly methodName: string;
  readonly service: typeof VersionService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.VersionRequest;
  readonly responseType: typeof api_pb.VersionResponse;
};

export class VersionService {
  static readonly serviceName: string;
  static readonly Version: VersionServiceVersion;
}

type WalletServicePing = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.PingRequest;
  readonly responseType: typeof api_pb.PingResponse;
};

type WalletServiceNetwork = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.NetworkRequest;
  readonly responseType: typeof api_pb.NetworkResponse;
};

type WalletServiceCoinType = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CoinTypeRequest;
  readonly responseType: typeof api_pb.CoinTypeResponse;
};

type WalletServiceAccountNumber = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.AccountNumberRequest;
  readonly responseType: typeof api_pb.AccountNumberResponse;
};

type WalletServiceAccounts = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.AccountsRequest;
  readonly responseType: typeof api_pb.AccountsResponse;
};

type WalletServiceBalance = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.BalanceRequest;
  readonly responseType: typeof api_pb.BalanceResponse;
};

type WalletServiceGetAccountExtendedPubKey = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetAccountExtendedPubKeyRequest;
  readonly responseType: typeof api_pb.GetAccountExtendedPubKeyResponse;
};

type WalletServiceGetAccountExtendedPrivKey = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetAccountExtendedPrivKeyRequest;
  readonly responseType: typeof api_pb.GetAccountExtendedPrivKeyResponse;
};

type WalletServiceGetTransaction = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetTransactionRequest;
  readonly responseType: typeof api_pb.GetTransactionResponse;
};

type WalletServiceGetTransactions = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.GetTransactionsRequest;
  readonly responseType: typeof api_pb.GetTransactionsResponse;
};

type WalletServiceGetTicket = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetTicketRequest;
  readonly responseType: typeof api_pb.GetTicketsResponse;
};

type WalletServiceGetTickets = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.GetTicketsRequest;
  readonly responseType: typeof api_pb.GetTicketsResponse;
};

type WalletServiceTicketPrice = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.TicketPriceRequest;
  readonly responseType: typeof api_pb.TicketPriceResponse;
};

type WalletServiceStakeInfo = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.StakeInfoRequest;
  readonly responseType: typeof api_pb.StakeInfoResponse;
};

type WalletServiceBlockInfo = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.BlockInfoRequest;
  readonly responseType: typeof api_pb.BlockInfoResponse;
};

type WalletServiceBestBlock = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.BestBlockRequest;
  readonly responseType: typeof api_pb.BestBlockResponse;
};

type WalletServiceSpender = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SpenderRequest;
  readonly responseType: typeof api_pb.SpenderResponse;
};

type WalletServiceTransactionNotifications = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.TransactionNotificationsRequest;
  readonly responseType: typeof api_pb.TransactionNotificationsResponse;
};

type WalletServiceAccountNotifications = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.AccountNotificationsRequest;
  readonly responseType: typeof api_pb.AccountNotificationsResponse;
};

type WalletServiceConfirmationNotifications = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.ConfirmationNotificationsRequest;
  readonly responseType: typeof api_pb.ConfirmationNotificationsResponse;
};

type WalletServiceChangePassphrase = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ChangePassphraseRequest;
  readonly responseType: typeof api_pb.ChangePassphraseResponse;
};

type WalletServiceRenameAccount = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RenameAccountRequest;
  readonly responseType: typeof api_pb.RenameAccountResponse;
};

type WalletServiceRescan = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.RescanRequest;
  readonly responseType: typeof api_pb.RescanResponse;
};

type WalletServiceNextAccount = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.NextAccountRequest;
  readonly responseType: typeof api_pb.NextAccountResponse;
};

type WalletServiceNextAddress = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.NextAddressRequest;
  readonly responseType: typeof api_pb.NextAddressResponse;
};

type WalletServiceImportPrivateKey = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ImportPrivateKeyRequest;
  readonly responseType: typeof api_pb.ImportPrivateKeyResponse;
};

type WalletServiceImportScript = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ImportScriptRequest;
  readonly responseType: typeof api_pb.ImportScriptResponse;
};

type WalletServiceFundTransaction = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.FundTransactionRequest;
  readonly responseType: typeof api_pb.FundTransactionResponse;
};

type WalletServiceUnspentOutputs = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.UnspentOutputsRequest;
  readonly responseType: typeof api_pb.UnspentOutputResponse;
};

type WalletServiceConstructTransaction = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ConstructTransactionRequest;
  readonly responseType: typeof api_pb.ConstructTransactionResponse;
};

type WalletServiceSignTransaction = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SignTransactionRequest;
  readonly responseType: typeof api_pb.SignTransactionResponse;
};

type WalletServiceSignTransactions = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SignTransactionsRequest;
  readonly responseType: typeof api_pb.SignTransactionsResponse;
};

type WalletServiceCreateSignature = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CreateSignatureRequest;
  readonly responseType: typeof api_pb.CreateSignatureResponse;
};

type WalletServicePublishTransaction = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.PublishTransactionRequest;
  readonly responseType: typeof api_pb.PublishTransactionResponse;
};

type WalletServicePublishUnminedTransactions = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.PublishUnminedTransactionsRequest;
  readonly responseType: typeof api_pb.PublishUnminedTransactionsResponse;
};

type WalletServicePurchaseTickets = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.PurchaseTicketsRequest;
  readonly responseType: typeof api_pb.PurchaseTicketsResponse;
};

type WalletServiceRevokeTickets = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RevokeTicketsRequest;
  readonly responseType: typeof api_pb.RevokeTicketsResponse;
};

type WalletServiceLoadActiveDataFilters = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.LoadActiveDataFiltersRequest;
  readonly responseType: typeof api_pb.LoadActiveDataFiltersResponse;
};

type WalletServiceSignMessage = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SignMessageRequest;
  readonly responseType: typeof api_pb.SignMessageResponse;
};

type WalletServiceSignMessages = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SignMessagesRequest;
  readonly responseType: typeof api_pb.SignMessagesResponse;
};

type WalletServiceValidateAddress = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ValidateAddressRequest;
  readonly responseType: typeof api_pb.ValidateAddressResponse;
};

type WalletServiceCommittedTickets = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CommittedTicketsRequest;
  readonly responseType: typeof api_pb.CommittedTicketsResponse;
};

type WalletServiceSweepAccount = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SweepAccountRequest;
  readonly responseType: typeof api_pb.SweepAccountResponse;
};

type WalletServiceSignHashes = {
  readonly methodName: string;
  readonly service: typeof WalletService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SignHashesRequest;
  readonly responseType: typeof api_pb.SignHashesResponse;
};

export class WalletService {
  static readonly serviceName: string;
  static readonly Ping: WalletServicePing;
  static readonly Network: WalletServiceNetwork;
  static readonly CoinType: WalletServiceCoinType;
  static readonly AccountNumber: WalletServiceAccountNumber;
  static readonly Accounts: WalletServiceAccounts;
  static readonly Balance: WalletServiceBalance;
  static readonly GetAccountExtendedPubKey: WalletServiceGetAccountExtendedPubKey;
  static readonly GetAccountExtendedPrivKey: WalletServiceGetAccountExtendedPrivKey;
  static readonly GetTransaction: WalletServiceGetTransaction;
  static readonly GetTransactions: WalletServiceGetTransactions;
  static readonly GetTicket: WalletServiceGetTicket;
  static readonly GetTickets: WalletServiceGetTickets;
  static readonly TicketPrice: WalletServiceTicketPrice;
  static readonly StakeInfo: WalletServiceStakeInfo;
  static readonly BlockInfo: WalletServiceBlockInfo;
  static readonly BestBlock: WalletServiceBestBlock;
  static readonly Spender: WalletServiceSpender;
  static readonly TransactionNotifications: WalletServiceTransactionNotifications;
  static readonly AccountNotifications: WalletServiceAccountNotifications;
  static readonly ConfirmationNotifications: WalletServiceConfirmationNotifications;
  static readonly ChangePassphrase: WalletServiceChangePassphrase;
  static readonly RenameAccount: WalletServiceRenameAccount;
  static readonly Rescan: WalletServiceRescan;
  static readonly NextAccount: WalletServiceNextAccount;
  static readonly NextAddress: WalletServiceNextAddress;
  static readonly ImportPrivateKey: WalletServiceImportPrivateKey;
  static readonly ImportScript: WalletServiceImportScript;
  static readonly FundTransaction: WalletServiceFundTransaction;
  static readonly UnspentOutputs: WalletServiceUnspentOutputs;
  static readonly ConstructTransaction: WalletServiceConstructTransaction;
  static readonly SignTransaction: WalletServiceSignTransaction;
  static readonly SignTransactions: WalletServiceSignTransactions;
  static readonly CreateSignature: WalletServiceCreateSignature;
  static readonly PublishTransaction: WalletServicePublishTransaction;
  static readonly PublishUnminedTransactions: WalletServicePublishUnminedTransactions;
  static readonly PurchaseTickets: WalletServicePurchaseTickets;
  static readonly RevokeTickets: WalletServiceRevokeTickets;
  static readonly LoadActiveDataFilters: WalletServiceLoadActiveDataFilters;
  static readonly SignMessage: WalletServiceSignMessage;
  static readonly SignMessages: WalletServiceSignMessages;
  static readonly ValidateAddress: WalletServiceValidateAddress;
  static readonly CommittedTickets: WalletServiceCommittedTickets;
  static readonly SweepAccount: WalletServiceSweepAccount;
  static readonly SignHashes: WalletServiceSignHashes;
}

type WalletLoaderServiceWalletExists = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.WalletExistsRequest;
  readonly responseType: typeof api_pb.WalletExistsResponse;
};

type WalletLoaderServiceCreateWallet = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CreateWalletRequest;
  readonly responseType: typeof api_pb.CreateWalletResponse;
};

type WalletLoaderServiceCreateWatchingOnlyWallet = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CreateWatchingOnlyWalletRequest;
  readonly responseType: typeof api_pb.CreateWatchingOnlyWalletResponse;
};

type WalletLoaderServiceOpenWallet = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.OpenWalletRequest;
  readonly responseType: typeof api_pb.OpenWalletResponse;
};

type WalletLoaderServiceCloseWallet = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CloseWalletRequest;
  readonly responseType: typeof api_pb.CloseWalletResponse;
};

type WalletLoaderServiceSpvSync = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.SpvSyncRequest;
  readonly responseType: typeof api_pb.SpvSyncResponse;
};

type WalletLoaderServiceRpcSync = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.RpcSyncRequest;
  readonly responseType: typeof api_pb.RpcSyncResponse;
};

type WalletLoaderServiceRescanPoint = {
  readonly methodName: string;
  readonly service: typeof WalletLoaderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RescanPointRequest;
  readonly responseType: typeof api_pb.RescanPointResponse;
};

export class WalletLoaderService {
  static readonly serviceName: string;
  static readonly WalletExists: WalletLoaderServiceWalletExists;
  static readonly CreateWallet: WalletLoaderServiceCreateWallet;
  static readonly CreateWatchingOnlyWallet: WalletLoaderServiceCreateWatchingOnlyWallet;
  static readonly OpenWallet: WalletLoaderServiceOpenWallet;
  static readonly CloseWallet: WalletLoaderServiceCloseWallet;
  static readonly SpvSync: WalletLoaderServiceSpvSync;
  static readonly RpcSync: WalletLoaderServiceRpcSync;
  static readonly RescanPoint: WalletLoaderServiceRescanPoint;
}

type AccountMixerServiceRunAccountMixer = {
  readonly methodName: string;
  readonly service: typeof AccountMixerService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.RunAccountMixerRequest;
  readonly responseType: typeof api_pb.RunAccountMixerResponse;
};

export class AccountMixerService {
  static readonly serviceName: string;
  static readonly RunAccountMixer: AccountMixerServiceRunAccountMixer;
}

type TicketBuyerV2ServiceRunTicketBuyer = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerV2Service;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.RunTicketBuyerRequest;
  readonly responseType: typeof api_pb.RunTicketBuyerResponse;
};

export class TicketBuyerV2Service {
  static readonly serviceName: string;
  static readonly RunTicketBuyer: TicketBuyerV2ServiceRunTicketBuyer;
}

type TicketBuyerServiceStartAutoBuyer = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.StartAutoBuyerRequest;
  readonly responseType: typeof api_pb.StartAutoBuyerResponse;
};

type TicketBuyerServiceStopAutoBuyer = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.StopAutoBuyerRequest;
  readonly responseType: typeof api_pb.StopAutoBuyerResponse;
};

type TicketBuyerServiceTicketBuyerConfig = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.TicketBuyerConfigRequest;
  readonly responseType: typeof api_pb.TicketBuyerConfigResponse;
};

type TicketBuyerServiceSetAccount = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetAccountRequest;
  readonly responseType: typeof api_pb.SetAccountResponse;
};

type TicketBuyerServiceSetBalanceToMaintain = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetBalanceToMaintainRequest;
  readonly responseType: typeof api_pb.SetBalanceToMaintainResponse;
};

type TicketBuyerServiceSetMaxFee = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetMaxFeeRequest;
  readonly responseType: typeof api_pb.SetMaxFeeResponse;
};

type TicketBuyerServiceSetMaxPriceRelative = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetMaxPriceRelativeRequest;
  readonly responseType: typeof api_pb.SetMaxPriceRelativeResponse;
};

type TicketBuyerServiceSetMaxPriceAbsolute = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetMaxPriceAbsoluteRequest;
  readonly responseType: typeof api_pb.SetMaxPriceAbsoluteResponse;
};

type TicketBuyerServiceSetVotingAddress = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetVotingAddressRequest;
  readonly responseType: typeof api_pb.SetVotingAddressResponse;
};

type TicketBuyerServiceSetPoolAddress = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetPoolAddressRequest;
  readonly responseType: typeof api_pb.SetPoolAddressResponse;
};

type TicketBuyerServiceSetPoolFees = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetPoolFeesRequest;
  readonly responseType: typeof api_pb.SetPoolFeesResponse;
};

type TicketBuyerServiceSetMaxPerBlock = {
  readonly methodName: string;
  readonly service: typeof TicketBuyerService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetMaxPerBlockRequest;
  readonly responseType: typeof api_pb.SetMaxPerBlockResponse;
};

export class TicketBuyerService {
  static readonly serviceName: string;
  static readonly StartAutoBuyer: TicketBuyerServiceStartAutoBuyer;
  static readonly StopAutoBuyer: TicketBuyerServiceStopAutoBuyer;
  static readonly TicketBuyerConfig: TicketBuyerServiceTicketBuyerConfig;
  static readonly SetAccount: TicketBuyerServiceSetAccount;
  static readonly SetBalanceToMaintain: TicketBuyerServiceSetBalanceToMaintain;
  static readonly SetMaxFee: TicketBuyerServiceSetMaxFee;
  static readonly SetMaxPriceRelative: TicketBuyerServiceSetMaxPriceRelative;
  static readonly SetMaxPriceAbsolute: TicketBuyerServiceSetMaxPriceAbsolute;
  static readonly SetVotingAddress: TicketBuyerServiceSetVotingAddress;
  static readonly SetPoolAddress: TicketBuyerServiceSetPoolAddress;
  static readonly SetPoolFees: TicketBuyerServiceSetPoolFees;
  static readonly SetMaxPerBlock: TicketBuyerServiceSetMaxPerBlock;
}

type SeedServiceGenerateRandomSeed = {
  readonly methodName: string;
  readonly service: typeof SeedService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GenerateRandomSeedRequest;
  readonly responseType: typeof api_pb.GenerateRandomSeedResponse;
};

type SeedServiceDecodeSeed = {
  readonly methodName: string;
  readonly service: typeof SeedService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.DecodeSeedRequest;
  readonly responseType: typeof api_pb.DecodeSeedResponse;
};

export class SeedService {
  static readonly serviceName: string;
  static readonly GenerateRandomSeed: SeedServiceGenerateRandomSeed;
  static readonly DecodeSeed: SeedServiceDecodeSeed;
}

type AgendaServiceAgendas = {
  readonly methodName: string;
  readonly service: typeof AgendaService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.AgendasRequest;
  readonly responseType: typeof api_pb.AgendasResponse;
};

export class AgendaService {
  static readonly serviceName: string;
  static readonly Agendas: AgendaServiceAgendas;
}

type VotingServiceVoteChoices = {
  readonly methodName: string;
  readonly service: typeof VotingService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.VoteChoicesRequest;
  readonly responseType: typeof api_pb.VoteChoicesResponse;
};

type VotingServiceSetVoteChoices = {
  readonly methodName: string;
  readonly service: typeof VotingService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SetVoteChoicesRequest;
  readonly responseType: typeof api_pb.SetVoteChoicesResponse;
};

export class VotingService {
  static readonly serviceName: string;
  static readonly VoteChoices: VotingServiceVoteChoices;
  static readonly SetVoteChoices: VotingServiceSetVoteChoices;
}

type MessageVerificationServiceVerifyMessage = {
  readonly methodName: string;
  readonly service: typeof MessageVerificationService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.VerifyMessageRequest;
  readonly responseType: typeof api_pb.VerifyMessageResponse;
};

export class MessageVerificationService {
  static readonly serviceName: string;
  static readonly VerifyMessage: MessageVerificationServiceVerifyMessage;
}

type DecodeMessageServiceDecodeRawTransaction = {
  readonly methodName: string;
  readonly service: typeof DecodeMessageService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.DecodeRawTransactionRequest;
  readonly responseType: typeof api_pb.DecodeRawTransactionResponse;
};

export class DecodeMessageService {
  static readonly serviceName: string;
  static readonly DecodeRawTransaction: DecodeMessageServiceDecodeRawTransaction;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class VersionServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  version(
    requestMessage: api_pb.VersionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.VersionResponse|null) => void
  ): UnaryResponse;
  version(
    requestMessage: api_pb.VersionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.VersionResponse|null) => void
  ): UnaryResponse;
}

export class WalletServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  ping(
    requestMessage: api_pb.PingRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.PingResponse|null) => void
  ): UnaryResponse;
  ping(
    requestMessage: api_pb.PingRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.PingResponse|null) => void
  ): UnaryResponse;
  network(
    requestMessage: api_pb.NetworkRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.NetworkResponse|null) => void
  ): UnaryResponse;
  network(
    requestMessage: api_pb.NetworkRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.NetworkResponse|null) => void
  ): UnaryResponse;
  coinType(
    requestMessage: api_pb.CoinTypeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CoinTypeResponse|null) => void
  ): UnaryResponse;
  coinType(
    requestMessage: api_pb.CoinTypeRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CoinTypeResponse|null) => void
  ): UnaryResponse;
  accountNumber(
    requestMessage: api_pb.AccountNumberRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.AccountNumberResponse|null) => void
  ): UnaryResponse;
  accountNumber(
    requestMessage: api_pb.AccountNumberRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.AccountNumberResponse|null) => void
  ): UnaryResponse;
  accounts(
    requestMessage: api_pb.AccountsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.AccountsResponse|null) => void
  ): UnaryResponse;
  accounts(
    requestMessage: api_pb.AccountsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.AccountsResponse|null) => void
  ): UnaryResponse;
  balance(
    requestMessage: api_pb.BalanceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.BalanceResponse|null) => void
  ): UnaryResponse;
  balance(
    requestMessage: api_pb.BalanceRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.BalanceResponse|null) => void
  ): UnaryResponse;
  getAccountExtendedPubKey(
    requestMessage: api_pb.GetAccountExtendedPubKeyRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAccountExtendedPubKeyResponse|null) => void
  ): UnaryResponse;
  getAccountExtendedPubKey(
    requestMessage: api_pb.GetAccountExtendedPubKeyRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAccountExtendedPubKeyResponse|null) => void
  ): UnaryResponse;
  getAccountExtendedPrivKey(
    requestMessage: api_pb.GetAccountExtendedPrivKeyRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAccountExtendedPrivKeyResponse|null) => void
  ): UnaryResponse;
  getAccountExtendedPrivKey(
    requestMessage: api_pb.GetAccountExtendedPrivKeyRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAccountExtendedPrivKeyResponse|null) => void
  ): UnaryResponse;
  getTransaction(
    requestMessage: api_pb.GetTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetTransactionResponse|null) => void
  ): UnaryResponse;
  getTransaction(
    requestMessage: api_pb.GetTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetTransactionResponse|null) => void
  ): UnaryResponse;
  getTransactions(requestMessage: api_pb.GetTransactionsRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.GetTransactionsResponse>;
  getTicket(
    requestMessage: api_pb.GetTicketRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetTicketsResponse|null) => void
  ): UnaryResponse;
  getTicket(
    requestMessage: api_pb.GetTicketRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetTicketsResponse|null) => void
  ): UnaryResponse;
  getTickets(requestMessage: api_pb.GetTicketsRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.GetTicketsResponse>;
  ticketPrice(
    requestMessage: api_pb.TicketPriceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.TicketPriceResponse|null) => void
  ): UnaryResponse;
  ticketPrice(
    requestMessage: api_pb.TicketPriceRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.TicketPriceResponse|null) => void
  ): UnaryResponse;
  stakeInfo(
    requestMessage: api_pb.StakeInfoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.StakeInfoResponse|null) => void
  ): UnaryResponse;
  stakeInfo(
    requestMessage: api_pb.StakeInfoRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.StakeInfoResponse|null) => void
  ): UnaryResponse;
  blockInfo(
    requestMessage: api_pb.BlockInfoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.BlockInfoResponse|null) => void
  ): UnaryResponse;
  blockInfo(
    requestMessage: api_pb.BlockInfoRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.BlockInfoResponse|null) => void
  ): UnaryResponse;
  bestBlock(
    requestMessage: api_pb.BestBlockRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.BestBlockResponse|null) => void
  ): UnaryResponse;
  bestBlock(
    requestMessage: api_pb.BestBlockRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.BestBlockResponse|null) => void
  ): UnaryResponse;
  spender(
    requestMessage: api_pb.SpenderRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SpenderResponse|null) => void
  ): UnaryResponse;
  spender(
    requestMessage: api_pb.SpenderRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SpenderResponse|null) => void
  ): UnaryResponse;
  transactionNotifications(requestMessage: api_pb.TransactionNotificationsRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.TransactionNotificationsResponse>;
  accountNotifications(requestMessage: api_pb.AccountNotificationsRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.AccountNotificationsResponse>;
  confirmationNotifications(metadata?: grpc.Metadata): BidirectionalStream<api_pb.ConfirmationNotificationsRequest, api_pb.ConfirmationNotificationsResponse>;
  changePassphrase(
    requestMessage: api_pb.ChangePassphraseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ChangePassphraseResponse|null) => void
  ): UnaryResponse;
  changePassphrase(
    requestMessage: api_pb.ChangePassphraseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ChangePassphraseResponse|null) => void
  ): UnaryResponse;
  renameAccount(
    requestMessage: api_pb.RenameAccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RenameAccountResponse|null) => void
  ): UnaryResponse;
  renameAccount(
    requestMessage: api_pb.RenameAccountRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RenameAccountResponse|null) => void
  ): UnaryResponse;
  rescan(requestMessage: api_pb.RescanRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.RescanResponse>;
  nextAccount(
    requestMessage: api_pb.NextAccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.NextAccountResponse|null) => void
  ): UnaryResponse;
  nextAccount(
    requestMessage: api_pb.NextAccountRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.NextAccountResponse|null) => void
  ): UnaryResponse;
  nextAddress(
    requestMessage: api_pb.NextAddressRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.NextAddressResponse|null) => void
  ): UnaryResponse;
  nextAddress(
    requestMessage: api_pb.NextAddressRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.NextAddressResponse|null) => void
  ): UnaryResponse;
  importPrivateKey(
    requestMessage: api_pb.ImportPrivateKeyRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ImportPrivateKeyResponse|null) => void
  ): UnaryResponse;
  importPrivateKey(
    requestMessage: api_pb.ImportPrivateKeyRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ImportPrivateKeyResponse|null) => void
  ): UnaryResponse;
  importScript(
    requestMessage: api_pb.ImportScriptRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ImportScriptResponse|null) => void
  ): UnaryResponse;
  importScript(
    requestMessage: api_pb.ImportScriptRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ImportScriptResponse|null) => void
  ): UnaryResponse;
  fundTransaction(
    requestMessage: api_pb.FundTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.FundTransactionResponse|null) => void
  ): UnaryResponse;
  fundTransaction(
    requestMessage: api_pb.FundTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.FundTransactionResponse|null) => void
  ): UnaryResponse;
  unspentOutputs(requestMessage: api_pb.UnspentOutputsRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.UnspentOutputResponse>;
  constructTransaction(
    requestMessage: api_pb.ConstructTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ConstructTransactionResponse|null) => void
  ): UnaryResponse;
  constructTransaction(
    requestMessage: api_pb.ConstructTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ConstructTransactionResponse|null) => void
  ): UnaryResponse;
  signTransaction(
    requestMessage: api_pb.SignTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignTransactionResponse|null) => void
  ): UnaryResponse;
  signTransaction(
    requestMessage: api_pb.SignTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignTransactionResponse|null) => void
  ): UnaryResponse;
  signTransactions(
    requestMessage: api_pb.SignTransactionsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignTransactionsResponse|null) => void
  ): UnaryResponse;
  signTransactions(
    requestMessage: api_pb.SignTransactionsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignTransactionsResponse|null) => void
  ): UnaryResponse;
  createSignature(
    requestMessage: api_pb.CreateSignatureRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateSignatureResponse|null) => void
  ): UnaryResponse;
  createSignature(
    requestMessage: api_pb.CreateSignatureRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateSignatureResponse|null) => void
  ): UnaryResponse;
  publishTransaction(
    requestMessage: api_pb.PublishTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.PublishTransactionResponse|null) => void
  ): UnaryResponse;
  publishTransaction(
    requestMessage: api_pb.PublishTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.PublishTransactionResponse|null) => void
  ): UnaryResponse;
  publishUnminedTransactions(
    requestMessage: api_pb.PublishUnminedTransactionsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.PublishUnminedTransactionsResponse|null) => void
  ): UnaryResponse;
  publishUnminedTransactions(
    requestMessage: api_pb.PublishUnminedTransactionsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.PublishUnminedTransactionsResponse|null) => void
  ): UnaryResponse;
  purchaseTickets(
    requestMessage: api_pb.PurchaseTicketsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.PurchaseTicketsResponse|null) => void
  ): UnaryResponse;
  purchaseTickets(
    requestMessage: api_pb.PurchaseTicketsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.PurchaseTicketsResponse|null) => void
  ): UnaryResponse;
  revokeTickets(
    requestMessage: api_pb.RevokeTicketsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RevokeTicketsResponse|null) => void
  ): UnaryResponse;
  revokeTickets(
    requestMessage: api_pb.RevokeTicketsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RevokeTicketsResponse|null) => void
  ): UnaryResponse;
  loadActiveDataFilters(
    requestMessage: api_pb.LoadActiveDataFiltersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.LoadActiveDataFiltersResponse|null) => void
  ): UnaryResponse;
  loadActiveDataFilters(
    requestMessage: api_pb.LoadActiveDataFiltersRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.LoadActiveDataFiltersResponse|null) => void
  ): UnaryResponse;
  signMessage(
    requestMessage: api_pb.SignMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignMessageResponse|null) => void
  ): UnaryResponse;
  signMessage(
    requestMessage: api_pb.SignMessageRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignMessageResponse|null) => void
  ): UnaryResponse;
  signMessages(
    requestMessage: api_pb.SignMessagesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignMessagesResponse|null) => void
  ): UnaryResponse;
  signMessages(
    requestMessage: api_pb.SignMessagesRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignMessagesResponse|null) => void
  ): UnaryResponse;
  validateAddress(
    requestMessage: api_pb.ValidateAddressRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ValidateAddressResponse|null) => void
  ): UnaryResponse;
  validateAddress(
    requestMessage: api_pb.ValidateAddressRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ValidateAddressResponse|null) => void
  ): UnaryResponse;
  committedTickets(
    requestMessage: api_pb.CommittedTicketsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CommittedTicketsResponse|null) => void
  ): UnaryResponse;
  committedTickets(
    requestMessage: api_pb.CommittedTicketsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CommittedTicketsResponse|null) => void
  ): UnaryResponse;
  sweepAccount(
    requestMessage: api_pb.SweepAccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SweepAccountResponse|null) => void
  ): UnaryResponse;
  sweepAccount(
    requestMessage: api_pb.SweepAccountRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SweepAccountResponse|null) => void
  ): UnaryResponse;
  signHashes(
    requestMessage: api_pb.SignHashesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignHashesResponse|null) => void
  ): UnaryResponse;
  signHashes(
    requestMessage: api_pb.SignHashesRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignHashesResponse|null) => void
  ): UnaryResponse;
}

export class WalletLoaderServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  walletExists(
    requestMessage: api_pb.WalletExistsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.WalletExistsResponse|null) => void
  ): UnaryResponse;
  walletExists(
    requestMessage: api_pb.WalletExistsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.WalletExistsResponse|null) => void
  ): UnaryResponse;
  createWallet(
    requestMessage: api_pb.CreateWalletRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateWalletResponse|null) => void
  ): UnaryResponse;
  createWallet(
    requestMessage: api_pb.CreateWalletRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateWalletResponse|null) => void
  ): UnaryResponse;
  createWatchingOnlyWallet(
    requestMessage: api_pb.CreateWatchingOnlyWalletRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateWatchingOnlyWalletResponse|null) => void
  ): UnaryResponse;
  createWatchingOnlyWallet(
    requestMessage: api_pb.CreateWatchingOnlyWalletRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateWatchingOnlyWalletResponse|null) => void
  ): UnaryResponse;
  openWallet(
    requestMessage: api_pb.OpenWalletRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.OpenWalletResponse|null) => void
  ): UnaryResponse;
  openWallet(
    requestMessage: api_pb.OpenWalletRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.OpenWalletResponse|null) => void
  ): UnaryResponse;
  closeWallet(
    requestMessage: api_pb.CloseWalletRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CloseWalletResponse|null) => void
  ): UnaryResponse;
  closeWallet(
    requestMessage: api_pb.CloseWalletRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CloseWalletResponse|null) => void
  ): UnaryResponse;
  spvSync(requestMessage: api_pb.SpvSyncRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.SpvSyncResponse>;
  rpcSync(requestMessage: api_pb.RpcSyncRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.RpcSyncResponse>;
  rescanPoint(
    requestMessage: api_pb.RescanPointRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RescanPointResponse|null) => void
  ): UnaryResponse;
  rescanPoint(
    requestMessage: api_pb.RescanPointRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RescanPointResponse|null) => void
  ): UnaryResponse;
}

export class AccountMixerServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  runAccountMixer(requestMessage: api_pb.RunAccountMixerRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.RunAccountMixerResponse>;
}

export class TicketBuyerV2ServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  runTicketBuyer(requestMessage: api_pb.RunTicketBuyerRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.RunTicketBuyerResponse>;
}

export class TicketBuyerServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  startAutoBuyer(
    requestMessage: api_pb.StartAutoBuyerRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.StartAutoBuyerResponse|null) => void
  ): UnaryResponse;
  startAutoBuyer(
    requestMessage: api_pb.StartAutoBuyerRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.StartAutoBuyerResponse|null) => void
  ): UnaryResponse;
  stopAutoBuyer(
    requestMessage: api_pb.StopAutoBuyerRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.StopAutoBuyerResponse|null) => void
  ): UnaryResponse;
  stopAutoBuyer(
    requestMessage: api_pb.StopAutoBuyerRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.StopAutoBuyerResponse|null) => void
  ): UnaryResponse;
  ticketBuyerConfig(
    requestMessage: api_pb.TicketBuyerConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.TicketBuyerConfigResponse|null) => void
  ): UnaryResponse;
  ticketBuyerConfig(
    requestMessage: api_pb.TicketBuyerConfigRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.TicketBuyerConfigResponse|null) => void
  ): UnaryResponse;
  setAccount(
    requestMessage: api_pb.SetAccountRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetAccountResponse|null) => void
  ): UnaryResponse;
  setAccount(
    requestMessage: api_pb.SetAccountRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetAccountResponse|null) => void
  ): UnaryResponse;
  setBalanceToMaintain(
    requestMessage: api_pb.SetBalanceToMaintainRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetBalanceToMaintainResponse|null) => void
  ): UnaryResponse;
  setBalanceToMaintain(
    requestMessage: api_pb.SetBalanceToMaintainRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetBalanceToMaintainResponse|null) => void
  ): UnaryResponse;
  setMaxFee(
    requestMessage: api_pb.SetMaxFeeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxFeeResponse|null) => void
  ): UnaryResponse;
  setMaxFee(
    requestMessage: api_pb.SetMaxFeeRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxFeeResponse|null) => void
  ): UnaryResponse;
  setMaxPriceRelative(
    requestMessage: api_pb.SetMaxPriceRelativeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxPriceRelativeResponse|null) => void
  ): UnaryResponse;
  setMaxPriceRelative(
    requestMessage: api_pb.SetMaxPriceRelativeRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxPriceRelativeResponse|null) => void
  ): UnaryResponse;
  setMaxPriceAbsolute(
    requestMessage: api_pb.SetMaxPriceAbsoluteRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxPriceAbsoluteResponse|null) => void
  ): UnaryResponse;
  setMaxPriceAbsolute(
    requestMessage: api_pb.SetMaxPriceAbsoluteRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxPriceAbsoluteResponse|null) => void
  ): UnaryResponse;
  setVotingAddress(
    requestMessage: api_pb.SetVotingAddressRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetVotingAddressResponse|null) => void
  ): UnaryResponse;
  setVotingAddress(
    requestMessage: api_pb.SetVotingAddressRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetVotingAddressResponse|null) => void
  ): UnaryResponse;
  setPoolAddress(
    requestMessage: api_pb.SetPoolAddressRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetPoolAddressResponse|null) => void
  ): UnaryResponse;
  setPoolAddress(
    requestMessage: api_pb.SetPoolAddressRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetPoolAddressResponse|null) => void
  ): UnaryResponse;
  setPoolFees(
    requestMessage: api_pb.SetPoolFeesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetPoolFeesResponse|null) => void
  ): UnaryResponse;
  setPoolFees(
    requestMessage: api_pb.SetPoolFeesRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetPoolFeesResponse|null) => void
  ): UnaryResponse;
  setMaxPerBlock(
    requestMessage: api_pb.SetMaxPerBlockRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxPerBlockResponse|null) => void
  ): UnaryResponse;
  setMaxPerBlock(
    requestMessage: api_pb.SetMaxPerBlockRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetMaxPerBlockResponse|null) => void
  ): UnaryResponse;
}

export class SeedServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  generateRandomSeed(
    requestMessage: api_pb.GenerateRandomSeedRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GenerateRandomSeedResponse|null) => void
  ): UnaryResponse;
  generateRandomSeed(
    requestMessage: api_pb.GenerateRandomSeedRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GenerateRandomSeedResponse|null) => void
  ): UnaryResponse;
  decodeSeed(
    requestMessage: api_pb.DecodeSeedRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.DecodeSeedResponse|null) => void
  ): UnaryResponse;
  decodeSeed(
    requestMessage: api_pb.DecodeSeedRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.DecodeSeedResponse|null) => void
  ): UnaryResponse;
}

export class AgendaServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  agendas(
    requestMessage: api_pb.AgendasRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.AgendasResponse|null) => void
  ): UnaryResponse;
  agendas(
    requestMessage: api_pb.AgendasRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.AgendasResponse|null) => void
  ): UnaryResponse;
}

export class VotingServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  voteChoices(
    requestMessage: api_pb.VoteChoicesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.VoteChoicesResponse|null) => void
  ): UnaryResponse;
  voteChoices(
    requestMessage: api_pb.VoteChoicesRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.VoteChoicesResponse|null) => void
  ): UnaryResponse;
  setVoteChoices(
    requestMessage: api_pb.SetVoteChoicesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetVoteChoicesResponse|null) => void
  ): UnaryResponse;
  setVoteChoices(
    requestMessage: api_pb.SetVoteChoicesRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SetVoteChoicesResponse|null) => void
  ): UnaryResponse;
}

export class MessageVerificationServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  verifyMessage(
    requestMessage: api_pb.VerifyMessageRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.VerifyMessageResponse|null) => void
  ): UnaryResponse;
  verifyMessage(
    requestMessage: api_pb.VerifyMessageRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.VerifyMessageResponse|null) => void
  ): UnaryResponse;
}

export class DecodeMessageServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  decodeRawTransaction(
    requestMessage: api_pb.DecodeRawTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.DecodeRawTransactionResponse|null) => void
  ): UnaryResponse;
  decodeRawTransaction(
    requestMessage: api_pb.DecodeRawTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.DecodeRawTransactionResponse|null) => void
  ): UnaryResponse;
}

