// package: walletgui
// file: walletgui.proto

import * as jspb from "google-protobuf";
import * as api_pb from "./api_pb";

export class GetConfigRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetConfigRequest): GetConfigRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetConfigRequest;
  static deserializeBinaryFromReader(message: GetConfigRequest, reader: jspb.BinaryReader): GetConfigRequest;
}

export namespace GetConfigRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
  }
}

export class SetConfigRequest extends jspb.Message {
  hasAppConfig(): boolean;
  clearAppConfig(): void;
  getAppConfig(): AppConfiguration | undefined;
  setAppConfig(value?: AppConfiguration): void;

  getPassphrase(): string;
  setPassphrase(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetConfigRequest): SetConfigRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetConfigRequest;
  static deserializeBinaryFromReader(message: SetConfigRequest, reader: jspb.BinaryReader): SetConfigRequest;
}

export namespace SetConfigRequest {
  export type AsObject = {
    appConfig?: AppConfiguration.AsObject,
    passphrase: string,
  }
}

export class SetConfigResponse extends jspb.Message {
  getUpdateStatus(): SetConfigResponse.UpdateStatusMap[keyof SetConfigResponse.UpdateStatusMap];
  setUpdateStatus(value: SetConfigResponse.UpdateStatusMap[keyof SetConfigResponse.UpdateStatusMap]): void;

  getErrorCode(): number;
  setErrorCode(value: number): void;

  getErrorDescription(): string;
  setErrorDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetConfigResponse): SetConfigResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetConfigResponse;
  static deserializeBinaryFromReader(message: SetConfigResponse, reader: jspb.BinaryReader): SetConfigResponse;
}

export namespace SetConfigResponse {
  export type AsObject = {
    updateStatus: SetConfigResponse.UpdateStatusMap[keyof SetConfigResponse.UpdateStatusMap],
    errorCode: number,
    errorDescription: string,
  }

  export interface UpdateStatusMap {
    STATUS_SUCCESS: 0;
    STATUS_ERROR: 1;
  }

  export const UpdateStatus: UpdateStatusMap;
}

export class RPCEndpoint extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHostname(): string;
  setHostname(value: string): void;

  getPort(): number;
  setPort(value: number): void;

  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getCertFileName(): string;
  setCertFileName(value: string): void;

  getCertBlob(): string;
  setCertBlob(value: string): void;

  getNetwork(): NetworkMap[keyof NetworkMap];
  setNetwork(value: NetworkMap[keyof NetworkMap]): void;

  getLabel(): string;
  setLabel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RPCEndpoint.AsObject;
  static toObject(includeInstance: boolean, msg: RPCEndpoint): RPCEndpoint.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RPCEndpoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RPCEndpoint;
  static deserializeBinaryFromReader(message: RPCEndpoint, reader: jspb.BinaryReader): RPCEndpoint;
}

export namespace RPCEndpoint {
  export type AsObject = {
    id: string,
    hostname: string,
    port: number,
    username: string,
    password: string,
    certFileName: string,
    certBlob: string,
    network: NetworkMap[keyof NetworkMap],
    label: string,
  }
}

export class GRPCEndpoint extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getHostname(): string;
  setHostname(value: string): void;

  getPort(): number;
  setPort(value: number): void;

  getCertFileName(): string;
  setCertFileName(value: string): void;

  getCertBlob(): string;
  setCertBlob(value: string): void;

  getNetwork(): NetworkMap[keyof NetworkMap];
  setNetwork(value: NetworkMap[keyof NetworkMap]): void;

  getLabel(): string;
  setLabel(value: string): void;

  getIsWatchingOnly(): boolean;
  setIsWatchingOnly(value: boolean): void;

  getActiveNetwork(): number;
  setActiveNetwork(value: number): void;

  getCoinType(): number;
  setCoinType(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GRPCEndpoint.AsObject;
  static toObject(includeInstance: boolean, msg: GRPCEndpoint): GRPCEndpoint.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GRPCEndpoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GRPCEndpoint;
  static deserializeBinaryFromReader(message: GRPCEndpoint, reader: jspb.BinaryReader): GRPCEndpoint;
}

export namespace GRPCEndpoint {
  export type AsObject = {
    id: string,
    hostname: string,
    port: number,
    certFileName: string,
    certBlob: string,
    network: NetworkMap[keyof NetworkMap],
    label: string,
    isWatchingOnly: boolean,
    activeNetwork: number,
    coinType: number,
  }
}

export class AppConfiguration extends jspb.Message {
  clearWalletEndpointsList(): void;
  getWalletEndpointsList(): Array<GRPCEndpoint>;
  setWalletEndpointsList(value: Array<GRPCEndpoint>): void;
  addWalletEndpoints(value?: GRPCEndpoint, index?: number): GRPCEndpoint;

  getDefaultWalletEndpointId(): string;
  setDefaultWalletEndpointId(value: string): void;

  getWalletPreferencesMap(): jspb.Map<string, AppConfiguration.WalletPreferences>;
  clearWalletPreferencesMap(): void;
  clearAltDisplayCurrenciesList(): void;
  getAltDisplayCurrenciesList(): Array<string>;
  setAltDisplayCurrenciesList(value: Array<string>): void;
  addAltDisplayCurrencies(value: string, index?: number): string;

  hasUiPreferences(): boolean;
  clearUiPreferences(): void;
  getUiPreferences(): AppConfiguration.UIPreferences | undefined;
  setUiPreferences(value?: AppConfiguration.UIPreferences): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppConfiguration.AsObject;
  static toObject(includeInstance: boolean, msg: AppConfiguration): AppConfiguration.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AppConfiguration, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppConfiguration;
  static deserializeBinaryFromReader(message: AppConfiguration, reader: jspb.BinaryReader): AppConfiguration;
}

export namespace AppConfiguration {
  export type AsObject = {
    walletEndpointsList: Array<GRPCEndpoint.AsObject>,
    defaultWalletEndpointId: string,
    walletPreferencesMap: Array<[string, AppConfiguration.WalletPreferences.AsObject]>,
    altDisplayCurrenciesList: Array<string>,
    uiPreferences?: AppConfiguration.UIPreferences.AsObject,
  }

  export class UIPreferences extends jspb.Message {
    getDisplayUnit(): DisplayUnitMap[keyof DisplayUnitMap];
    setDisplayUnit(value: DisplayUnitMap[keyof DisplayUnitMap]): void;

    getFiatCurrency(): FiatCurrencyMap[keyof FiatCurrencyMap];
    setFiatCurrency(value: FiatCurrencyMap[keyof FiatCurrencyMap]): void;

    getIsConfigEncrypted(): boolean;
    setIsConfigEncrypted(value: boolean): void;

    getTheme(): ThemeMap[keyof ThemeMap];
    setTheme(value: ThemeMap[keyof ThemeMap]): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UIPreferences.AsObject;
    static toObject(includeInstance: boolean, msg: UIPreferences): UIPreferences.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UIPreferences, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UIPreferences;
    static deserializeBinaryFromReader(message: UIPreferences, reader: jspb.BinaryReader): UIPreferences;
  }

  export namespace UIPreferences {
    export type AsObject = {
      displayUnit: DisplayUnitMap[keyof DisplayUnitMap],
      fiatCurrency: FiatCurrencyMap[keyof FiatCurrencyMap],
      isConfigEncrypted: boolean,
      theme: ThemeMap[keyof ThemeMap],
    }
  }

  export class AccountPreference extends jspb.Message {
    getIsHidden(): boolean;
    setIsHidden(value: boolean): void;

    getDisplayOrder(): number;
    setDisplayOrder(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountPreference.AsObject;
    static toObject(includeInstance: boolean, msg: AccountPreference): AccountPreference.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountPreference, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountPreference;
    static deserializeBinaryFromReader(message: AccountPreference, reader: jspb.BinaryReader): AccountPreference;
  }

  export namespace AccountPreference {
    export type AsObject = {
      isHidden: boolean,
      displayOrder: number,
    }
  }

  export class WalletPreferences extends jspb.Message {
    getAccountPrefsMap(): jspb.Map<number, AppConfiguration.AccountPreference>;
    clearAccountPrefsMap(): void;
    hasAccountMixerRequestDefaults(): boolean;
    clearAccountMixerRequestDefaults(): void;
    getAccountMixerRequestDefaults(): api_pb.RunAccountMixerRequest | undefined;
    setAccountMixerRequestDefaults(value?: api_pb.RunAccountMixerRequest): void;

    hasRunAutoBuyerRequestDefaults(): boolean;
    clearRunAutoBuyerRequestDefaults(): void;
    getRunAutoBuyerRequestDefaults(): api_pb.RunTicketBuyerRequest | undefined;
    setRunAutoBuyerRequestDefaults(value?: api_pb.RunTicketBuyerRequest): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WalletPreferences.AsObject;
    static toObject(includeInstance: boolean, msg: WalletPreferences): WalletPreferences.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WalletPreferences, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WalletPreferences;
    static deserializeBinaryFromReader(message: WalletPreferences, reader: jspb.BinaryReader): WalletPreferences;
  }

  export namespace WalletPreferences {
    export type AsObject = {
      accountPrefsMap: Array<[number, AppConfiguration.AccountPreference.AsObject]>,
      accountMixerRequestDefaults?: api_pb.RunAccountMixerRequest.AsObject,
      runAutoBuyerRequestDefaults?: api_pb.RunTicketBuyerRequest.AsObject,
    }
  }
}

export class CheckConnectionRequest extends jspb.Message {
  hasGrpcEndpoint(): boolean;
  clearGrpcEndpoint(): void;
  getGrpcEndpoint(): GRPCEndpoint | undefined;
  setGrpcEndpoint(value?: GRPCEndpoint): void;

  hasRpcEndpoint(): boolean;
  clearRpcEndpoint(): void;
  getRpcEndpoint(): RPCEndpoint | undefined;
  setRpcEndpoint(value?: RPCEndpoint): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckConnectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CheckConnectionRequest): CheckConnectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckConnectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckConnectionRequest;
  static deserializeBinaryFromReader(message: CheckConnectionRequest, reader: jspb.BinaryReader): CheckConnectionRequest;
}

export namespace CheckConnectionRequest {
  export type AsObject = {
    grpcEndpoint?: GRPCEndpoint.AsObject,
    rpcEndpoint?: RPCEndpoint.AsObject,
  }
}

export class CheckConnectionResponse extends jspb.Message {
  getIssuccess(): boolean;
  setIssuccess(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckConnectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CheckConnectionResponse): CheckConnectionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckConnectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckConnectionResponse;
  static deserializeBinaryFromReader(message: CheckConnectionResponse, reader: jspb.BinaryReader): CheckConnectionResponse;
}

export namespace CheckConnectionResponse {
  export type AsObject = {
    issuccess: boolean,
    error: string,
  }
}

export class ConnectWalletRequest extends jspb.Message {
  getWalletEndpointId(): string;
  setWalletEndpointId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConnectWalletRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConnectWalletRequest): ConnectWalletRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConnectWalletRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConnectWalletRequest;
  static deserializeBinaryFromReader(message: ConnectWalletRequest, reader: jspb.BinaryReader): ConnectWalletRequest;
}

export namespace ConnectWalletRequest {
  export type AsObject = {
    walletEndpointId: string,
  }
}

export class ConnectWalletResponse extends jspb.Message {
  getIssuccess(): boolean;
  setIssuccess(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  hasEndpoint(): boolean;
  clearEndpoint(): void;
  getEndpoint(): GRPCEndpoint | undefined;
  setEndpoint(value?: GRPCEndpoint): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConnectWalletResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConnectWalletResponse): ConnectWalletResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConnectWalletResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConnectWalletResponse;
  static deserializeBinaryFromReader(message: ConnectWalletResponse, reader: jspb.BinaryReader): ConnectWalletResponse;
}

export namespace ConnectWalletResponse {
  export type AsObject = {
    issuccess: boolean,
    error: string,
    endpoint?: GRPCEndpoint.AsObject,
  }
}

export class AltCurrencyRates extends jspb.Message {
  clearRatesList(): void;
  getRatesList(): Array<AltCurrencyRates.AltCurrencyRate>;
  setRatesList(value: Array<AltCurrencyRates.AltCurrencyRate>): void;
  addRates(value?: AltCurrencyRates.AltCurrencyRate, index?: number): AltCurrencyRates.AltCurrencyRate;

  getLastUpdatedTs(): number;
  setLastUpdatedTs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AltCurrencyRates.AsObject;
  static toObject(includeInstance: boolean, msg: AltCurrencyRates): AltCurrencyRates.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AltCurrencyRates, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AltCurrencyRates;
  static deserializeBinaryFromReader(message: AltCurrencyRates, reader: jspb.BinaryReader): AltCurrencyRates;
}

export namespace AltCurrencyRates {
  export type AsObject = {
    ratesList: Array<AltCurrencyRates.AltCurrencyRate.AsObject>,
    lastUpdatedTs: number,
  }

  export class AltCurrencyRate extends jspb.Message {
    getCurrencyCode(): string;
    setCurrencyCode(value: string): void;

    getCurrentRate(): number;
    setCurrentRate(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AltCurrencyRate.AsObject;
    static toObject(includeInstance: boolean, msg: AltCurrencyRate): AltCurrencyRate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AltCurrencyRate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AltCurrencyRate;
    static deserializeBinaryFromReader(message: AltCurrencyRate, reader: jspb.BinaryReader): AltCurrencyRate;
  }

  export namespace AltCurrencyRate {
    export type AsObject = {
      currencyCode: string,
      currentRate: number,
    }
  }
}

export class GetMarketChartRequest extends jspb.Message {
  getCurrencyCode(): string;
  setCurrencyCode(value: string): void;

  getDays(): number;
  setDays(value: number): void;

  getStartTimestamp(): number;
  setStartTimestamp(value: number): void;

  getEndTimestamp(): number;
  setEndTimestamp(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMarketChartRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMarketChartRequest): GetMarketChartRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMarketChartRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMarketChartRequest;
  static deserializeBinaryFromReader(message: GetMarketChartRequest, reader: jspb.BinaryReader): GetMarketChartRequest;
}

export namespace GetMarketChartRequest {
  export type AsObject = {
    currencyCode: string,
    days: number,
    startTimestamp: number,
    endTimestamp: number,
  }
}

export class GetMarketChartResponse extends jspb.Message {
  clearPricesList(): void;
  getPricesList(): Array<GetMarketChartResponse.MarketChartDataPoint>;
  setPricesList(value: Array<GetMarketChartResponse.MarketChartDataPoint>): void;
  addPrices(value?: GetMarketChartResponse.MarketChartDataPoint, index?: number): GetMarketChartResponse.MarketChartDataPoint;

  clearVolumesList(): void;
  getVolumesList(): Array<GetMarketChartResponse.MarketChartDataPoint>;
  setVolumesList(value: Array<GetMarketChartResponse.MarketChartDataPoint>): void;
  addVolumes(value?: GetMarketChartResponse.MarketChartDataPoint, index?: number): GetMarketChartResponse.MarketChartDataPoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMarketChartResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMarketChartResponse): GetMarketChartResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMarketChartResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMarketChartResponse;
  static deserializeBinaryFromReader(message: GetMarketChartResponse, reader: jspb.BinaryReader): GetMarketChartResponse;
}

export namespace GetMarketChartResponse {
  export type AsObject = {
    pricesList: Array<GetMarketChartResponse.MarketChartDataPoint.AsObject>,
    volumesList: Array<GetMarketChartResponse.MarketChartDataPoint.AsObject>,
  }

  export class MarketChartDataPoint extends jspb.Message {
    getTimestamp(): number;
    setTimestamp(value: number): void;

    getValue(): number;
    setValue(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MarketChartDataPoint.AsObject;
    static toObject(includeInstance: boolean, msg: MarketChartDataPoint): MarketChartDataPoint.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MarketChartDataPoint, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MarketChartDataPoint;
    static deserializeBinaryFromReader(message: MarketChartDataPoint, reader: jspb.BinaryReader): MarketChartDataPoint;
  }

  export namespace MarketChartDataPoint {
    export type AsObject = {
      timestamp: number,
      value: number,
    }
  }
}

export class StakingHistory extends jspb.Message {
  getLastBlock(): number;
  setLastBlock(value: number): void;

  clearLineItemsList(): void;
  getLineItemsList(): Array<StakingHistory.StakingHistoryLineItem>;
  setLineItemsList(value: Array<StakingHistory.StakingHistoryLineItem>): void;
  addLineItems(value?: StakingHistory.StakingHistoryLineItem, index?: number): StakingHistory.StakingHistoryLineItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StakingHistory.AsObject;
  static toObject(includeInstance: boolean, msg: StakingHistory): StakingHistory.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StakingHistory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StakingHistory;
  static deserializeBinaryFromReader(message: StakingHistory, reader: jspb.BinaryReader): StakingHistory;
}

export namespace StakingHistory {
  export type AsObject = {
    lastBlock: number,
    lineItemsList: Array<StakingHistory.StakingHistoryLineItem.AsObject>,
  }

  export class StakingHistoryLineItem extends jspb.Message {
    getTxType(): api_pb.TransactionDetails.TransactionTypeMap[keyof api_pb.TransactionDetails.TransactionTypeMap];
    setTxType(value: api_pb.TransactionDetails.TransactionTypeMap[keyof api_pb.TransactionDetails.TransactionTypeMap]): void;

    getRewardCredit(): number;
    setRewardCredit(value: number): void;

    getTicketCostCredit(): number;
    setTicketCostCredit(value: number): void;

    getTicketCostDebit(): number;
    setTicketCostDebit(value: number): void;

    getFeeDebit(): number;
    setFeeDebit(value: number): void;

    getTimestamp(): number;
    setTimestamp(value: number): void;

    getTxHash(): Uint8Array | string;
    getTxHash_asU8(): Uint8Array;
    getTxHash_asB64(): string;
    setTxHash(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StakingHistoryLineItem.AsObject;
    static toObject(includeInstance: boolean, msg: StakingHistoryLineItem): StakingHistoryLineItem.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StakingHistoryLineItem, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StakingHistoryLineItem;
    static deserializeBinaryFromReader(message: StakingHistoryLineItem, reader: jspb.BinaryReader): StakingHistoryLineItem;
  }

  export namespace StakingHistoryLineItem {
    export type AsObject = {
      txType: api_pb.TransactionDetails.TransactionTypeMap[keyof api_pb.TransactionDetails.TransactionTypeMap],
      rewardCredit: number,
      ticketCostCredit: number,
      ticketCostDebit: number,
      feeDebit: number,
      timestamp: number,
      txHash: Uint8Array | string,
    }
  }
}

export class StakeDiffHistory extends jspb.Message {
  clearSdiffValuesList(): void;
  getSdiffValuesList(): Array<number>;
  setSdiffValuesList(value: Array<number>): void;
  addSdiffValues(value: number, index?: number): number;

  getStartBlock(): number;
  setStartBlock(value: number): void;

  getEndBlock(): number;
  setEndBlock(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StakeDiffHistory.AsObject;
  static toObject(includeInstance: boolean, msg: StakeDiffHistory): StakeDiffHistory.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StakeDiffHistory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StakeDiffHistory;
  static deserializeBinaryFromReader(message: StakeDiffHistory, reader: jspb.BinaryReader): StakeDiffHistory;
}

export namespace StakeDiffHistory {
  export type AsObject = {
    sdiffValuesList: Array<number>,
    startBlock: number,
    endBlock: number,
  }
}

export class UnspentOutput extends jspb.Message {
  getTransactionHash(): Uint8Array | string;
  getTransactionHash_asU8(): Uint8Array;
  getTransactionHash_asB64(): string;
  setTransactionHash(value: Uint8Array | string): void;

  getOutputIndex(): number;
  setOutputIndex(value: number): void;

  getAmount(): number;
  setAmount(value: number): void;

  getPkScript(): Uint8Array | string;
  getPkScript_asU8(): Uint8Array;
  getPkScript_asB64(): string;
  setPkScript(value: Uint8Array | string): void;

  getReceiveTime(): number;
  setReceiveTime(value: number): void;

  getFromCoinbase(): boolean;
  setFromCoinbase(value: boolean): void;

  getTree(): number;
  setTree(value: number): void;

  getAmountSum(): number;
  setAmountSum(value: number): void;

  getScriptClass(): number;
  setScriptClass(value: number): void;

  getSpendable(): boolean;
  setSpendable(value: boolean): void;

  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnspentOutput.AsObject;
  static toObject(includeInstance: boolean, msg: UnspentOutput): UnspentOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnspentOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnspentOutput;
  static deserializeBinaryFromReader(message: UnspentOutput, reader: jspb.BinaryReader): UnspentOutput;
}

export namespace UnspentOutput {
  export type AsObject = {
    transactionHash: Uint8Array | string,
    outputIndex: number,
    amount: number,
    pkScript: Uint8Array | string,
    receiveTime: number,
    fromCoinbase: boolean,
    tree: number,
    amountSum: number,
    scriptClass: number,
    spendable: boolean,
    address: string,
  }
}

export class CreateTransactionRequest extends jspb.Message {
  clearSourceOutputsList(): void;
  getSourceOutputsList(): Array<UnspentOutput>;
  setSourceOutputsList(value: Array<UnspentOutput>): void;
  addSourceOutputs(value?: UnspentOutput, index?: number): UnspentOutput;

  getAmountsMap(): jspb.Map<string, number>;
  clearAmountsMap(): void;
  getLockTime(): number;
  setLockTime(value: number): void;

  getExpiry(): number;
  setExpiry(value: number): void;

  getFeeRate(): number;
  setFeeRate(value: number): void;

  getSourceAccount(): number;
  setSourceAccount(value: number): void;

  getChangeAccount(): number;
  setChangeAccount(value: number): void;

  getRequiredConfirmations(): number;
  setRequiredConfirmations(value: number): void;

  getSendAllFlag(): boolean;
  setSendAllFlag(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTransactionRequest): CreateTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTransactionRequest;
  static deserializeBinaryFromReader(message: CreateTransactionRequest, reader: jspb.BinaryReader): CreateTransactionRequest;
}

export namespace CreateTransactionRequest {
  export type AsObject = {
    sourceOutputsList: Array<UnspentOutput.AsObject>,
    amountsMap: Array<[string, number]>,
    lockTime: number,
    expiry: number,
    feeRate: number,
    sourceAccount: number,
    changeAccount: number,
    requiredConfirmations: number,
    sendAllFlag: boolean,
  }
}

export class CreateTransactionResponse extends jspb.Message {
  getUnsignedTransaction(): Uint8Array | string;
  getUnsignedTransaction_asU8(): Uint8Array;
  getUnsignedTransaction_asB64(): string;
  setUnsignedTransaction(value: Uint8Array | string): void;

  getEstimatedSignedSize(): number;
  setEstimatedSignedSize(value: number): void;

  getEstimatedFee(): number;
  setEstimatedFee(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTransactionResponse): CreateTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTransactionResponse;
  static deserializeBinaryFromReader(message: CreateTransactionResponse, reader: jspb.BinaryReader): CreateTransactionResponse;
}

export namespace CreateTransactionResponse {
  export type AsObject = {
    unsignedTransaction: Uint8Array | string,
    estimatedSignedSize: number,
    estimatedFee: number,
  }
}

export interface NetworkMap {
  MAINNET: 0;
  TESTNET: 1;
  SIMNET: 2;
}

export const Network: NetworkMap;

export interface DisplayUnitMap {
  DCR: 0;
  ATOMS: 1;
}

export const DisplayUnit: DisplayUnitMap;

export interface FiatCurrencyMap {
  USD: 0;
  EUR: 1;
}

export const FiatCurrency: FiatCurrencyMap;

export interface ThemeMap {
  LIGHT: 0;
  DARK: 1;
}

export const Theme: ThemeMap;

