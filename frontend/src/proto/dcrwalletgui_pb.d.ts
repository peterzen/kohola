// package: dcrwalletgui
// file: dcrwalletgui.proto

import * as jspb from "google-protobuf";

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

  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

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
    passphrase: Uint8Array | string,
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
  }
}

export class AccountPreference extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

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
    accountNumber: number,
    isHidden: boolean,
    displayOrder: number,
  }
}

export class WalletPreferences extends jspb.Message {
  getWalletEndpointId(): string;
  setWalletEndpointId(value: string): void;

  clearAccountPrefsList(): void;
  getAccountPrefsList(): Array<AccountPreference>;
  setAccountPrefsList(value: Array<AccountPreference>): void;
  addAccountPrefs(value?: AccountPreference, index?: number): AccountPreference;

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
    walletEndpointId: string,
    accountPrefsList: Array<AccountPreference.AsObject>,
  }
}

export class AppConfiguration extends jspb.Message {
  hasDcrdEndpoint(): boolean;
  clearDcrdEndpoint(): void;
  getDcrdEndpoint(): RPCEndpoint | undefined;
  setDcrdEndpoint(value?: RPCEndpoint): void;

  clearWalletEndpointsList(): void;
  getWalletEndpointsList(): Array<GRPCEndpoint>;
  setWalletEndpointsList(value: Array<GRPCEndpoint>): void;
  addWalletEndpoints(value?: GRPCEndpoint, index?: number): GRPCEndpoint;

  getDefaultWalletEndpointId(): string;
  setDefaultWalletEndpointId(value: string): void;

  clearWalletPreferencesList(): void;
  getWalletPreferencesList(): Array<WalletPreferences>;
  setWalletPreferencesList(value: Array<WalletPreferences>): void;
  addWalletPreferences(value?: WalletPreferences, index?: number): WalletPreferences;

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
    dcrdEndpoint?: RPCEndpoint.AsObject,
    walletEndpointsList: Array<GRPCEndpoint.AsObject>,
    defaultWalletEndpointId: string,
    walletPreferencesList: Array<WalletPreferences.AsObject>,
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

export interface NetworkMap {
  MAINNET: 0;
  TESTNET: 1;
  SIMNET: 2;
}

export const Network: NetworkMap;

