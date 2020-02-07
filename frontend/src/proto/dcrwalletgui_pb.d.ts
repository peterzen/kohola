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

export class AppConfiguration extends jspb.Message {
  hasDcrdHost(): boolean;
  clearDcrdHost(): void;
  getDcrdHost(): AppConfiguration.RPCEndpoint | undefined;
  setDcrdHost(value?: AppConfiguration.RPCEndpoint): void;

  clearDcrwalletHostsList(): void;
  getDcrwalletHostsList(): Array<AppConfiguration.RPCEndpoint>;
  setDcrwalletHostsList(value: Array<AppConfiguration.RPCEndpoint>): void;
  addDcrwalletHosts(value?: AppConfiguration.RPCEndpoint, index?: number): AppConfiguration.RPCEndpoint;

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
    dcrdHost?: AppConfiguration.RPCEndpoint.AsObject,
    dcrwalletHostsList: Array<AppConfiguration.RPCEndpoint.AsObject>,
  }

  export class RPCEndpoint extends jspb.Message {
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

    getNetwork(): AppConfiguration.NetworkMap[keyof AppConfiguration.NetworkMap];
    setNetwork(value: AppConfiguration.NetworkMap[keyof AppConfiguration.NetworkMap]): void;

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
      hostname: string,
      port: number,
      username: string,
      password: string,
      certFileName: string,
      certBlob: string,
      network: AppConfiguration.NetworkMap[keyof AppConfiguration.NetworkMap],
    }
  }

  export interface NetworkMap {
    MAINNET: 0;
    TESTNET: 1;
    SIMNET: 2;
  }

  export const Network: NetworkMap;
}

