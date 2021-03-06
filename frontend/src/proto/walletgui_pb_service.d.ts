// package: walletgui
// file: walletgui.proto

import * as walletgui_pb from "./walletgui_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AppConfigGetConfig = {
  readonly methodName: string;
  readonly service: typeof AppConfig;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof walletgui_pb.GetConfigRequest;
  readonly responseType: typeof walletgui_pb.AppConfiguration;
};

type AppConfigSetConfig = {
  readonly methodName: string;
  readonly service: typeof AppConfig;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof walletgui_pb.SetConfigRequest;
  readonly responseType: typeof walletgui_pb.SetConfigResponse;
};

type AppConfigCreateTransaction = {
  readonly methodName: string;
  readonly service: typeof AppConfig;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof walletgui_pb.CreateTransactionRequest;
  readonly responseType: typeof walletgui_pb.CreateTransactionResponse;
};

export class AppConfig {
  static readonly serviceName: string;
  static readonly GetConfig: AppConfigGetConfig;
  static readonly SetConfig: AppConfigSetConfig;
  static readonly CreateTransaction: AppConfigCreateTransaction;
}

type NetworkServiceCheckConnection = {
  readonly methodName: string;
  readonly service: typeof NetworkService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof walletgui_pb.CheckConnectionRequest;
  readonly responseType: typeof walletgui_pb.CheckConnectionResponse;
};

type NetworkServiceConnectWallet = {
  readonly methodName: string;
  readonly service: typeof NetworkService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof walletgui_pb.ConnectWalletRequest;
  readonly responseType: typeof walletgui_pb.ConnectWalletResponse;
};

export class NetworkService {
  static readonly serviceName: string;
  static readonly CheckConnection: NetworkServiceCheckConnection;
  static readonly ConnectWallet: NetworkServiceConnectWallet;
}

type ExchangeRatesGetMarketChart = {
  readonly methodName: string;
  readonly service: typeof ExchangeRates;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof walletgui_pb.GetMarketChartRequest;
  readonly responseType: typeof walletgui_pb.GetMarketChartResponse;
};

export class ExchangeRates {
  static readonly serviceName: string;
  static readonly GetMarketChart: ExchangeRatesGetMarketChart;
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

export class AppConfigClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getConfig(
    requestMessage: walletgui_pb.GetConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.AppConfiguration|null) => void
  ): UnaryResponse;
  getConfig(
    requestMessage: walletgui_pb.GetConfigRequest,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.AppConfiguration|null) => void
  ): UnaryResponse;
  setConfig(
    requestMessage: walletgui_pb.SetConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.SetConfigResponse|null) => void
  ): UnaryResponse;
  setConfig(
    requestMessage: walletgui_pb.SetConfigRequest,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.SetConfigResponse|null) => void
  ): UnaryResponse;
  createTransaction(
    requestMessage: walletgui_pb.CreateTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.CreateTransactionResponse|null) => void
  ): UnaryResponse;
  createTransaction(
    requestMessage: walletgui_pb.CreateTransactionRequest,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.CreateTransactionResponse|null) => void
  ): UnaryResponse;
}

export class NetworkServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  checkConnection(
    requestMessage: walletgui_pb.CheckConnectionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.CheckConnectionResponse|null) => void
  ): UnaryResponse;
  checkConnection(
    requestMessage: walletgui_pb.CheckConnectionRequest,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.CheckConnectionResponse|null) => void
  ): UnaryResponse;
  connectWallet(
    requestMessage: walletgui_pb.ConnectWalletRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.ConnectWalletResponse|null) => void
  ): UnaryResponse;
  connectWallet(
    requestMessage: walletgui_pb.ConnectWalletRequest,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.ConnectWalletResponse|null) => void
  ): UnaryResponse;
}

export class ExchangeRatesClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getMarketChart(
    requestMessage: walletgui_pb.GetMarketChartRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.GetMarketChartResponse|null) => void
  ): UnaryResponse;
  getMarketChart(
    requestMessage: walletgui_pb.GetMarketChartRequest,
    callback: (error: ServiceError|null, responseMessage: walletgui_pb.GetMarketChartResponse|null) => void
  ): UnaryResponse;
}

