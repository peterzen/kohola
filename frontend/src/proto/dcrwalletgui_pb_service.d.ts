// package: dcrwalletgui
// file: dcrwalletgui.proto

import * as dcrwalletgui_pb from "./dcrwalletgui_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AppConfigGetConfig = {
  readonly methodName: string;
  readonly service: typeof AppConfig;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof dcrwalletgui_pb.GetConfigRequest;
  readonly responseType: typeof dcrwalletgui_pb.AppConfiguration;
};

type AppConfigSetConfig = {
  readonly methodName: string;
  readonly service: typeof AppConfig;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof dcrwalletgui_pb.SetConfigRequest;
  readonly responseType: typeof dcrwalletgui_pb.SetConfigResponse;
};

export class AppConfig {
  static readonly serviceName: string;
  static readonly GetConfig: AppConfigGetConfig;
  static readonly SetConfig: AppConfigSetConfig;
}

type NetworkServiceCheckConnection = {
  readonly methodName: string;
  readonly service: typeof NetworkService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof dcrwalletgui_pb.CheckConnectionRequest;
  readonly responseType: typeof dcrwalletgui_pb.CheckConnectionResponse;
};

type NetworkServiceConnectWallet = {
  readonly methodName: string;
  readonly service: typeof NetworkService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof dcrwalletgui_pb.ConnectWalletRequest;
  readonly responseType: typeof dcrwalletgui_pb.ConnectWalletResponse;
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
  readonly requestType: typeof dcrwalletgui_pb.GetMarketChartRequest;
  readonly responseType: typeof dcrwalletgui_pb.GetMarketChartResponse;
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
    requestMessage: dcrwalletgui_pb.GetConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.AppConfiguration|null) => void
  ): UnaryResponse;
  getConfig(
    requestMessage: dcrwalletgui_pb.GetConfigRequest,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.AppConfiguration|null) => void
  ): UnaryResponse;
  setConfig(
    requestMessage: dcrwalletgui_pb.SetConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.SetConfigResponse|null) => void
  ): UnaryResponse;
  setConfig(
    requestMessage: dcrwalletgui_pb.SetConfigRequest,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.SetConfigResponse|null) => void
  ): UnaryResponse;
}

export class NetworkServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  checkConnection(
    requestMessage: dcrwalletgui_pb.CheckConnectionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.CheckConnectionResponse|null) => void
  ): UnaryResponse;
  checkConnection(
    requestMessage: dcrwalletgui_pb.CheckConnectionRequest,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.CheckConnectionResponse|null) => void
  ): UnaryResponse;
  connectWallet(
    requestMessage: dcrwalletgui_pb.ConnectWalletRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.ConnectWalletResponse|null) => void
  ): UnaryResponse;
  connectWallet(
    requestMessage: dcrwalletgui_pb.ConnectWalletRequest,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.ConnectWalletResponse|null) => void
  ): UnaryResponse;
}

export class ExchangeRatesClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getMarketChart(
    requestMessage: dcrwalletgui_pb.GetMarketChartRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.GetMarketChartResponse|null) => void
  ): UnaryResponse;
  getMarketChart(
    requestMessage: dcrwalletgui_pb.GetMarketChartRequest,
    callback: (error: ServiceError|null, responseMessage: dcrwalletgui_pb.GetMarketChartResponse|null) => void
  ): UnaryResponse;
}

