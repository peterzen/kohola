// package: walletrpc
// file: api.proto

import * as jspb from "google-protobuf";

export class VersionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VersionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VersionRequest): VersionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VersionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VersionRequest;
  static deserializeBinaryFromReader(message: VersionRequest, reader: jspb.BinaryReader): VersionRequest;
}

export namespace VersionRequest {
  export type AsObject = {
  }
}

export class VersionResponse extends jspb.Message {
  getVersionString(): string;
  setVersionString(value: string): void;

  getMajor(): number;
  setMajor(value: number): void;

  getMinor(): number;
  setMinor(value: number): void;

  getPatch(): number;
  setPatch(value: number): void;

  getPrerelease(): string;
  setPrerelease(value: string): void;

  getBuildMetadata(): string;
  setBuildMetadata(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VersionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VersionResponse): VersionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VersionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VersionResponse;
  static deserializeBinaryFromReader(message: VersionResponse, reader: jspb.BinaryReader): VersionResponse;
}

export namespace VersionResponse {
  export type AsObject = {
    versionString: string,
    major: number,
    minor: number,
    patch: number,
    prerelease: string,
    buildMetadata: string,
  }
}

export class TransactionDetails extends jspb.Message {
  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  getTransaction(): Uint8Array | string;
  getTransaction_asU8(): Uint8Array;
  getTransaction_asB64(): string;
  setTransaction(value: Uint8Array | string): void;

  clearDebitsList(): void;
  getDebitsList(): Array<TransactionDetails.Input>;
  setDebitsList(value: Array<TransactionDetails.Input>): void;
  addDebits(value?: TransactionDetails.Input, index?: number): TransactionDetails.Input;

  clearCreditsList(): void;
  getCreditsList(): Array<TransactionDetails.Output>;
  setCreditsList(value: Array<TransactionDetails.Output>): void;
  addCredits(value?: TransactionDetails.Output, index?: number): TransactionDetails.Output;

  getFee(): number;
  setFee(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getTransactionType(): TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap];
  setTransactionType(value: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionDetails.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionDetails): TransactionDetails.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionDetails;
  static deserializeBinaryFromReader(message: TransactionDetails, reader: jspb.BinaryReader): TransactionDetails;
}

export namespace TransactionDetails {
  export type AsObject = {
    hash: Uint8Array | string,
    transaction: Uint8Array | string,
    debitsList: Array<TransactionDetails.Input.AsObject>,
    creditsList: Array<TransactionDetails.Output.AsObject>,
    fee: number,
    timestamp: number,
    transactionType: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap],
  }

  export class Input extends jspb.Message {
    getIndex(): number;
    setIndex(value: number): void;

    getPreviousAccount(): number;
    setPreviousAccount(value: number): void;

    getPreviousAmount(): number;
    setPreviousAmount(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Input.AsObject;
    static toObject(includeInstance: boolean, msg: Input): Input.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Input, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Input;
    static deserializeBinaryFromReader(message: Input, reader: jspb.BinaryReader): Input;
  }

  export namespace Input {
    export type AsObject = {
      index: number,
      previousAccount: number,
      previousAmount: number,
    }
  }

  export class Output extends jspb.Message {
    getIndex(): number;
    setIndex(value: number): void;

    getAccount(): number;
    setAccount(value: number): void;

    getInternal(): boolean;
    setInternal(value: boolean): void;

    getAmount(): number;
    setAmount(value: number): void;

    getAddress(): string;
    setAddress(value: string): void;

    getOutputScript(): Uint8Array | string;
    getOutputScript_asU8(): Uint8Array;
    getOutputScript_asB64(): string;
    setOutputScript(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Output.AsObject;
    static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Output;
    static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
  }

  export namespace Output {
    export type AsObject = {
      index: number,
      account: number,
      internal: boolean,
      amount: number,
      address: string,
      outputScript: Uint8Array | string,
    }
  }

  export interface TransactionTypeMap {
    REGULAR: 0;
    COINBASE: 4;
    TICKET_PURCHASE: 1;
    VOTE: 2;
    REVOCATION: 3;
  }

  export const TransactionType: TransactionTypeMap;
}

export class BlockDetails extends jspb.Message {
  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  getHeight(): number;
  setHeight(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getApprovesParent(): boolean;
  setApprovesParent(value: boolean): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<TransactionDetails>;
  setTransactionsList(value: Array<TransactionDetails>): void;
  addTransactions(value?: TransactionDetails, index?: number): TransactionDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockDetails.AsObject;
  static toObject(includeInstance: boolean, msg: BlockDetails): BlockDetails.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockDetails;
  static deserializeBinaryFromReader(message: BlockDetails, reader: jspb.BinaryReader): BlockDetails;
}

export namespace BlockDetails {
  export type AsObject = {
    hash: Uint8Array | string,
    height: number,
    timestamp: number,
    approvesParent: boolean,
    transactionsList: Array<TransactionDetails.AsObject>,
  }
}

export class AccountBalance extends jspb.Message {
  getAccount(): number;
  setAccount(value: number): void;

  getTotalBalance(): number;
  setTotalBalance(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountBalance.AsObject;
  static toObject(includeInstance: boolean, msg: AccountBalance): AccountBalance.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountBalance, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountBalance;
  static deserializeBinaryFromReader(message: AccountBalance, reader: jspb.BinaryReader): AccountBalance;
}

export namespace AccountBalance {
  export type AsObject = {
    account: number,
    totalBalance: number,
  }
}

export class PingRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingRequest;
  static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
  export type AsObject = {
  }
}

export class PingResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PingResponse): PingResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingResponse;
  static deserializeBinaryFromReader(message: PingResponse, reader: jspb.BinaryReader): PingResponse;
}

export namespace PingResponse {
  export type AsObject = {
  }
}

export class NetworkRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NetworkRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NetworkRequest): NetworkRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NetworkRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NetworkRequest;
  static deserializeBinaryFromReader(message: NetworkRequest, reader: jspb.BinaryReader): NetworkRequest;
}

export namespace NetworkRequest {
  export type AsObject = {
  }
}

export class NetworkResponse extends jspb.Message {
  getActiveNetwork(): number;
  setActiveNetwork(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NetworkResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NetworkResponse): NetworkResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NetworkResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NetworkResponse;
  static deserializeBinaryFromReader(message: NetworkResponse, reader: jspb.BinaryReader): NetworkResponse;
}

export namespace NetworkResponse {
  export type AsObject = {
    activeNetwork: number,
  }
}

export class CoinTypeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinTypeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CoinTypeRequest): CoinTypeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CoinTypeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinTypeRequest;
  static deserializeBinaryFromReader(message: CoinTypeRequest, reader: jspb.BinaryReader): CoinTypeRequest;
}

export namespace CoinTypeRequest {
  export type AsObject = {
  }
}

export class CoinTypeResponse extends jspb.Message {
  getCoinType(): number;
  setCoinType(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinTypeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CoinTypeResponse): CoinTypeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CoinTypeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinTypeResponse;
  static deserializeBinaryFromReader(message: CoinTypeResponse, reader: jspb.BinaryReader): CoinTypeResponse;
}

export namespace CoinTypeResponse {
  export type AsObject = {
    coinType: number,
  }
}

export class AccountNumberRequest extends jspb.Message {
  getAccountName(): string;
  setAccountName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountNumberRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountNumberRequest): AccountNumberRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountNumberRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountNumberRequest;
  static deserializeBinaryFromReader(message: AccountNumberRequest, reader: jspb.BinaryReader): AccountNumberRequest;
}

export namespace AccountNumberRequest {
  export type AsObject = {
    accountName: string,
  }
}

export class AccountNumberResponse extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountNumberResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AccountNumberResponse): AccountNumberResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountNumberResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountNumberResponse;
  static deserializeBinaryFromReader(message: AccountNumberResponse, reader: jspb.BinaryReader): AccountNumberResponse;
}

export namespace AccountNumberResponse {
  export type AsObject = {
    accountNumber: number,
  }
}

export class AccountsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountsRequest): AccountsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountsRequest;
  static deserializeBinaryFromReader(message: AccountsRequest, reader: jspb.BinaryReader): AccountsRequest;
}

export namespace AccountsRequest {
  export type AsObject = {
  }
}

export class AccountsResponse extends jspb.Message {
  clearAccountsList(): void;
  getAccountsList(): Array<AccountsResponse.Account>;
  setAccountsList(value: Array<AccountsResponse.Account>): void;
  addAccounts(value?: AccountsResponse.Account, index?: number): AccountsResponse.Account;

  getCurrentBlockHash(): Uint8Array | string;
  getCurrentBlockHash_asU8(): Uint8Array;
  getCurrentBlockHash_asB64(): string;
  setCurrentBlockHash(value: Uint8Array | string): void;

  getCurrentBlockHeight(): number;
  setCurrentBlockHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AccountsResponse): AccountsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountsResponse;
  static deserializeBinaryFromReader(message: AccountsResponse, reader: jspb.BinaryReader): AccountsResponse;
}

export namespace AccountsResponse {
  export type AsObject = {
    accountsList: Array<AccountsResponse.Account.AsObject>,
    currentBlockHash: Uint8Array | string,
    currentBlockHeight: number,
  }

  export class Account extends jspb.Message {
    getAccountNumber(): number;
    setAccountNumber(value: number): void;

    getAccountName(): string;
    setAccountName(value: string): void;

    getTotalBalance(): number;
    setTotalBalance(value: number): void;

    getExternalKeyCount(): number;
    setExternalKeyCount(value: number): void;

    getInternalKeyCount(): number;
    setInternalKeyCount(value: number): void;

    getImportedKeyCount(): number;
    setImportedKeyCount(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Account.AsObject;
    static toObject(includeInstance: boolean, msg: Account): Account.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Account, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Account;
    static deserializeBinaryFromReader(message: Account, reader: jspb.BinaryReader): Account;
  }

  export namespace Account {
    export type AsObject = {
      accountNumber: number,
      accountName: string,
      totalBalance: number,
      externalKeyCount: number,
      internalKeyCount: number,
      importedKeyCount: number,
    }
  }
}

export class RenameAccountRequest extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  getNewName(): string;
  setNewName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RenameAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RenameAccountRequest): RenameAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RenameAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RenameAccountRequest;
  static deserializeBinaryFromReader(message: RenameAccountRequest, reader: jspb.BinaryReader): RenameAccountRequest;
}

export namespace RenameAccountRequest {
  export type AsObject = {
    accountNumber: number,
    newName: string,
  }
}

export class RenameAccountResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RenameAccountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RenameAccountResponse): RenameAccountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RenameAccountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RenameAccountResponse;
  static deserializeBinaryFromReader(message: RenameAccountResponse, reader: jspb.BinaryReader): RenameAccountResponse;
}

export namespace RenameAccountResponse {
  export type AsObject = {
  }
}

export class RescanRequest extends jspb.Message {
  getBeginHeight(): number;
  setBeginHeight(value: number): void;

  getBeginHash(): Uint8Array | string;
  getBeginHash_asU8(): Uint8Array;
  getBeginHash_asB64(): string;
  setBeginHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RescanRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RescanRequest): RescanRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RescanRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RescanRequest;
  static deserializeBinaryFromReader(message: RescanRequest, reader: jspb.BinaryReader): RescanRequest;
}

export namespace RescanRequest {
  export type AsObject = {
    beginHeight: number,
    beginHash: Uint8Array | string,
  }
}

export class RescanResponse extends jspb.Message {
  getRescannedThrough(): number;
  setRescannedThrough(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RescanResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RescanResponse): RescanResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RescanResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RescanResponse;
  static deserializeBinaryFromReader(message: RescanResponse, reader: jspb.BinaryReader): RescanResponse;
}

export namespace RescanResponse {
  export type AsObject = {
    rescannedThrough: number,
  }
}

export class NextAccountRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getAccountName(): string;
  setAccountName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NextAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NextAccountRequest): NextAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NextAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NextAccountRequest;
  static deserializeBinaryFromReader(message: NextAccountRequest, reader: jspb.BinaryReader): NextAccountRequest;
}

export namespace NextAccountRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    accountName: string,
  }
}

export class NextAccountResponse extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NextAccountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NextAccountResponse): NextAccountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NextAccountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NextAccountResponse;
  static deserializeBinaryFromReader(message: NextAccountResponse, reader: jspb.BinaryReader): NextAccountResponse;
}

export namespace NextAccountResponse {
  export type AsObject = {
    accountNumber: number,
  }
}

export class NextAddressRequest extends jspb.Message {
  getAccount(): number;
  setAccount(value: number): void;

  getKind(): NextAddressRequest.KindMap[keyof NextAddressRequest.KindMap];
  setKind(value: NextAddressRequest.KindMap[keyof NextAddressRequest.KindMap]): void;

  getGapPolicy(): NextAddressRequest.GapPolicyMap[keyof NextAddressRequest.GapPolicyMap];
  setGapPolicy(value: NextAddressRequest.GapPolicyMap[keyof NextAddressRequest.GapPolicyMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NextAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NextAddressRequest): NextAddressRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NextAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NextAddressRequest;
  static deserializeBinaryFromReader(message: NextAddressRequest, reader: jspb.BinaryReader): NextAddressRequest;
}

export namespace NextAddressRequest {
  export type AsObject = {
    account: number,
    kind: NextAddressRequest.KindMap[keyof NextAddressRequest.KindMap],
    gapPolicy: NextAddressRequest.GapPolicyMap[keyof NextAddressRequest.GapPolicyMap],
  }

  export interface KindMap {
    BIP0044_EXTERNAL: 0;
    BIP0044_INTERNAL: 1;
  }

  export const Kind: KindMap;

  export interface GapPolicyMap {
    GAP_POLICY_UNSPECIFIED: 0;
    GAP_POLICY_ERROR: 1;
    GAP_POLICY_IGNORE: 2;
    GAP_POLICY_WRAP: 3;
  }

  export const GapPolicy: GapPolicyMap;
}

export class NextAddressResponse extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getPublicKey(): string;
  setPublicKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NextAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NextAddressResponse): NextAddressResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NextAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NextAddressResponse;
  static deserializeBinaryFromReader(message: NextAddressResponse, reader: jspb.BinaryReader): NextAddressResponse;
}

export namespace NextAddressResponse {
  export type AsObject = {
    address: string,
    publicKey: string,
  }
}

export class ImportPrivateKeyRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getAccount(): number;
  setAccount(value: number): void;

  getPrivateKeyWif(): string;
  setPrivateKeyWif(value: string): void;

  getRescan(): boolean;
  setRescan(value: boolean): void;

  getScanFrom(): number;
  setScanFrom(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportPrivateKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ImportPrivateKeyRequest): ImportPrivateKeyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ImportPrivateKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportPrivateKeyRequest;
  static deserializeBinaryFromReader(message: ImportPrivateKeyRequest, reader: jspb.BinaryReader): ImportPrivateKeyRequest;
}

export namespace ImportPrivateKeyRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    account: number,
    privateKeyWif: string,
    rescan: boolean,
    scanFrom: number,
  }
}

export class ImportPrivateKeyResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportPrivateKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ImportPrivateKeyResponse): ImportPrivateKeyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ImportPrivateKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportPrivateKeyResponse;
  static deserializeBinaryFromReader(message: ImportPrivateKeyResponse, reader: jspb.BinaryReader): ImportPrivateKeyResponse;
}

export namespace ImportPrivateKeyResponse {
  export type AsObject = {
  }
}

export class ImportScriptRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getScript(): Uint8Array | string;
  getScript_asU8(): Uint8Array;
  getScript_asB64(): string;
  setScript(value: Uint8Array | string): void;

  getRescan(): boolean;
  setRescan(value: boolean): void;

  getScanFrom(): number;
  setScanFrom(value: number): void;

  getRequireRedeemable(): boolean;
  setRequireRedeemable(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportScriptRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ImportScriptRequest): ImportScriptRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ImportScriptRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportScriptRequest;
  static deserializeBinaryFromReader(message: ImportScriptRequest, reader: jspb.BinaryReader): ImportScriptRequest;
}

export namespace ImportScriptRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    script: Uint8Array | string,
    rescan: boolean,
    scanFrom: number,
    requireRedeemable: boolean,
  }
}

export class ImportScriptResponse extends jspb.Message {
  getP2shAddress(): string;
  setP2shAddress(value: string): void;

  getRedeemable(): boolean;
  setRedeemable(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportScriptResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ImportScriptResponse): ImportScriptResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ImportScriptResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportScriptResponse;
  static deserializeBinaryFromReader(message: ImportScriptResponse, reader: jspb.BinaryReader): ImportScriptResponse;
}

export namespace ImportScriptResponse {
  export type AsObject = {
    p2shAddress: string,
    redeemable: boolean,
  }
}

export class BalanceRequest extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  getRequiredConfirmations(): number;
  setRequiredConfirmations(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceRequest): BalanceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceRequest;
  static deserializeBinaryFromReader(message: BalanceRequest, reader: jspb.BinaryReader): BalanceRequest;
}

export namespace BalanceRequest {
  export type AsObject = {
    accountNumber: number,
    requiredConfirmations: number,
  }
}

export class BalanceResponse extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  getSpendable(): number;
  setSpendable(value: number): void;

  getImmatureReward(): number;
  setImmatureReward(value: number): void;

  getImmatureStakeGeneration(): number;
  setImmatureStakeGeneration(value: number): void;

  getLockedByTickets(): number;
  setLockedByTickets(value: number): void;

  getVotingAuthority(): number;
  setVotingAuthority(value: number): void;

  getUnconfirmed(): number;
  setUnconfirmed(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceResponse): BalanceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceResponse;
  static deserializeBinaryFromReader(message: BalanceResponse, reader: jspb.BinaryReader): BalanceResponse;
}

export namespace BalanceResponse {
  export type AsObject = {
    total: number,
    spendable: number,
    immatureReward: number,
    immatureStakeGeneration: number,
    lockedByTickets: number,
    votingAuthority: number,
    unconfirmed: number,
  }
}

export class GetTransactionRequest extends jspb.Message {
  getTransactionHash(): Uint8Array | string;
  getTransactionHash_asU8(): Uint8Array;
  getTransactionHash_asB64(): string;
  setTransactionHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionRequest): GetTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionRequest;
  static deserializeBinaryFromReader(message: GetTransactionRequest, reader: jspb.BinaryReader): GetTransactionRequest;
}

export namespace GetTransactionRequest {
  export type AsObject = {
    transactionHash: Uint8Array | string,
  }
}

export class GetTransactionResponse extends jspb.Message {
  hasTransaction(): boolean;
  clearTransaction(): void;
  getTransaction(): TransactionDetails | undefined;
  setTransaction(value?: TransactionDetails): void;

  getConfirmations(): number;
  setConfirmations(value: number): void;

  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionResponse): GetTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionResponse;
  static deserializeBinaryFromReader(message: GetTransactionResponse, reader: jspb.BinaryReader): GetTransactionResponse;
}

export namespace GetTransactionResponse {
  export type AsObject = {
    transaction?: TransactionDetails.AsObject,
    confirmations: number,
    blockHash: Uint8Array | string,
  }
}

export class GetTransactionsRequest extends jspb.Message {
  getStartingBlockHash(): Uint8Array | string;
  getStartingBlockHash_asU8(): Uint8Array;
  getStartingBlockHash_asB64(): string;
  setStartingBlockHash(value: Uint8Array | string): void;

  getStartingBlockHeight(): number;
  setStartingBlockHeight(value: number): void;

  getEndingBlockHash(): Uint8Array | string;
  getEndingBlockHash_asU8(): Uint8Array;
  getEndingBlockHash_asB64(): string;
  setEndingBlockHash(value: Uint8Array | string): void;

  getEndingBlockHeight(): number;
  setEndingBlockHeight(value: number): void;

  getMinimumRecentTransactions(): number;
  setMinimumRecentTransactions(value: number): void;

  getTargetTransactionCount(): number;
  setTargetTransactionCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionsRequest): GetTransactionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionsRequest;
  static deserializeBinaryFromReader(message: GetTransactionsRequest, reader: jspb.BinaryReader): GetTransactionsRequest;
}

export namespace GetTransactionsRequest {
  export type AsObject = {
    startingBlockHash: Uint8Array | string,
    startingBlockHeight: number,
    endingBlockHash: Uint8Array | string,
    endingBlockHeight: number,
    minimumRecentTransactions: number,
    targetTransactionCount: number,
  }
}

export class GetTransactionsResponse extends jspb.Message {
  hasMinedTransactions(): boolean;
  clearMinedTransactions(): void;
  getMinedTransactions(): BlockDetails | undefined;
  setMinedTransactions(value?: BlockDetails): void;

  clearUnminedTransactionsList(): void;
  getUnminedTransactionsList(): Array<TransactionDetails>;
  setUnminedTransactionsList(value: Array<TransactionDetails>): void;
  addUnminedTransactions(value?: TransactionDetails, index?: number): TransactionDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionsResponse): GetTransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionsResponse;
  static deserializeBinaryFromReader(message: GetTransactionsResponse, reader: jspb.BinaryReader): GetTransactionsResponse;
}

export namespace GetTransactionsResponse {
  export type AsObject = {
    minedTransactions?: BlockDetails.AsObject,
    unminedTransactionsList: Array<TransactionDetails.AsObject>,
  }
}

export class GetTicketRequest extends jspb.Message {
  getTicketHash(): Uint8Array | string;
  getTicketHash_asU8(): Uint8Array;
  getTicketHash_asB64(): string;
  setTicketHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTicketRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTicketRequest): GetTicketRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTicketRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTicketRequest;
  static deserializeBinaryFromReader(message: GetTicketRequest, reader: jspb.BinaryReader): GetTicketRequest;
}

export namespace GetTicketRequest {
  export type AsObject = {
    ticketHash: Uint8Array | string,
  }
}

export class GetTicketsRequest extends jspb.Message {
  getStartingBlockHash(): Uint8Array | string;
  getStartingBlockHash_asU8(): Uint8Array;
  getStartingBlockHash_asB64(): string;
  setStartingBlockHash(value: Uint8Array | string): void;

  getStartingBlockHeight(): number;
  setStartingBlockHeight(value: number): void;

  getEndingBlockHash(): Uint8Array | string;
  getEndingBlockHash_asU8(): Uint8Array;
  getEndingBlockHash_asB64(): string;
  setEndingBlockHash(value: Uint8Array | string): void;

  getEndingBlockHeight(): number;
  setEndingBlockHeight(value: number): void;

  getTargetTicketCount(): number;
  setTargetTicketCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTicketsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTicketsRequest): GetTicketsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTicketsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTicketsRequest;
  static deserializeBinaryFromReader(message: GetTicketsRequest, reader: jspb.BinaryReader): GetTicketsRequest;
}

export namespace GetTicketsRequest {
  export type AsObject = {
    startingBlockHash: Uint8Array | string,
    startingBlockHeight: number,
    endingBlockHash: Uint8Array | string,
    endingBlockHeight: number,
    targetTicketCount: number,
  }
}

export class GetTicketsResponse extends jspb.Message {
  hasTicket(): boolean;
  clearTicket(): void;
  getTicket(): GetTicketsResponse.TicketDetails | undefined;
  setTicket(value?: GetTicketsResponse.TicketDetails): void;

  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): GetTicketsResponse.BlockDetails | undefined;
  setBlock(value?: GetTicketsResponse.BlockDetails): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTicketsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTicketsResponse): GetTicketsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTicketsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTicketsResponse;
  static deserializeBinaryFromReader(message: GetTicketsResponse, reader: jspb.BinaryReader): GetTicketsResponse;
}

export namespace GetTicketsResponse {
  export type AsObject = {
    ticket?: GetTicketsResponse.TicketDetails.AsObject,
    block?: GetTicketsResponse.BlockDetails.AsObject,
  }

  export class TicketDetails extends jspb.Message {
    hasTicket(): boolean;
    clearTicket(): void;
    getTicket(): TransactionDetails | undefined;
    setTicket(value?: TransactionDetails): void;

    hasSpender(): boolean;
    clearSpender(): void;
    getSpender(): TransactionDetails | undefined;
    setSpender(value?: TransactionDetails): void;

    getTicketStatus(): GetTicketsResponse.TicketDetails.TicketStatusMap[keyof GetTicketsResponse.TicketDetails.TicketStatusMap];
    setTicketStatus(value: GetTicketsResponse.TicketDetails.TicketStatusMap[keyof GetTicketsResponse.TicketDetails.TicketStatusMap]): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketDetails.AsObject;
    static toObject(includeInstance: boolean, msg: TicketDetails): TicketDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TicketDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketDetails;
    static deserializeBinaryFromReader(message: TicketDetails, reader: jspb.BinaryReader): TicketDetails;
  }

  export namespace TicketDetails {
    export type AsObject = {
      ticket?: TransactionDetails.AsObject,
      spender?: TransactionDetails.AsObject,
      ticketStatus: GetTicketsResponse.TicketDetails.TicketStatusMap[keyof GetTicketsResponse.TicketDetails.TicketStatusMap],
    }

    export interface TicketStatusMap {
      UNKNOWN: 0;
      UNMINED: 1;
      IMMATURE: 2;
      LIVE: 3;
      VOTED: 4;
      MISSED: 5;
      EXPIRED: 6;
      REVOKED: 7;
    }

    export const TicketStatus: TicketStatusMap;
  }

  export class BlockDetails extends jspb.Message {
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): void;

    getHeight(): number;
    setHeight(value: number): void;

    getTimestamp(): number;
    setTimestamp(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BlockDetails.AsObject;
    static toObject(includeInstance: boolean, msg: BlockDetails): BlockDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BlockDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BlockDetails;
    static deserializeBinaryFromReader(message: BlockDetails, reader: jspb.BinaryReader): BlockDetails;
  }

  export namespace BlockDetails {
    export type AsObject = {
      hash: Uint8Array | string,
      height: number,
      timestamp: number,
    }
  }
}

export class TicketPriceRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TicketPriceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TicketPriceRequest): TicketPriceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TicketPriceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TicketPriceRequest;
  static deserializeBinaryFromReader(message: TicketPriceRequest, reader: jspb.BinaryReader): TicketPriceRequest;
}

export namespace TicketPriceRequest {
  export type AsObject = {
  }
}

export class TicketPriceResponse extends jspb.Message {
  getTicketPrice(): number;
  setTicketPrice(value: number): void;

  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TicketPriceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TicketPriceResponse): TicketPriceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TicketPriceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TicketPriceResponse;
  static deserializeBinaryFromReader(message: TicketPriceResponse, reader: jspb.BinaryReader): TicketPriceResponse;
}

export namespace TicketPriceResponse {
  export type AsObject = {
    ticketPrice: number,
    height: number,
  }
}

export class StakeInfoRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StakeInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StakeInfoRequest): StakeInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StakeInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StakeInfoRequest;
  static deserializeBinaryFromReader(message: StakeInfoRequest, reader: jspb.BinaryReader): StakeInfoRequest;
}

export namespace StakeInfoRequest {
  export type AsObject = {
  }
}

export class StakeInfoResponse extends jspb.Message {
  getPoolSize(): number;
  setPoolSize(value: number): void;

  getAllMempoolTix(): number;
  setAllMempoolTix(value: number): void;

  getOwnMempoolTix(): number;
  setOwnMempoolTix(value: number): void;

  getImmature(): number;
  setImmature(value: number): void;

  getLive(): number;
  setLive(value: number): void;

  getVoted(): number;
  setVoted(value: number): void;

  getMissed(): number;
  setMissed(value: number): void;

  getRevoked(): number;
  setRevoked(value: number): void;

  getExpired(): number;
  setExpired(value: number): void;

  getTotalSubsidy(): number;
  setTotalSubsidy(value: number): void;

  getUnspent(): number;
  setUnspent(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StakeInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StakeInfoResponse): StakeInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StakeInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StakeInfoResponse;
  static deserializeBinaryFromReader(message: StakeInfoResponse, reader: jspb.BinaryReader): StakeInfoResponse;
}

export namespace StakeInfoResponse {
  export type AsObject = {
    poolSize: number,
    allMempoolTix: number,
    ownMempoolTix: number,
    immature: number,
    live: number,
    voted: number,
    missed: number,
    revoked: number,
    expired: number,
    totalSubsidy: number,
    unspent: number,
  }
}

export class BlockInfoRequest extends jspb.Message {
  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  getBlockHeight(): number;
  setBlockHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BlockInfoRequest): BlockInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockInfoRequest;
  static deserializeBinaryFromReader(message: BlockInfoRequest, reader: jspb.BinaryReader): BlockInfoRequest;
}

export namespace BlockInfoRequest {
  export type AsObject = {
    blockHash: Uint8Array | string,
    blockHeight: number,
  }
}

export class BlockInfoResponse extends jspb.Message {
  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  getBlockHeight(): number;
  setBlockHeight(value: number): void;

  getConfirmations(): number;
  setConfirmations(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getBlockHeader(): Uint8Array | string;
  getBlockHeader_asU8(): Uint8Array;
  getBlockHeader_asB64(): string;
  setBlockHeader(value: Uint8Array | string): void;

  getStakeInvalidated(): boolean;
  setStakeInvalidated(value: boolean): void;

  getApprovesParent(): boolean;
  setApprovesParent(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BlockInfoResponse): BlockInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BlockInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockInfoResponse;
  static deserializeBinaryFromReader(message: BlockInfoResponse, reader: jspb.BinaryReader): BlockInfoResponse;
}

export namespace BlockInfoResponse {
  export type AsObject = {
    blockHash: Uint8Array | string,
    blockHeight: number,
    confirmations: number,
    timestamp: number,
    blockHeader: Uint8Array | string,
    stakeInvalidated: boolean,
    approvesParent: boolean,
  }
}

export class ChangePassphraseRequest extends jspb.Message {
  getKey(): ChangePassphraseRequest.KeyMap[keyof ChangePassphraseRequest.KeyMap];
  setKey(value: ChangePassphraseRequest.KeyMap[keyof ChangePassphraseRequest.KeyMap]): void;

  getOldPassphrase(): Uint8Array | string;
  getOldPassphrase_asU8(): Uint8Array;
  getOldPassphrase_asB64(): string;
  setOldPassphrase(value: Uint8Array | string): void;

  getNewPassphrase(): Uint8Array | string;
  getNewPassphrase_asU8(): Uint8Array;
  getNewPassphrase_asB64(): string;
  setNewPassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePassphraseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePassphraseRequest): ChangePassphraseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangePassphraseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePassphraseRequest;
  static deserializeBinaryFromReader(message: ChangePassphraseRequest, reader: jspb.BinaryReader): ChangePassphraseRequest;
}

export namespace ChangePassphraseRequest {
  export type AsObject = {
    key: ChangePassphraseRequest.KeyMap[keyof ChangePassphraseRequest.KeyMap],
    oldPassphrase: Uint8Array | string,
    newPassphrase: Uint8Array | string,
  }

  export interface KeyMap {
    PRIVATE: 0;
    PUBLIC: 1;
  }

  export const Key: KeyMap;
}

export class ChangePassphraseResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePassphraseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePassphraseResponse): ChangePassphraseResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangePassphraseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePassphraseResponse;
  static deserializeBinaryFromReader(message: ChangePassphraseResponse, reader: jspb.BinaryReader): ChangePassphraseResponse;
}

export namespace ChangePassphraseResponse {
  export type AsObject = {
  }
}

export class FundTransactionRequest extends jspb.Message {
  getAccount(): number;
  setAccount(value: number): void;

  getTargetAmount(): number;
  setTargetAmount(value: number): void;

  getRequiredConfirmations(): number;
  setRequiredConfirmations(value: number): void;

  getIncludeImmatureCoinbases(): boolean;
  setIncludeImmatureCoinbases(value: boolean): void;

  getIncludeChangeScript(): boolean;
  setIncludeChangeScript(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FundTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FundTransactionRequest): FundTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FundTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FundTransactionRequest;
  static deserializeBinaryFromReader(message: FundTransactionRequest, reader: jspb.BinaryReader): FundTransactionRequest;
}

export namespace FundTransactionRequest {
  export type AsObject = {
    account: number,
    targetAmount: number,
    requiredConfirmations: number,
    includeImmatureCoinbases: boolean,
    includeChangeScript: boolean,
  }
}

export class FundTransactionResponse extends jspb.Message {
  clearSelectedOutputsList(): void;
  getSelectedOutputsList(): Array<FundTransactionResponse.PreviousOutput>;
  setSelectedOutputsList(value: Array<FundTransactionResponse.PreviousOutput>): void;
  addSelectedOutputs(value?: FundTransactionResponse.PreviousOutput, index?: number): FundTransactionResponse.PreviousOutput;

  getTotalAmount(): number;
  setTotalAmount(value: number): void;

  getChangePkScript(): Uint8Array | string;
  getChangePkScript_asU8(): Uint8Array;
  getChangePkScript_asB64(): string;
  setChangePkScript(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FundTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FundTransactionResponse): FundTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FundTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FundTransactionResponse;
  static deserializeBinaryFromReader(message: FundTransactionResponse, reader: jspb.BinaryReader): FundTransactionResponse;
}

export namespace FundTransactionResponse {
  export type AsObject = {
    selectedOutputsList: Array<FundTransactionResponse.PreviousOutput.AsObject>,
    totalAmount: number,
    changePkScript: Uint8Array | string,
  }

  export class PreviousOutput extends jspb.Message {
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

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PreviousOutput.AsObject;
    static toObject(includeInstance: boolean, msg: PreviousOutput): PreviousOutput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PreviousOutput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PreviousOutput;
    static deserializeBinaryFromReader(message: PreviousOutput, reader: jspb.BinaryReader): PreviousOutput;
  }

  export namespace PreviousOutput {
    export type AsObject = {
      transactionHash: Uint8Array | string,
      outputIndex: number,
      amount: number,
      pkScript: Uint8Array | string,
      receiveTime: number,
      fromCoinbase: boolean,
      tree: number,
    }
  }
}

export class UnspentOutputsRequest extends jspb.Message {
  getAccount(): number;
  setAccount(value: number): void;

  getTargetAmount(): number;
  setTargetAmount(value: number): void;

  getRequiredConfirmations(): number;
  setRequiredConfirmations(value: number): void;

  getIncludeImmatureCoinbases(): boolean;
  setIncludeImmatureCoinbases(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnspentOutputsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UnspentOutputsRequest): UnspentOutputsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnspentOutputsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnspentOutputsRequest;
  static deserializeBinaryFromReader(message: UnspentOutputsRequest, reader: jspb.BinaryReader): UnspentOutputsRequest;
}

export namespace UnspentOutputsRequest {
  export type AsObject = {
    account: number,
    targetAmount: number,
    requiredConfirmations: number,
    includeImmatureCoinbases: boolean,
  }
}

export class UnspentOutputResponse extends jspb.Message {
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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnspentOutputResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnspentOutputResponse): UnspentOutputResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnspentOutputResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnspentOutputResponse;
  static deserializeBinaryFromReader(message: UnspentOutputResponse, reader: jspb.BinaryReader): UnspentOutputResponse;
}

export namespace UnspentOutputResponse {
  export type AsObject = {
    transactionHash: Uint8Array | string,
    outputIndex: number,
    amount: number,
    pkScript: Uint8Array | string,
    receiveTime: number,
    fromCoinbase: boolean,
    tree: number,
    amountSum: number,
  }
}

export class ConstructTransactionRequest extends jspb.Message {
  getSourceAccount(): number;
  setSourceAccount(value: number): void;

  getRequiredConfirmations(): number;
  setRequiredConfirmations(value: number): void;

  getFeePerKb(): number;
  setFeePerKb(value: number): void;

  getOutputSelectionAlgorithm(): ConstructTransactionRequest.OutputSelectionAlgorithmMap[keyof ConstructTransactionRequest.OutputSelectionAlgorithmMap];
  setOutputSelectionAlgorithm(value: ConstructTransactionRequest.OutputSelectionAlgorithmMap[keyof ConstructTransactionRequest.OutputSelectionAlgorithmMap]): void;

  clearNonChangeOutputsList(): void;
  getNonChangeOutputsList(): Array<ConstructTransactionRequest.Output>;
  setNonChangeOutputsList(value: Array<ConstructTransactionRequest.Output>): void;
  addNonChangeOutputs(value?: ConstructTransactionRequest.Output, index?: number): ConstructTransactionRequest.Output;

  hasChangeDestination(): boolean;
  clearChangeDestination(): void;
  getChangeDestination(): ConstructTransactionRequest.OutputDestination | undefined;
  setChangeDestination(value?: ConstructTransactionRequest.OutputDestination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConstructTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConstructTransactionRequest): ConstructTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConstructTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConstructTransactionRequest;
  static deserializeBinaryFromReader(message: ConstructTransactionRequest, reader: jspb.BinaryReader): ConstructTransactionRequest;
}

export namespace ConstructTransactionRequest {
  export type AsObject = {
    sourceAccount: number,
    requiredConfirmations: number,
    feePerKb: number,
    outputSelectionAlgorithm: ConstructTransactionRequest.OutputSelectionAlgorithmMap[keyof ConstructTransactionRequest.OutputSelectionAlgorithmMap],
    nonChangeOutputsList: Array<ConstructTransactionRequest.Output.AsObject>,
    changeDestination?: ConstructTransactionRequest.OutputDestination.AsObject,
  }

  export class OutputDestination extends jspb.Message {
    getAddress(): string;
    setAddress(value: string): void;

    getScript(): Uint8Array | string;
    getScript_asU8(): Uint8Array;
    getScript_asB64(): string;
    setScript(value: Uint8Array | string): void;

    getScriptVersion(): number;
    setScriptVersion(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OutputDestination.AsObject;
    static toObject(includeInstance: boolean, msg: OutputDestination): OutputDestination.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OutputDestination, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OutputDestination;
    static deserializeBinaryFromReader(message: OutputDestination, reader: jspb.BinaryReader): OutputDestination;
  }

  export namespace OutputDestination {
    export type AsObject = {
      address: string,
      script: Uint8Array | string,
      scriptVersion: number,
    }
  }

  export class Output extends jspb.Message {
    hasDestination(): boolean;
    clearDestination(): void;
    getDestination(): ConstructTransactionRequest.OutputDestination | undefined;
    setDestination(value?: ConstructTransactionRequest.OutputDestination): void;

    getAmount(): number;
    setAmount(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Output.AsObject;
    static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Output;
    static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
  }

  export namespace Output {
    export type AsObject = {
      destination?: ConstructTransactionRequest.OutputDestination.AsObject,
      amount: number,
    }
  }

  export interface OutputSelectionAlgorithmMap {
    UNSPECIFIED: 0;
    ALL: 1;
  }

  export const OutputSelectionAlgorithm: OutputSelectionAlgorithmMap;
}

export class ConstructTransactionResponse extends jspb.Message {
  getUnsignedTransaction(): Uint8Array | string;
  getUnsignedTransaction_asU8(): Uint8Array;
  getUnsignedTransaction_asB64(): string;
  setUnsignedTransaction(value: Uint8Array | string): void;

  getTotalPreviousOutputAmount(): number;
  setTotalPreviousOutputAmount(value: number): void;

  getTotalOutputAmount(): number;
  setTotalOutputAmount(value: number): void;

  getEstimatedSignedSize(): number;
  setEstimatedSignedSize(value: number): void;

  getChangeIndex(): number;
  setChangeIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConstructTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConstructTransactionResponse): ConstructTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConstructTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConstructTransactionResponse;
  static deserializeBinaryFromReader(message: ConstructTransactionResponse, reader: jspb.BinaryReader): ConstructTransactionResponse;
}

export namespace ConstructTransactionResponse {
  export type AsObject = {
    unsignedTransaction: Uint8Array | string,
    totalPreviousOutputAmount: number,
    totalOutputAmount: number,
    estimatedSignedSize: number,
    changeIndex: number,
  }
}

export class SignTransactionRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getSerializedTransaction(): Uint8Array | string;
  getSerializedTransaction_asU8(): Uint8Array;
  getSerializedTransaction_asB64(): string;
  setSerializedTransaction(value: Uint8Array | string): void;

  clearAdditionalScriptsList(): void;
  getAdditionalScriptsList(): Array<SignTransactionRequest.AdditionalScript>;
  setAdditionalScriptsList(value: Array<SignTransactionRequest.AdditionalScript>): void;
  addAdditionalScripts(value?: SignTransactionRequest.AdditionalScript, index?: number): SignTransactionRequest.AdditionalScript;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignTransactionRequest): SignTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignTransactionRequest;
  static deserializeBinaryFromReader(message: SignTransactionRequest, reader: jspb.BinaryReader): SignTransactionRequest;
}

export namespace SignTransactionRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    serializedTransaction: Uint8Array | string,
    additionalScriptsList: Array<SignTransactionRequest.AdditionalScript.AsObject>,
  }

  export class AdditionalScript extends jspb.Message {
    getTransactionHash(): Uint8Array | string;
    getTransactionHash_asU8(): Uint8Array;
    getTransactionHash_asB64(): string;
    setTransactionHash(value: Uint8Array | string): void;

    getOutputIndex(): number;
    setOutputIndex(value: number): void;

    getTree(): number;
    setTree(value: number): void;

    getPkScript(): Uint8Array | string;
    getPkScript_asU8(): Uint8Array;
    getPkScript_asB64(): string;
    setPkScript(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AdditionalScript.AsObject;
    static toObject(includeInstance: boolean, msg: AdditionalScript): AdditionalScript.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AdditionalScript, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AdditionalScript;
    static deserializeBinaryFromReader(message: AdditionalScript, reader: jspb.BinaryReader): AdditionalScript;
  }

  export namespace AdditionalScript {
    export type AsObject = {
      transactionHash: Uint8Array | string,
      outputIndex: number,
      tree: number,
      pkScript: Uint8Array | string,
    }
  }
}

export class SignTransactionResponse extends jspb.Message {
  getTransaction(): Uint8Array | string;
  getTransaction_asU8(): Uint8Array;
  getTransaction_asB64(): string;
  setTransaction(value: Uint8Array | string): void;

  clearUnsignedInputIndexesList(): void;
  getUnsignedInputIndexesList(): Array<number>;
  setUnsignedInputIndexesList(value: Array<number>): void;
  addUnsignedInputIndexes(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignTransactionResponse): SignTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignTransactionResponse;
  static deserializeBinaryFromReader(message: SignTransactionResponse, reader: jspb.BinaryReader): SignTransactionResponse;
}

export namespace SignTransactionResponse {
  export type AsObject = {
    transaction: Uint8Array | string,
    unsignedInputIndexesList: Array<number>,
  }
}

export class SignTransactionsRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<SignTransactionsRequest.UnsignedTransaction>;
  setTransactionsList(value: Array<SignTransactionsRequest.UnsignedTransaction>): void;
  addTransactions(value?: SignTransactionsRequest.UnsignedTransaction, index?: number): SignTransactionsRequest.UnsignedTransaction;

  clearAdditionalScriptsList(): void;
  getAdditionalScriptsList(): Array<SignTransactionsRequest.AdditionalScript>;
  setAdditionalScriptsList(value: Array<SignTransactionsRequest.AdditionalScript>): void;
  addAdditionalScripts(value?: SignTransactionsRequest.AdditionalScript, index?: number): SignTransactionsRequest.AdditionalScript;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignTransactionsRequest): SignTransactionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignTransactionsRequest;
  static deserializeBinaryFromReader(message: SignTransactionsRequest, reader: jspb.BinaryReader): SignTransactionsRequest;
}

export namespace SignTransactionsRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    transactionsList: Array<SignTransactionsRequest.UnsignedTransaction.AsObject>,
    additionalScriptsList: Array<SignTransactionsRequest.AdditionalScript.AsObject>,
  }

  export class AdditionalScript extends jspb.Message {
    getTransactionHash(): Uint8Array | string;
    getTransactionHash_asU8(): Uint8Array;
    getTransactionHash_asB64(): string;
    setTransactionHash(value: Uint8Array | string): void;

    getOutputIndex(): number;
    setOutputIndex(value: number): void;

    getTree(): number;
    setTree(value: number): void;

    getPkScript(): Uint8Array | string;
    getPkScript_asU8(): Uint8Array;
    getPkScript_asB64(): string;
    setPkScript(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AdditionalScript.AsObject;
    static toObject(includeInstance: boolean, msg: AdditionalScript): AdditionalScript.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AdditionalScript, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AdditionalScript;
    static deserializeBinaryFromReader(message: AdditionalScript, reader: jspb.BinaryReader): AdditionalScript;
  }

  export namespace AdditionalScript {
    export type AsObject = {
      transactionHash: Uint8Array | string,
      outputIndex: number,
      tree: number,
      pkScript: Uint8Array | string,
    }
  }

  export class UnsignedTransaction extends jspb.Message {
    getSerializedTransaction(): Uint8Array | string;
    getSerializedTransaction_asU8(): Uint8Array;
    getSerializedTransaction_asB64(): string;
    setSerializedTransaction(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UnsignedTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: UnsignedTransaction): UnsignedTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UnsignedTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UnsignedTransaction;
    static deserializeBinaryFromReader(message: UnsignedTransaction, reader: jspb.BinaryReader): UnsignedTransaction;
  }

  export namespace UnsignedTransaction {
    export type AsObject = {
      serializedTransaction: Uint8Array | string,
    }
  }
}

export class SignTransactionsResponse extends jspb.Message {
  clearTransactionsList(): void;
  getTransactionsList(): Array<SignTransactionsResponse.SignedTransaction>;
  setTransactionsList(value: Array<SignTransactionsResponse.SignedTransaction>): void;
  addTransactions(value?: SignTransactionsResponse.SignedTransaction, index?: number): SignTransactionsResponse.SignedTransaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignTransactionsResponse): SignTransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignTransactionsResponse;
  static deserializeBinaryFromReader(message: SignTransactionsResponse, reader: jspb.BinaryReader): SignTransactionsResponse;
}

export namespace SignTransactionsResponse {
  export type AsObject = {
    transactionsList: Array<SignTransactionsResponse.SignedTransaction.AsObject>,
  }

  export class SignedTransaction extends jspb.Message {
    getTransaction(): Uint8Array | string;
    getTransaction_asU8(): Uint8Array;
    getTransaction_asB64(): string;
    setTransaction(value: Uint8Array | string): void;

    clearUnsignedInputIndexesList(): void;
    getUnsignedInputIndexesList(): Array<number>;
    setUnsignedInputIndexesList(value: Array<number>): void;
    addUnsignedInputIndexes(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignedTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: SignedTransaction): SignedTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignedTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignedTransaction;
    static deserializeBinaryFromReader(message: SignedTransaction, reader: jspb.BinaryReader): SignedTransaction;
  }

  export namespace SignedTransaction {
    export type AsObject = {
      transaction: Uint8Array | string,
      unsignedInputIndexesList: Array<number>,
    }
  }
}

export class CreateSignatureRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getSerializedTransaction(): Uint8Array | string;
  getSerializedTransaction_asU8(): Uint8Array;
  getSerializedTransaction_asB64(): string;
  setSerializedTransaction(value: Uint8Array | string): void;

  getInputIndex(): number;
  setInputIndex(value: number): void;

  getHashType(): CreateSignatureRequest.SigHashTypeMap[keyof CreateSignatureRequest.SigHashTypeMap];
  setHashType(value: CreateSignatureRequest.SigHashTypeMap[keyof CreateSignatureRequest.SigHashTypeMap]): void;

  getPreviousPkScript(): Uint8Array | string;
  getPreviousPkScript_asU8(): Uint8Array;
  getPreviousPkScript_asB64(): string;
  setPreviousPkScript(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSignatureRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSignatureRequest): CreateSignatureRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateSignatureRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSignatureRequest;
  static deserializeBinaryFromReader(message: CreateSignatureRequest, reader: jspb.BinaryReader): CreateSignatureRequest;
}

export namespace CreateSignatureRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    address: string,
    serializedTransaction: Uint8Array | string,
    inputIndex: number,
    hashType: CreateSignatureRequest.SigHashTypeMap[keyof CreateSignatureRequest.SigHashTypeMap],
    previousPkScript: Uint8Array | string,
  }

  export interface SigHashTypeMap {
    SIGHASH_OLD: 0;
    SIGHASH_ALL: 1;
    SIGHASH_NONE: 2;
    SIGHASH_SINGLE: 3;
    SIGHASH_ALLVALUE: 4;
    SIGHASH_ANYONECANPAY: 128;
  }

  export const SigHashType: SigHashTypeMap;
}

export class CreateSignatureResponse extends jspb.Message {
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSignatureResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSignatureResponse): CreateSignatureResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateSignatureResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSignatureResponse;
  static deserializeBinaryFromReader(message: CreateSignatureResponse, reader: jspb.BinaryReader): CreateSignatureResponse;
}

export namespace CreateSignatureResponse {
  export type AsObject = {
    signature: Uint8Array | string,
    publicKey: Uint8Array | string,
  }
}

export class PublishTransactionRequest extends jspb.Message {
  getSignedTransaction(): Uint8Array | string;
  getSignedTransaction_asU8(): Uint8Array;
  getSignedTransaction_asB64(): string;
  setSignedTransaction(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PublishTransactionRequest): PublishTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishTransactionRequest;
  static deserializeBinaryFromReader(message: PublishTransactionRequest, reader: jspb.BinaryReader): PublishTransactionRequest;
}

export namespace PublishTransactionRequest {
  export type AsObject = {
    signedTransaction: Uint8Array | string,
  }
}

export class PublishTransactionResponse extends jspb.Message {
  getTransactionHash(): Uint8Array | string;
  getTransactionHash_asU8(): Uint8Array;
  getTransactionHash_asB64(): string;
  setTransactionHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PublishTransactionResponse): PublishTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishTransactionResponse;
  static deserializeBinaryFromReader(message: PublishTransactionResponse, reader: jspb.BinaryReader): PublishTransactionResponse;
}

export namespace PublishTransactionResponse {
  export type AsObject = {
    transactionHash: Uint8Array | string,
  }
}

export class PublishUnminedTransactionsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishUnminedTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PublishUnminedTransactionsRequest): PublishUnminedTransactionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishUnminedTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishUnminedTransactionsRequest;
  static deserializeBinaryFromReader(message: PublishUnminedTransactionsRequest, reader: jspb.BinaryReader): PublishUnminedTransactionsRequest;
}

export namespace PublishUnminedTransactionsRequest {
  export type AsObject = {
  }
}

export class PublishUnminedTransactionsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublishUnminedTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PublishUnminedTransactionsResponse): PublishUnminedTransactionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublishUnminedTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublishUnminedTransactionsResponse;
  static deserializeBinaryFromReader(message: PublishUnminedTransactionsResponse, reader: jspb.BinaryReader): PublishUnminedTransactionsResponse;
}

export namespace PublishUnminedTransactionsResponse {
  export type AsObject = {
  }
}

export class PurchaseTicketsRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getAccount(): number;
  setAccount(value: number): void;

  getSpendLimit(): number;
  setSpendLimit(value: number): void;

  getRequiredConfirmations(): number;
  setRequiredConfirmations(value: number): void;

  getTicketAddress(): string;
  setTicketAddress(value: string): void;

  getNumTickets(): number;
  setNumTickets(value: number): void;

  getPoolAddress(): string;
  setPoolAddress(value: string): void;

  getPoolFees(): number;
  setPoolFees(value: number): void;

  getExpiry(): number;
  setExpiry(value: number): void;

  getTxFee(): number;
  setTxFee(value: number): void;

  getTicketFee(): number;
  setTicketFee(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurchaseTicketsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PurchaseTicketsRequest): PurchaseTicketsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PurchaseTicketsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurchaseTicketsRequest;
  static deserializeBinaryFromReader(message: PurchaseTicketsRequest, reader: jspb.BinaryReader): PurchaseTicketsRequest;
}

export namespace PurchaseTicketsRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    account: number,
    spendLimit: number,
    requiredConfirmations: number,
    ticketAddress: string,
    numTickets: number,
    poolAddress: string,
    poolFees: number,
    expiry: number,
    txFee: number,
    ticketFee: number,
  }
}

export class PurchaseTicketsResponse extends jspb.Message {
  clearTicketHashesList(): void;
  getTicketHashesList(): Array<Uint8Array | string>;
  getTicketHashesList_asU8(): Array<Uint8Array>;
  getTicketHashesList_asB64(): Array<string>;
  setTicketHashesList(value: Array<Uint8Array | string>): void;
  addTicketHashes(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PurchaseTicketsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PurchaseTicketsResponse): PurchaseTicketsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PurchaseTicketsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PurchaseTicketsResponse;
  static deserializeBinaryFromReader(message: PurchaseTicketsResponse, reader: jspb.BinaryReader): PurchaseTicketsResponse;
}

export namespace PurchaseTicketsResponse {
  export type AsObject = {
    ticketHashesList: Array<Uint8Array | string>,
  }
}

export class RevokeTicketsRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RevokeTicketsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RevokeTicketsRequest): RevokeTicketsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RevokeTicketsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RevokeTicketsRequest;
  static deserializeBinaryFromReader(message: RevokeTicketsRequest, reader: jspb.BinaryReader): RevokeTicketsRequest;
}

export namespace RevokeTicketsRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
  }
}

export class RevokeTicketsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RevokeTicketsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RevokeTicketsResponse): RevokeTicketsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RevokeTicketsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RevokeTicketsResponse;
  static deserializeBinaryFromReader(message: RevokeTicketsResponse, reader: jspb.BinaryReader): RevokeTicketsResponse;
}

export namespace RevokeTicketsResponse {
  export type AsObject = {
  }
}

export class LoadActiveDataFiltersRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadActiveDataFiltersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoadActiveDataFiltersRequest): LoadActiveDataFiltersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadActiveDataFiltersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadActiveDataFiltersRequest;
  static deserializeBinaryFromReader(message: LoadActiveDataFiltersRequest, reader: jspb.BinaryReader): LoadActiveDataFiltersRequest;
}

export namespace LoadActiveDataFiltersRequest {
  export type AsObject = {
  }
}

export class LoadActiveDataFiltersResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadActiveDataFiltersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoadActiveDataFiltersResponse): LoadActiveDataFiltersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadActiveDataFiltersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadActiveDataFiltersResponse;
  static deserializeBinaryFromReader(message: LoadActiveDataFiltersResponse, reader: jspb.BinaryReader): LoadActiveDataFiltersResponse;
}

export namespace LoadActiveDataFiltersResponse {
  export type AsObject = {
  }
}

export class SignMessageRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignMessageRequest): SignMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignMessageRequest;
  static deserializeBinaryFromReader(message: SignMessageRequest, reader: jspb.BinaryReader): SignMessageRequest;
}

export namespace SignMessageRequest {
  export type AsObject = {
    address: string,
    message: string,
    passphrase: Uint8Array | string,
  }
}

export class SignMessageResponse extends jspb.Message {
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignMessageResponse): SignMessageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignMessageResponse;
  static deserializeBinaryFromReader(message: SignMessageResponse, reader: jspb.BinaryReader): SignMessageResponse;
}

export namespace SignMessageResponse {
  export type AsObject = {
    signature: Uint8Array | string,
  }
}

export class SignMessagesRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  clearMessagesList(): void;
  getMessagesList(): Array<SignMessagesRequest.Message>;
  setMessagesList(value: Array<SignMessagesRequest.Message>): void;
  addMessages(value?: SignMessagesRequest.Message, index?: number): SignMessagesRequest.Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignMessagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignMessagesRequest): SignMessagesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignMessagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignMessagesRequest;
  static deserializeBinaryFromReader(message: SignMessagesRequest, reader: jspb.BinaryReader): SignMessagesRequest;
}

export namespace SignMessagesRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    messagesList: Array<SignMessagesRequest.Message.AsObject>,
  }

  export class Message extends jspb.Message {
    getAddress(): string;
    setAddress(value: string): void;

    getMessage(): string;
    setMessage(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Message.AsObject;
    static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Message;
    static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
  }

  export namespace Message {
    export type AsObject = {
      address: string,
      message: string,
    }
  }
}

export class SignMessagesResponse extends jspb.Message {
  clearRepliesList(): void;
  getRepliesList(): Array<SignMessagesResponse.SignReply>;
  setRepliesList(value: Array<SignMessagesResponse.SignReply>): void;
  addReplies(value?: SignMessagesResponse.SignReply, index?: number): SignMessagesResponse.SignReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignMessagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignMessagesResponse): SignMessagesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignMessagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignMessagesResponse;
  static deserializeBinaryFromReader(message: SignMessagesResponse, reader: jspb.BinaryReader): SignMessagesResponse;
}

export namespace SignMessagesResponse {
  export type AsObject = {
    repliesList: Array<SignMessagesResponse.SignReply.AsObject>,
  }

  export class SignReply extends jspb.Message {
    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;

    getError(): string;
    setError(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignReply.AsObject;
    static toObject(includeInstance: boolean, msg: SignReply): SignReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignReply;
    static deserializeBinaryFromReader(message: SignReply, reader: jspb.BinaryReader): SignReply;
  }

  export namespace SignReply {
    export type AsObject = {
      signature: Uint8Array | string,
      error: string,
    }
  }
}

export class TransactionNotificationsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionNotificationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionNotificationsRequest): TransactionNotificationsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionNotificationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionNotificationsRequest;
  static deserializeBinaryFromReader(message: TransactionNotificationsRequest, reader: jspb.BinaryReader): TransactionNotificationsRequest;
}

export namespace TransactionNotificationsRequest {
  export type AsObject = {
  }
}

export class TransactionNotificationsResponse extends jspb.Message {
  clearAttachedBlocksList(): void;
  getAttachedBlocksList(): Array<BlockDetails>;
  setAttachedBlocksList(value: Array<BlockDetails>): void;
  addAttachedBlocks(value?: BlockDetails, index?: number): BlockDetails;

  clearDetachedBlocksList(): void;
  getDetachedBlocksList(): Array<Uint8Array | string>;
  getDetachedBlocksList_asU8(): Array<Uint8Array>;
  getDetachedBlocksList_asB64(): Array<string>;
  setDetachedBlocksList(value: Array<Uint8Array | string>): void;
  addDetachedBlocks(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearUnminedTransactionsList(): void;
  getUnminedTransactionsList(): Array<TransactionDetails>;
  setUnminedTransactionsList(value: Array<TransactionDetails>): void;
  addUnminedTransactions(value?: TransactionDetails, index?: number): TransactionDetails;

  clearUnminedTransactionHashesList(): void;
  getUnminedTransactionHashesList(): Array<Uint8Array | string>;
  getUnminedTransactionHashesList_asU8(): Array<Uint8Array>;
  getUnminedTransactionHashesList_asB64(): Array<string>;
  setUnminedTransactionHashesList(value: Array<Uint8Array | string>): void;
  addUnminedTransactionHashes(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionNotificationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionNotificationsResponse): TransactionNotificationsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionNotificationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionNotificationsResponse;
  static deserializeBinaryFromReader(message: TransactionNotificationsResponse, reader: jspb.BinaryReader): TransactionNotificationsResponse;
}

export namespace TransactionNotificationsResponse {
  export type AsObject = {
    attachedBlocksList: Array<BlockDetails.AsObject>,
    detachedBlocksList: Array<Uint8Array | string>,
    unminedTransactionsList: Array<TransactionDetails.AsObject>,
    unminedTransactionHashesList: Array<Uint8Array | string>,
  }
}

export class AccountNotificationsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountNotificationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountNotificationsRequest): AccountNotificationsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountNotificationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountNotificationsRequest;
  static deserializeBinaryFromReader(message: AccountNotificationsRequest, reader: jspb.BinaryReader): AccountNotificationsRequest;
}

export namespace AccountNotificationsRequest {
  export type AsObject = {
  }
}

export class AccountNotificationsResponse extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  getAccountName(): string;
  setAccountName(value: string): void;

  getExternalKeyCount(): number;
  setExternalKeyCount(value: number): void;

  getInternalKeyCount(): number;
  setInternalKeyCount(value: number): void;

  getImportedKeyCount(): number;
  setImportedKeyCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountNotificationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AccountNotificationsResponse): AccountNotificationsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountNotificationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountNotificationsResponse;
  static deserializeBinaryFromReader(message: AccountNotificationsResponse, reader: jspb.BinaryReader): AccountNotificationsResponse;
}

export namespace AccountNotificationsResponse {
  export type AsObject = {
    accountNumber: number,
    accountName: string,
    externalKeyCount: number,
    internalKeyCount: number,
    importedKeyCount: number,
  }
}

export class ConfirmationNotificationsRequest extends jspb.Message {
  clearTxHashesList(): void;
  getTxHashesList(): Array<Uint8Array | string>;
  getTxHashesList_asU8(): Array<Uint8Array>;
  getTxHashesList_asB64(): Array<string>;
  setTxHashesList(value: Array<Uint8Array | string>): void;
  addTxHashes(value: Uint8Array | string, index?: number): Uint8Array | string;

  getStopAfter(): number;
  setStopAfter(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfirmationNotificationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConfirmationNotificationsRequest): ConfirmationNotificationsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConfirmationNotificationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfirmationNotificationsRequest;
  static deserializeBinaryFromReader(message: ConfirmationNotificationsRequest, reader: jspb.BinaryReader): ConfirmationNotificationsRequest;
}

export namespace ConfirmationNotificationsRequest {
  export type AsObject = {
    txHashesList: Array<Uint8Array | string>,
    stopAfter: number,
  }
}

export class ConfirmationNotificationsResponse extends jspb.Message {
  clearConfirmationsList(): void;
  getConfirmationsList(): Array<ConfirmationNotificationsResponse.TransactionConfirmations>;
  setConfirmationsList(value: Array<ConfirmationNotificationsResponse.TransactionConfirmations>): void;
  addConfirmations(value?: ConfirmationNotificationsResponse.TransactionConfirmations, index?: number): ConfirmationNotificationsResponse.TransactionConfirmations;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfirmationNotificationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConfirmationNotificationsResponse): ConfirmationNotificationsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConfirmationNotificationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfirmationNotificationsResponse;
  static deserializeBinaryFromReader(message: ConfirmationNotificationsResponse, reader: jspb.BinaryReader): ConfirmationNotificationsResponse;
}

export namespace ConfirmationNotificationsResponse {
  export type AsObject = {
    confirmationsList: Array<ConfirmationNotificationsResponse.TransactionConfirmations.AsObject>,
  }

  export class TransactionConfirmations extends jspb.Message {
    getTxHash(): Uint8Array | string;
    getTxHash_asU8(): Uint8Array;
    getTxHash_asB64(): string;
    setTxHash(value: Uint8Array | string): void;

    getConfirmations(): number;
    setConfirmations(value: number): void;

    getBlockHash(): Uint8Array | string;
    getBlockHash_asU8(): Uint8Array;
    getBlockHash_asB64(): string;
    setBlockHash(value: Uint8Array | string): void;

    getBlockHeight(): number;
    setBlockHeight(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionConfirmations.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionConfirmations): TransactionConfirmations.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionConfirmations, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionConfirmations;
    static deserializeBinaryFromReader(message: TransactionConfirmations, reader: jspb.BinaryReader): TransactionConfirmations;
  }

  export namespace TransactionConfirmations {
    export type AsObject = {
      txHash: Uint8Array | string,
      confirmations: number,
      blockHash: Uint8Array | string,
      blockHeight: number,
    }
  }
}

export class CreateWalletRequest extends jspb.Message {
  getPublicPassphrase(): Uint8Array | string;
  getPublicPassphrase_asU8(): Uint8Array;
  getPublicPassphrase_asB64(): string;
  setPublicPassphrase(value: Uint8Array | string): void;

  getPrivatePassphrase(): Uint8Array | string;
  getPrivatePassphrase_asU8(): Uint8Array;
  getPrivatePassphrase_asB64(): string;
  setPrivatePassphrase(value: Uint8Array | string): void;

  getSeed(): Uint8Array | string;
  getSeed_asU8(): Uint8Array;
  getSeed_asB64(): string;
  setSeed(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWalletRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWalletRequest): CreateWalletRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWalletRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWalletRequest;
  static deserializeBinaryFromReader(message: CreateWalletRequest, reader: jspb.BinaryReader): CreateWalletRequest;
}

export namespace CreateWalletRequest {
  export type AsObject = {
    publicPassphrase: Uint8Array | string,
    privatePassphrase: Uint8Array | string,
    seed: Uint8Array | string,
  }
}

export class CreateWalletResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWalletResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWalletResponse): CreateWalletResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWalletResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWalletResponse;
  static deserializeBinaryFromReader(message: CreateWalletResponse, reader: jspb.BinaryReader): CreateWalletResponse;
}

export namespace CreateWalletResponse {
  export type AsObject = {
  }
}

export class CreateWatchingOnlyWalletRequest extends jspb.Message {
  getExtendedPubKey(): string;
  setExtendedPubKey(value: string): void;

  getPublicPassphrase(): Uint8Array | string;
  getPublicPassphrase_asU8(): Uint8Array;
  getPublicPassphrase_asB64(): string;
  setPublicPassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWatchingOnlyWalletRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWatchingOnlyWalletRequest): CreateWatchingOnlyWalletRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWatchingOnlyWalletRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWatchingOnlyWalletRequest;
  static deserializeBinaryFromReader(message: CreateWatchingOnlyWalletRequest, reader: jspb.BinaryReader): CreateWatchingOnlyWalletRequest;
}

export namespace CreateWatchingOnlyWalletRequest {
  export type AsObject = {
    extendedPubKey: string,
    publicPassphrase: Uint8Array | string,
  }
}

export class CreateWatchingOnlyWalletResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateWatchingOnlyWalletResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateWatchingOnlyWalletResponse): CreateWatchingOnlyWalletResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateWatchingOnlyWalletResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateWatchingOnlyWalletResponse;
  static deserializeBinaryFromReader(message: CreateWatchingOnlyWalletResponse, reader: jspb.BinaryReader): CreateWatchingOnlyWalletResponse;
}

export namespace CreateWatchingOnlyWalletResponse {
  export type AsObject = {
  }
}

export class OpenWalletRequest extends jspb.Message {
  getPublicPassphrase(): Uint8Array | string;
  getPublicPassphrase_asU8(): Uint8Array;
  getPublicPassphrase_asB64(): string;
  setPublicPassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpenWalletRequest.AsObject;
  static toObject(includeInstance: boolean, msg: OpenWalletRequest): OpenWalletRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OpenWalletRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpenWalletRequest;
  static deserializeBinaryFromReader(message: OpenWalletRequest, reader: jspb.BinaryReader): OpenWalletRequest;
}

export namespace OpenWalletRequest {
  export type AsObject = {
    publicPassphrase: Uint8Array | string,
  }
}

export class OpenWalletResponse extends jspb.Message {
  getWatchingOnly(): boolean;
  setWatchingOnly(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpenWalletResponse.AsObject;
  static toObject(includeInstance: boolean, msg: OpenWalletResponse): OpenWalletResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OpenWalletResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpenWalletResponse;
  static deserializeBinaryFromReader(message: OpenWalletResponse, reader: jspb.BinaryReader): OpenWalletResponse;
}

export namespace OpenWalletResponse {
  export type AsObject = {
    watchingOnly: boolean,
  }
}

export class CloseWalletRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CloseWalletRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CloseWalletRequest): CloseWalletRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CloseWalletRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CloseWalletRequest;
  static deserializeBinaryFromReader(message: CloseWalletRequest, reader: jspb.BinaryReader): CloseWalletRequest;
}

export namespace CloseWalletRequest {
  export type AsObject = {
  }
}

export class CloseWalletResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CloseWalletResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CloseWalletResponse): CloseWalletResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CloseWalletResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CloseWalletResponse;
  static deserializeBinaryFromReader(message: CloseWalletResponse, reader: jspb.BinaryReader): CloseWalletResponse;
}

export namespace CloseWalletResponse {
  export type AsObject = {
  }
}

export class WalletExistsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WalletExistsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WalletExistsRequest): WalletExistsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WalletExistsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WalletExistsRequest;
  static deserializeBinaryFromReader(message: WalletExistsRequest, reader: jspb.BinaryReader): WalletExistsRequest;
}

export namespace WalletExistsRequest {
  export type AsObject = {
  }
}

export class WalletExistsResponse extends jspb.Message {
  getExists(): boolean;
  setExists(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WalletExistsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WalletExistsResponse): WalletExistsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WalletExistsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WalletExistsResponse;
  static deserializeBinaryFromReader(message: WalletExistsResponse, reader: jspb.BinaryReader): WalletExistsResponse;
}

export namespace WalletExistsResponse {
  export type AsObject = {
    exists: boolean,
  }
}

export class StartConsensusRpcRequest extends jspb.Message {
  getNetworkAddress(): string;
  setNetworkAddress(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): Uint8Array | string;
  getPassword_asU8(): Uint8Array;
  getPassword_asB64(): string;
  setPassword(value: Uint8Array | string): void;

  getCertificate(): Uint8Array | string;
  getCertificate_asU8(): Uint8Array;
  getCertificate_asB64(): string;
  setCertificate(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartConsensusRpcRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartConsensusRpcRequest): StartConsensusRpcRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartConsensusRpcRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartConsensusRpcRequest;
  static deserializeBinaryFromReader(message: StartConsensusRpcRequest, reader: jspb.BinaryReader): StartConsensusRpcRequest;
}

export namespace StartConsensusRpcRequest {
  export type AsObject = {
    networkAddress: string,
    username: string,
    password: Uint8Array | string,
    certificate: Uint8Array | string,
  }
}

export class StartConsensusRpcResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartConsensusRpcResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartConsensusRpcResponse): StartConsensusRpcResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartConsensusRpcResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartConsensusRpcResponse;
  static deserializeBinaryFromReader(message: StartConsensusRpcResponse, reader: jspb.BinaryReader): StartConsensusRpcResponse;
}

export namespace StartConsensusRpcResponse {
  export type AsObject = {
  }
}

export class DiscoverAddressesRequest extends jspb.Message {
  getDiscoverAccounts(): boolean;
  setDiscoverAccounts(value: boolean): void;

  getPrivatePassphrase(): Uint8Array | string;
  getPrivatePassphrase_asU8(): Uint8Array;
  getPrivatePassphrase_asB64(): string;
  setPrivatePassphrase(value: Uint8Array | string): void;

  getStartingBlockHash(): Uint8Array | string;
  getStartingBlockHash_asU8(): Uint8Array;
  getStartingBlockHash_asB64(): string;
  setStartingBlockHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiscoverAddressesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DiscoverAddressesRequest): DiscoverAddressesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DiscoverAddressesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DiscoverAddressesRequest;
  static deserializeBinaryFromReader(message: DiscoverAddressesRequest, reader: jspb.BinaryReader): DiscoverAddressesRequest;
}

export namespace DiscoverAddressesRequest {
  export type AsObject = {
    discoverAccounts: boolean,
    privatePassphrase: Uint8Array | string,
    startingBlockHash: Uint8Array | string,
  }
}

export class DiscoverAddressesResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiscoverAddressesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DiscoverAddressesResponse): DiscoverAddressesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DiscoverAddressesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DiscoverAddressesResponse;
  static deserializeBinaryFromReader(message: DiscoverAddressesResponse, reader: jspb.BinaryReader): DiscoverAddressesResponse;
}

export namespace DiscoverAddressesResponse {
  export type AsObject = {
  }
}

export class FetchMissingCFiltersRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchMissingCFiltersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchMissingCFiltersRequest): FetchMissingCFiltersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchMissingCFiltersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchMissingCFiltersRequest;
  static deserializeBinaryFromReader(message: FetchMissingCFiltersRequest, reader: jspb.BinaryReader): FetchMissingCFiltersRequest;
}

export namespace FetchMissingCFiltersRequest {
  export type AsObject = {
  }
}

export class FetchMissingCFiltersResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchMissingCFiltersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FetchMissingCFiltersResponse): FetchMissingCFiltersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchMissingCFiltersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchMissingCFiltersResponse;
  static deserializeBinaryFromReader(message: FetchMissingCFiltersResponse, reader: jspb.BinaryReader): FetchMissingCFiltersResponse;
}

export namespace FetchMissingCFiltersResponse {
  export type AsObject = {
  }
}

export class SubscribeToBlockNotificationsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeToBlockNotificationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeToBlockNotificationsRequest): SubscribeToBlockNotificationsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeToBlockNotificationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeToBlockNotificationsRequest;
  static deserializeBinaryFromReader(message: SubscribeToBlockNotificationsRequest, reader: jspb.BinaryReader): SubscribeToBlockNotificationsRequest;
}

export namespace SubscribeToBlockNotificationsRequest {
  export type AsObject = {
  }
}

export class SubscribeToBlockNotificationsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeToBlockNotificationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeToBlockNotificationsResponse): SubscribeToBlockNotificationsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeToBlockNotificationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeToBlockNotificationsResponse;
  static deserializeBinaryFromReader(message: SubscribeToBlockNotificationsResponse, reader: jspb.BinaryReader): SubscribeToBlockNotificationsResponse;
}

export namespace SubscribeToBlockNotificationsResponse {
  export type AsObject = {
  }
}

export class FetchHeadersRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchHeadersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchHeadersRequest): FetchHeadersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchHeadersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchHeadersRequest;
  static deserializeBinaryFromReader(message: FetchHeadersRequest, reader: jspb.BinaryReader): FetchHeadersRequest;
}

export namespace FetchHeadersRequest {
  export type AsObject = {
  }
}

export class FetchHeadersResponse extends jspb.Message {
  getFetchedHeadersCount(): number;
  setFetchedHeadersCount(value: number): void;

  getFirstNewBlockHash(): Uint8Array | string;
  getFirstNewBlockHash_asU8(): Uint8Array;
  getFirstNewBlockHash_asB64(): string;
  setFirstNewBlockHash(value: Uint8Array | string): void;

  getFirstNewBlockHeight(): number;
  setFirstNewBlockHeight(value: number): void;

  getMainChainTipBlockHash(): Uint8Array | string;
  getMainChainTipBlockHash_asU8(): Uint8Array;
  getMainChainTipBlockHash_asB64(): string;
  setMainChainTipBlockHash(value: Uint8Array | string): void;

  getMainChainTipBlockHeight(): number;
  setMainChainTipBlockHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchHeadersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FetchHeadersResponse): FetchHeadersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchHeadersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchHeadersResponse;
  static deserializeBinaryFromReader(message: FetchHeadersResponse, reader: jspb.BinaryReader): FetchHeadersResponse;
}

export namespace FetchHeadersResponse {
  export type AsObject = {
    fetchedHeadersCount: number,
    firstNewBlockHash: Uint8Array | string,
    firstNewBlockHeight: number,
    mainChainTipBlockHash: Uint8Array | string,
    mainChainTipBlockHeight: number,
  }
}

export class FetchHeadersNotification extends jspb.Message {
  getFetchedHeadersCount(): number;
  setFetchedHeadersCount(value: number): void;

  getLastHeaderTime(): number;
  setLastHeaderTime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchHeadersNotification.AsObject;
  static toObject(includeInstance: boolean, msg: FetchHeadersNotification): FetchHeadersNotification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchHeadersNotification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchHeadersNotification;
  static deserializeBinaryFromReader(message: FetchHeadersNotification, reader: jspb.BinaryReader): FetchHeadersNotification;
}

export namespace FetchHeadersNotification {
  export type AsObject = {
    fetchedHeadersCount: number,
    lastHeaderTime: number,
  }
}

export class FetchMissingCFiltersNotification extends jspb.Message {
  getFetchedCfiltersStartHeight(): number;
  setFetchedCfiltersStartHeight(value: number): void;

  getFetchedCfiltersEndHeight(): number;
  setFetchedCfiltersEndHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchMissingCFiltersNotification.AsObject;
  static toObject(includeInstance: boolean, msg: FetchMissingCFiltersNotification): FetchMissingCFiltersNotification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FetchMissingCFiltersNotification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchMissingCFiltersNotification;
  static deserializeBinaryFromReader(message: FetchMissingCFiltersNotification, reader: jspb.BinaryReader): FetchMissingCFiltersNotification;
}

export namespace FetchMissingCFiltersNotification {
  export type AsObject = {
    fetchedCfiltersStartHeight: number,
    fetchedCfiltersEndHeight: number,
  }
}

export class RescanProgressNotification extends jspb.Message {
  getRescannedThrough(): number;
  setRescannedThrough(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RescanProgressNotification.AsObject;
  static toObject(includeInstance: boolean, msg: RescanProgressNotification): RescanProgressNotification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RescanProgressNotification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RescanProgressNotification;
  static deserializeBinaryFromReader(message: RescanProgressNotification, reader: jspb.BinaryReader): RescanProgressNotification;
}

export namespace RescanProgressNotification {
  export type AsObject = {
    rescannedThrough: number,
  }
}

export class PeerNotification extends jspb.Message {
  getPeerCount(): number;
  setPeerCount(value: number): void;

  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PeerNotification.AsObject;
  static toObject(includeInstance: boolean, msg: PeerNotification): PeerNotification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PeerNotification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PeerNotification;
  static deserializeBinaryFromReader(message: PeerNotification, reader: jspb.BinaryReader): PeerNotification;
}

export namespace PeerNotification {
  export type AsObject = {
    peerCount: number,
    address: string,
  }
}

export class RpcSyncRequest extends jspb.Message {
  getNetworkAddress(): string;
  setNetworkAddress(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): Uint8Array | string;
  getPassword_asU8(): Uint8Array;
  getPassword_asB64(): string;
  setPassword(value: Uint8Array | string): void;

  getCertificate(): Uint8Array | string;
  getCertificate_asU8(): Uint8Array;
  getCertificate_asB64(): string;
  setCertificate(value: Uint8Array | string): void;

  getDiscoverAccounts(): boolean;
  setDiscoverAccounts(value: boolean): void;

  getPrivatePassphrase(): Uint8Array | string;
  getPrivatePassphrase_asU8(): Uint8Array;
  getPrivatePassphrase_asB64(): string;
  setPrivatePassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RpcSyncRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RpcSyncRequest): RpcSyncRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RpcSyncRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RpcSyncRequest;
  static deserializeBinaryFromReader(message: RpcSyncRequest, reader: jspb.BinaryReader): RpcSyncRequest;
}

export namespace RpcSyncRequest {
  export type AsObject = {
    networkAddress: string,
    username: string,
    password: Uint8Array | string,
    certificate: Uint8Array | string,
    discoverAccounts: boolean,
    privatePassphrase: Uint8Array | string,
  }
}

export class RpcSyncResponse extends jspb.Message {
  getSynced(): boolean;
  setSynced(value: boolean): void;

  getNotificationType(): SyncNotificationTypeMap[keyof SyncNotificationTypeMap];
  setNotificationType(value: SyncNotificationTypeMap[keyof SyncNotificationTypeMap]): void;

  hasFetchHeaders(): boolean;
  clearFetchHeaders(): void;
  getFetchHeaders(): FetchHeadersNotification | undefined;
  setFetchHeaders(value?: FetchHeadersNotification): void;

  hasFetchMissingCfilters(): boolean;
  clearFetchMissingCfilters(): void;
  getFetchMissingCfilters(): FetchMissingCFiltersNotification | undefined;
  setFetchMissingCfilters(value?: FetchMissingCFiltersNotification): void;

  hasRescanProgress(): boolean;
  clearRescanProgress(): void;
  getRescanProgress(): RescanProgressNotification | undefined;
  setRescanProgress(value?: RescanProgressNotification): void;

  hasPeerInformation(): boolean;
  clearPeerInformation(): void;
  getPeerInformation(): PeerNotification | undefined;
  setPeerInformation(value?: PeerNotification): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RpcSyncResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RpcSyncResponse): RpcSyncResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RpcSyncResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RpcSyncResponse;
  static deserializeBinaryFromReader(message: RpcSyncResponse, reader: jspb.BinaryReader): RpcSyncResponse;
}

export namespace RpcSyncResponse {
  export type AsObject = {
    synced: boolean,
    notificationType: SyncNotificationTypeMap[keyof SyncNotificationTypeMap],
    fetchHeaders?: FetchHeadersNotification.AsObject,
    fetchMissingCfilters?: FetchMissingCFiltersNotification.AsObject,
    rescanProgress?: RescanProgressNotification.AsObject,
    peerInformation?: PeerNotification.AsObject,
  }
}

export class SpvSyncRequest extends jspb.Message {
  getDiscoverAccounts(): boolean;
  setDiscoverAccounts(value: boolean): void;

  getPrivatePassphrase(): Uint8Array | string;
  getPrivatePassphrase_asU8(): Uint8Array;
  getPrivatePassphrase_asB64(): string;
  setPrivatePassphrase(value: Uint8Array | string): void;

  clearSpvConnectList(): void;
  getSpvConnectList(): Array<string>;
  setSpvConnectList(value: Array<string>): void;
  addSpvConnect(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SpvSyncRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SpvSyncRequest): SpvSyncRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SpvSyncRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SpvSyncRequest;
  static deserializeBinaryFromReader(message: SpvSyncRequest, reader: jspb.BinaryReader): SpvSyncRequest;
}

export namespace SpvSyncRequest {
  export type AsObject = {
    discoverAccounts: boolean,
    privatePassphrase: Uint8Array | string,
    spvConnectList: Array<string>,
  }
}

export class SpvSyncResponse extends jspb.Message {
  getSynced(): boolean;
  setSynced(value: boolean): void;

  getNotificationType(): SyncNotificationTypeMap[keyof SyncNotificationTypeMap];
  setNotificationType(value: SyncNotificationTypeMap[keyof SyncNotificationTypeMap]): void;

  hasFetchHeaders(): boolean;
  clearFetchHeaders(): void;
  getFetchHeaders(): FetchHeadersNotification | undefined;
  setFetchHeaders(value?: FetchHeadersNotification): void;

  hasFetchMissingCfilters(): boolean;
  clearFetchMissingCfilters(): void;
  getFetchMissingCfilters(): FetchMissingCFiltersNotification | undefined;
  setFetchMissingCfilters(value?: FetchMissingCFiltersNotification): void;

  hasRescanProgress(): boolean;
  clearRescanProgress(): void;
  getRescanProgress(): RescanProgressNotification | undefined;
  setRescanProgress(value?: RescanProgressNotification): void;

  hasPeerInformation(): boolean;
  clearPeerInformation(): void;
  getPeerInformation(): PeerNotification | undefined;
  setPeerInformation(value?: PeerNotification): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SpvSyncResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SpvSyncResponse): SpvSyncResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SpvSyncResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SpvSyncResponse;
  static deserializeBinaryFromReader(message: SpvSyncResponse, reader: jspb.BinaryReader): SpvSyncResponse;
}

export namespace SpvSyncResponse {
  export type AsObject = {
    synced: boolean,
    notificationType: SyncNotificationTypeMap[keyof SyncNotificationTypeMap],
    fetchHeaders?: FetchHeadersNotification.AsObject,
    fetchMissingCfilters?: FetchMissingCFiltersNotification.AsObject,
    rescanProgress?: RescanProgressNotification.AsObject,
    peerInformation?: PeerNotification.AsObject,
  }
}

export class RescanPointRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RescanPointRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RescanPointRequest): RescanPointRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RescanPointRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RescanPointRequest;
  static deserializeBinaryFromReader(message: RescanPointRequest, reader: jspb.BinaryReader): RescanPointRequest;
}

export namespace RescanPointRequest {
  export type AsObject = {
  }
}

export class RescanPointResponse extends jspb.Message {
  getRescanPointHash(): Uint8Array | string;
  getRescanPointHash_asU8(): Uint8Array;
  getRescanPointHash_asB64(): string;
  setRescanPointHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RescanPointResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RescanPointResponse): RescanPointResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RescanPointResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RescanPointResponse;
  static deserializeBinaryFromReader(message: RescanPointResponse, reader: jspb.BinaryReader): RescanPointResponse;
}

export namespace RescanPointResponse {
  export type AsObject = {
    rescanPointHash: Uint8Array | string,
  }
}

export class GenerateRandomSeedRequest extends jspb.Message {
  getSeedLength(): number;
  setSeedLength(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateRandomSeedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateRandomSeedRequest): GenerateRandomSeedRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateRandomSeedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateRandomSeedRequest;
  static deserializeBinaryFromReader(message: GenerateRandomSeedRequest, reader: jspb.BinaryReader): GenerateRandomSeedRequest;
}

export namespace GenerateRandomSeedRequest {
  export type AsObject = {
    seedLength: number,
  }
}

export class GenerateRandomSeedResponse extends jspb.Message {
  getSeedBytes(): Uint8Array | string;
  getSeedBytes_asU8(): Uint8Array;
  getSeedBytes_asB64(): string;
  setSeedBytes(value: Uint8Array | string): void;

  getSeedHex(): string;
  setSeedHex(value: string): void;

  getSeedMnemonic(): string;
  setSeedMnemonic(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateRandomSeedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateRandomSeedResponse): GenerateRandomSeedResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateRandomSeedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateRandomSeedResponse;
  static deserializeBinaryFromReader(message: GenerateRandomSeedResponse, reader: jspb.BinaryReader): GenerateRandomSeedResponse;
}

export namespace GenerateRandomSeedResponse {
  export type AsObject = {
    seedBytes: Uint8Array | string,
    seedHex: string,
    seedMnemonic: string,
  }
}

export class DecodeSeedRequest extends jspb.Message {
  getUserInput(): string;
  setUserInput(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecodeSeedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DecodeSeedRequest): DecodeSeedRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecodeSeedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecodeSeedRequest;
  static deserializeBinaryFromReader(message: DecodeSeedRequest, reader: jspb.BinaryReader): DecodeSeedRequest;
}

export namespace DecodeSeedRequest {
  export type AsObject = {
    userInput: string,
  }
}

export class DecodeSeedResponse extends jspb.Message {
  getDecodedSeed(): Uint8Array | string;
  getDecodedSeed_asU8(): Uint8Array;
  getDecodedSeed_asB64(): string;
  setDecodedSeed(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecodeSeedResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DecodeSeedResponse): DecodeSeedResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecodeSeedResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecodeSeedResponse;
  static deserializeBinaryFromReader(message: DecodeSeedResponse, reader: jspb.BinaryReader): DecodeSeedResponse;
}

export namespace DecodeSeedResponse {
  export type AsObject = {
    decodedSeed: Uint8Array | string,
  }
}

export class RunTicketBuyerRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getAccount(): number;
  setAccount(value: number): void;

  getVotingAccount(): number;
  setVotingAccount(value: number): void;

  getBalanceToMaintain(): number;
  setBalanceToMaintain(value: number): void;

  getVotingAddress(): string;
  setVotingAddress(value: string): void;

  getPoolAddress(): string;
  setPoolAddress(value: string): void;

  getPoolFees(): number;
  setPoolFees(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunTicketBuyerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RunTicketBuyerRequest): RunTicketBuyerRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RunTicketBuyerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunTicketBuyerRequest;
  static deserializeBinaryFromReader(message: RunTicketBuyerRequest, reader: jspb.BinaryReader): RunTicketBuyerRequest;
}

export namespace RunTicketBuyerRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    account: number,
    votingAccount: number,
    balanceToMaintain: number,
    votingAddress: string,
    poolAddress: string,
    poolFees: number,
  }
}

export class RunTicketBuyerResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunTicketBuyerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RunTicketBuyerResponse): RunTicketBuyerResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RunTicketBuyerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunTicketBuyerResponse;
  static deserializeBinaryFromReader(message: RunTicketBuyerResponse, reader: jspb.BinaryReader): RunTicketBuyerResponse;
}

export namespace RunTicketBuyerResponse {
  export type AsObject = {
  }
}

export class StartAutoBuyerRequest extends jspb.Message {
  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  getAccount(): number;
  setAccount(value: number): void;

  getBalanceToMaintain(): number;
  setBalanceToMaintain(value: number): void;

  getMaxFeePerKb(): number;
  setMaxFeePerKb(value: number): void;

  getMaxPriceRelative(): number;
  setMaxPriceRelative(value: number): void;

  getMaxPriceAbsolute(): number;
  setMaxPriceAbsolute(value: number): void;

  getVotingAddress(): string;
  setVotingAddress(value: string): void;

  getPoolAddress(): string;
  setPoolAddress(value: string): void;

  getPoolFees(): number;
  setPoolFees(value: number): void;

  getMaxPerBlock(): number;
  setMaxPerBlock(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartAutoBuyerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartAutoBuyerRequest): StartAutoBuyerRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartAutoBuyerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartAutoBuyerRequest;
  static deserializeBinaryFromReader(message: StartAutoBuyerRequest, reader: jspb.BinaryReader): StartAutoBuyerRequest;
}

export namespace StartAutoBuyerRequest {
  export type AsObject = {
    passphrase: Uint8Array | string,
    account: number,
    balanceToMaintain: number,
    maxFeePerKb: number,
    maxPriceRelative: number,
    maxPriceAbsolute: number,
    votingAddress: string,
    poolAddress: string,
    poolFees: number,
    maxPerBlock: number,
  }
}

export class StartAutoBuyerResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartAutoBuyerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartAutoBuyerResponse): StartAutoBuyerResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartAutoBuyerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartAutoBuyerResponse;
  static deserializeBinaryFromReader(message: StartAutoBuyerResponse, reader: jspb.BinaryReader): StartAutoBuyerResponse;
}

export namespace StartAutoBuyerResponse {
  export type AsObject = {
  }
}

export class StopAutoBuyerRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopAutoBuyerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StopAutoBuyerRequest): StopAutoBuyerRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopAutoBuyerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopAutoBuyerRequest;
  static deserializeBinaryFromReader(message: StopAutoBuyerRequest, reader: jspb.BinaryReader): StopAutoBuyerRequest;
}

export namespace StopAutoBuyerRequest {
  export type AsObject = {
  }
}

export class StopAutoBuyerResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopAutoBuyerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StopAutoBuyerResponse): StopAutoBuyerResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopAutoBuyerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopAutoBuyerResponse;
  static deserializeBinaryFromReader(message: StopAutoBuyerResponse, reader: jspb.BinaryReader): StopAutoBuyerResponse;
}

export namespace StopAutoBuyerResponse {
  export type AsObject = {
  }
}

export class TicketBuyerConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TicketBuyerConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TicketBuyerConfigRequest): TicketBuyerConfigRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TicketBuyerConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TicketBuyerConfigRequest;
  static deserializeBinaryFromReader(message: TicketBuyerConfigRequest, reader: jspb.BinaryReader): TicketBuyerConfigRequest;
}

export namespace TicketBuyerConfigRequest {
  export type AsObject = {
  }
}

export class TicketBuyerConfigResponse extends jspb.Message {
  getAccount(): number;
  setAccount(value: number): void;

  getAvgPriceMode(): string;
  setAvgPriceMode(value: string): void;

  getAvgPricevwapDelta(): number;
  setAvgPricevwapDelta(value: number): void;

  getBalanceToMaintain(): number;
  setBalanceToMaintain(value: number): void;

  getBlocksToAvg(): number;
  setBlocksToAvg(value: number): void;

  getDontWaitForTickets(): boolean;
  setDontWaitForTickets(value: boolean): void;

  getExpiryDelta(): number;
  setExpiryDelta(value: number): void;

  getFeeSource(): string;
  setFeeSource(value: string): void;

  getFeeTargetScaling(): number;
  setFeeTargetScaling(value: number): void;

  getMinFee(): number;
  setMinFee(value: number): void;

  getMaxFee(): number;
  setMaxFee(value: number): void;

  getMaxPerBlock(): number;
  setMaxPerBlock(value: number): void;

  getMaxPriceAbsolute(): number;
  setMaxPriceAbsolute(value: number): void;

  getMaxPriceRelative(): number;
  setMaxPriceRelative(value: number): void;

  getMaxInMempool(): number;
  setMaxInMempool(value: number): void;

  getPoolAddress(): string;
  setPoolAddress(value: string): void;

  getPoolFees(): number;
  setPoolFees(value: number): void;

  getSpreadTicketPurchases(): boolean;
  setSpreadTicketPurchases(value: boolean): void;

  getVotingAddress(): string;
  setVotingAddress(value: string): void;

  getTxFee(): number;
  setTxFee(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TicketBuyerConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TicketBuyerConfigResponse): TicketBuyerConfigResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TicketBuyerConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TicketBuyerConfigResponse;
  static deserializeBinaryFromReader(message: TicketBuyerConfigResponse, reader: jspb.BinaryReader): TicketBuyerConfigResponse;
}

export namespace TicketBuyerConfigResponse {
  export type AsObject = {
    account: number,
    avgPriceMode: string,
    avgPricevwapDelta: number,
    balanceToMaintain: number,
    blocksToAvg: number,
    dontWaitForTickets: boolean,
    expiryDelta: number,
    feeSource: string,
    feeTargetScaling: number,
    minFee: number,
    maxFee: number,
    maxPerBlock: number,
    maxPriceAbsolute: number,
    maxPriceRelative: number,
    maxInMempool: number,
    poolAddress: string,
    poolFees: number,
    spreadTicketPurchases: boolean,
    votingAddress: string,
    txFee: number,
  }
}

export class SetAccountRequest extends jspb.Message {
  getAccount(): number;
  setAccount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetAccountRequest): SetAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAccountRequest;
  static deserializeBinaryFromReader(message: SetAccountRequest, reader: jspb.BinaryReader): SetAccountRequest;
}

export namespace SetAccountRequest {
  export type AsObject = {
    account: number,
  }
}

export class SetAccountResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetAccountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetAccountResponse): SetAccountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetAccountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetAccountResponse;
  static deserializeBinaryFromReader(message: SetAccountResponse, reader: jspb.BinaryReader): SetAccountResponse;
}

export namespace SetAccountResponse {
  export type AsObject = {
  }
}

export class SetBalanceToMaintainRequest extends jspb.Message {
  getBalanceToMaintain(): number;
  setBalanceToMaintain(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetBalanceToMaintainRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetBalanceToMaintainRequest): SetBalanceToMaintainRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetBalanceToMaintainRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetBalanceToMaintainRequest;
  static deserializeBinaryFromReader(message: SetBalanceToMaintainRequest, reader: jspb.BinaryReader): SetBalanceToMaintainRequest;
}

export namespace SetBalanceToMaintainRequest {
  export type AsObject = {
    balanceToMaintain: number,
  }
}

export class SetBalanceToMaintainResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetBalanceToMaintainResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetBalanceToMaintainResponse): SetBalanceToMaintainResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetBalanceToMaintainResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetBalanceToMaintainResponse;
  static deserializeBinaryFromReader(message: SetBalanceToMaintainResponse, reader: jspb.BinaryReader): SetBalanceToMaintainResponse;
}

export namespace SetBalanceToMaintainResponse {
  export type AsObject = {
  }
}

export class SetMaxFeeRequest extends jspb.Message {
  getMaxFeePerKb(): number;
  setMaxFeePerKb(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxFeeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxFeeRequest): SetMaxFeeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxFeeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxFeeRequest;
  static deserializeBinaryFromReader(message: SetMaxFeeRequest, reader: jspb.BinaryReader): SetMaxFeeRequest;
}

export namespace SetMaxFeeRequest {
  export type AsObject = {
    maxFeePerKb: number,
  }
}

export class SetMaxFeeResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxFeeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxFeeResponse): SetMaxFeeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxFeeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxFeeResponse;
  static deserializeBinaryFromReader(message: SetMaxFeeResponse, reader: jspb.BinaryReader): SetMaxFeeResponse;
}

export namespace SetMaxFeeResponse {
  export type AsObject = {
  }
}

export class SetMaxPriceRelativeRequest extends jspb.Message {
  getMaxPriceRelative(): number;
  setMaxPriceRelative(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxPriceRelativeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxPriceRelativeRequest): SetMaxPriceRelativeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxPriceRelativeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxPriceRelativeRequest;
  static deserializeBinaryFromReader(message: SetMaxPriceRelativeRequest, reader: jspb.BinaryReader): SetMaxPriceRelativeRequest;
}

export namespace SetMaxPriceRelativeRequest {
  export type AsObject = {
    maxPriceRelative: number,
  }
}

export class SetMaxPriceRelativeResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxPriceRelativeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxPriceRelativeResponse): SetMaxPriceRelativeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxPriceRelativeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxPriceRelativeResponse;
  static deserializeBinaryFromReader(message: SetMaxPriceRelativeResponse, reader: jspb.BinaryReader): SetMaxPriceRelativeResponse;
}

export namespace SetMaxPriceRelativeResponse {
  export type AsObject = {
  }
}

export class SetMaxPriceAbsoluteRequest extends jspb.Message {
  getMaxPriceAbsolute(): number;
  setMaxPriceAbsolute(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxPriceAbsoluteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxPriceAbsoluteRequest): SetMaxPriceAbsoluteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxPriceAbsoluteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxPriceAbsoluteRequest;
  static deserializeBinaryFromReader(message: SetMaxPriceAbsoluteRequest, reader: jspb.BinaryReader): SetMaxPriceAbsoluteRequest;
}

export namespace SetMaxPriceAbsoluteRequest {
  export type AsObject = {
    maxPriceAbsolute: number,
  }
}

export class SetMaxPriceAbsoluteResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxPriceAbsoluteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxPriceAbsoluteResponse): SetMaxPriceAbsoluteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxPriceAbsoluteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxPriceAbsoluteResponse;
  static deserializeBinaryFromReader(message: SetMaxPriceAbsoluteResponse, reader: jspb.BinaryReader): SetMaxPriceAbsoluteResponse;
}

export namespace SetMaxPriceAbsoluteResponse {
  export type AsObject = {
  }
}

export class SetVotingAddressRequest extends jspb.Message {
  getVotingAddress(): string;
  setVotingAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetVotingAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetVotingAddressRequest): SetVotingAddressRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetVotingAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetVotingAddressRequest;
  static deserializeBinaryFromReader(message: SetVotingAddressRequest, reader: jspb.BinaryReader): SetVotingAddressRequest;
}

export namespace SetVotingAddressRequest {
  export type AsObject = {
    votingAddress: string,
  }
}

export class SetVotingAddressResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetVotingAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetVotingAddressResponse): SetVotingAddressResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetVotingAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetVotingAddressResponse;
  static deserializeBinaryFromReader(message: SetVotingAddressResponse, reader: jspb.BinaryReader): SetVotingAddressResponse;
}

export namespace SetVotingAddressResponse {
  export type AsObject = {
  }
}

export class SetPoolAddressRequest extends jspb.Message {
  getPoolAddress(): string;
  setPoolAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetPoolAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetPoolAddressRequest): SetPoolAddressRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetPoolAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetPoolAddressRequest;
  static deserializeBinaryFromReader(message: SetPoolAddressRequest, reader: jspb.BinaryReader): SetPoolAddressRequest;
}

export namespace SetPoolAddressRequest {
  export type AsObject = {
    poolAddress: string,
  }
}

export class SetPoolAddressResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetPoolAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetPoolAddressResponse): SetPoolAddressResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetPoolAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetPoolAddressResponse;
  static deserializeBinaryFromReader(message: SetPoolAddressResponse, reader: jspb.BinaryReader): SetPoolAddressResponse;
}

export namespace SetPoolAddressResponse {
  export type AsObject = {
  }
}

export class SetPoolFeesRequest extends jspb.Message {
  getPoolFees(): number;
  setPoolFees(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetPoolFeesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetPoolFeesRequest): SetPoolFeesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetPoolFeesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetPoolFeesRequest;
  static deserializeBinaryFromReader(message: SetPoolFeesRequest, reader: jspb.BinaryReader): SetPoolFeesRequest;
}

export namespace SetPoolFeesRequest {
  export type AsObject = {
    poolFees: number,
  }
}

export class SetPoolFeesResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetPoolFeesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetPoolFeesResponse): SetPoolFeesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetPoolFeesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetPoolFeesResponse;
  static deserializeBinaryFromReader(message: SetPoolFeesResponse, reader: jspb.BinaryReader): SetPoolFeesResponse;
}

export namespace SetPoolFeesResponse {
  export type AsObject = {
  }
}

export class SetMaxPerBlockRequest extends jspb.Message {
  getMaxPerBlock(): number;
  setMaxPerBlock(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxPerBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxPerBlockRequest): SetMaxPerBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxPerBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxPerBlockRequest;
  static deserializeBinaryFromReader(message: SetMaxPerBlockRequest, reader: jspb.BinaryReader): SetMaxPerBlockRequest;
}

export namespace SetMaxPerBlockRequest {
  export type AsObject = {
    maxPerBlock: number,
  }
}

export class SetMaxPerBlockResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetMaxPerBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetMaxPerBlockResponse): SetMaxPerBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetMaxPerBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetMaxPerBlockResponse;
  static deserializeBinaryFromReader(message: SetMaxPerBlockResponse, reader: jspb.BinaryReader): SetMaxPerBlockResponse;
}

export namespace SetMaxPerBlockResponse {
  export type AsObject = {
  }
}

export class AgendasRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AgendasRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AgendasRequest): AgendasRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AgendasRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AgendasRequest;
  static deserializeBinaryFromReader(message: AgendasRequest, reader: jspb.BinaryReader): AgendasRequest;
}

export namespace AgendasRequest {
  export type AsObject = {
  }
}

export class AgendasResponse extends jspb.Message {
  getVersion(): number;
  setVersion(value: number): void;

  clearAgendasList(): void;
  getAgendasList(): Array<AgendasResponse.Agenda>;
  setAgendasList(value: Array<AgendasResponse.Agenda>): void;
  addAgendas(value?: AgendasResponse.Agenda, index?: number): AgendasResponse.Agenda;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AgendasResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AgendasResponse): AgendasResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AgendasResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AgendasResponse;
  static deserializeBinaryFromReader(message: AgendasResponse, reader: jspb.BinaryReader): AgendasResponse;
}

export namespace AgendasResponse {
  export type AsObject = {
    version: number,
    agendasList: Array<AgendasResponse.Agenda.AsObject>,
  }

  export class Agenda extends jspb.Message {
    getId(): string;
    setId(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;

    getMask(): number;
    setMask(value: number): void;

    clearChoicesList(): void;
    getChoicesList(): Array<AgendasResponse.Choice>;
    setChoicesList(value: Array<AgendasResponse.Choice>): void;
    addChoices(value?: AgendasResponse.Choice, index?: number): AgendasResponse.Choice;

    getStartTime(): number;
    setStartTime(value: number): void;

    getExpireTime(): number;
    setExpireTime(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Agenda.AsObject;
    static toObject(includeInstance: boolean, msg: Agenda): Agenda.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Agenda, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Agenda;
    static deserializeBinaryFromReader(message: Agenda, reader: jspb.BinaryReader): Agenda;
  }

  export namespace Agenda {
    export type AsObject = {
      id: string,
      description: string,
      mask: number,
      choicesList: Array<AgendasResponse.Choice.AsObject>,
      startTime: number,
      expireTime: number,
    }
  }

  export class Choice extends jspb.Message {
    getId(): string;
    setId(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;

    getBits(): number;
    setBits(value: number): void;

    getIsAbstain(): boolean;
    setIsAbstain(value: boolean): void;

    getIsNo(): boolean;
    setIsNo(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Choice.AsObject;
    static toObject(includeInstance: boolean, msg: Choice): Choice.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Choice, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Choice;
    static deserializeBinaryFromReader(message: Choice, reader: jspb.BinaryReader): Choice;
  }

  export namespace Choice {
    export type AsObject = {
      id: string,
      description: string,
      bits: number,
      isAbstain: boolean,
      isNo: boolean,
    }
  }
}

export class VoteChoicesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VoteChoicesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VoteChoicesRequest): VoteChoicesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VoteChoicesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VoteChoicesRequest;
  static deserializeBinaryFromReader(message: VoteChoicesRequest, reader: jspb.BinaryReader): VoteChoicesRequest;
}

export namespace VoteChoicesRequest {
  export type AsObject = {
  }
}

export class VoteChoicesResponse extends jspb.Message {
  getVersion(): number;
  setVersion(value: number): void;

  clearChoicesList(): void;
  getChoicesList(): Array<VoteChoicesResponse.Choice>;
  setChoicesList(value: Array<VoteChoicesResponse.Choice>): void;
  addChoices(value?: VoteChoicesResponse.Choice, index?: number): VoteChoicesResponse.Choice;

  getVotebits(): number;
  setVotebits(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VoteChoicesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VoteChoicesResponse): VoteChoicesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VoteChoicesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VoteChoicesResponse;
  static deserializeBinaryFromReader(message: VoteChoicesResponse, reader: jspb.BinaryReader): VoteChoicesResponse;
}

export namespace VoteChoicesResponse {
  export type AsObject = {
    version: number,
    choicesList: Array<VoteChoicesResponse.Choice.AsObject>,
    votebits: number,
  }

  export class Choice extends jspb.Message {
    getAgendaId(): string;
    setAgendaId(value: string): void;

    getAgendaDescription(): string;
    setAgendaDescription(value: string): void;

    getChoiceId(): string;
    setChoiceId(value: string): void;

    getChoiceDescription(): string;
    setChoiceDescription(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Choice.AsObject;
    static toObject(includeInstance: boolean, msg: Choice): Choice.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Choice, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Choice;
    static deserializeBinaryFromReader(message: Choice, reader: jspb.BinaryReader): Choice;
  }

  export namespace Choice {
    export type AsObject = {
      agendaId: string,
      agendaDescription: string,
      choiceId: string,
      choiceDescription: string,
    }
  }
}

export class SetVoteChoicesRequest extends jspb.Message {
  clearChoicesList(): void;
  getChoicesList(): Array<SetVoteChoicesRequest.Choice>;
  setChoicesList(value: Array<SetVoteChoicesRequest.Choice>): void;
  addChoices(value?: SetVoteChoicesRequest.Choice, index?: number): SetVoteChoicesRequest.Choice;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetVoteChoicesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetVoteChoicesRequest): SetVoteChoicesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetVoteChoicesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetVoteChoicesRequest;
  static deserializeBinaryFromReader(message: SetVoteChoicesRequest, reader: jspb.BinaryReader): SetVoteChoicesRequest;
}

export namespace SetVoteChoicesRequest {
  export type AsObject = {
    choicesList: Array<SetVoteChoicesRequest.Choice.AsObject>,
  }

  export class Choice extends jspb.Message {
    getAgendaId(): string;
    setAgendaId(value: string): void;

    getChoiceId(): string;
    setChoiceId(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Choice.AsObject;
    static toObject(includeInstance: boolean, msg: Choice): Choice.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Choice, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Choice;
    static deserializeBinaryFromReader(message: Choice, reader: jspb.BinaryReader): Choice;
  }

  export namespace Choice {
    export type AsObject = {
      agendaId: string,
      choiceId: string,
    }
  }
}

export class SetVoteChoicesResponse extends jspb.Message {
  getVotebits(): number;
  setVotebits(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetVoteChoicesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetVoteChoicesResponse): SetVoteChoicesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetVoteChoicesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetVoteChoicesResponse;
  static deserializeBinaryFromReader(message: SetVoteChoicesResponse, reader: jspb.BinaryReader): SetVoteChoicesResponse;
}

export namespace SetVoteChoicesResponse {
  export type AsObject = {
    votebits: number,
  }
}

export class VerifyMessageRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyMessageRequest): VerifyMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VerifyMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyMessageRequest;
  static deserializeBinaryFromReader(message: VerifyMessageRequest, reader: jspb.BinaryReader): VerifyMessageRequest;
}

export namespace VerifyMessageRequest {
  export type AsObject = {
    address: string,
    message: string,
    signature: Uint8Array | string,
  }
}

export class VerifyMessageResponse extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyMessageResponse): VerifyMessageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VerifyMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyMessageResponse;
  static deserializeBinaryFromReader(message: VerifyMessageResponse, reader: jspb.BinaryReader): VerifyMessageResponse;
}

export namespace VerifyMessageResponse {
  export type AsObject = {
    valid: boolean,
  }
}

export class DecodedTransaction extends jspb.Message {
  getTransactionHash(): Uint8Array | string;
  getTransactionHash_asU8(): Uint8Array;
  getTransactionHash_asB64(): string;
  setTransactionHash(value: Uint8Array | string): void;

  getVersion(): number;
  setVersion(value: number): void;

  getLockTime(): number;
  setLockTime(value: number): void;

  getExpiry(): number;
  setExpiry(value: number): void;

  getTransactionType(): TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap];
  setTransactionType(value: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap]): void;

  clearInputsList(): void;
  getInputsList(): Array<DecodedTransaction.Input>;
  setInputsList(value: Array<DecodedTransaction.Input>): void;
  addInputs(value?: DecodedTransaction.Input, index?: number): DecodedTransaction.Input;

  clearOutputsList(): void;
  getOutputsList(): Array<DecodedTransaction.Output>;
  setOutputsList(value: Array<DecodedTransaction.Output>): void;
  addOutputs(value?: DecodedTransaction.Output, index?: number): DecodedTransaction.Output;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecodedTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: DecodedTransaction): DecodedTransaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecodedTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecodedTransaction;
  static deserializeBinaryFromReader(message: DecodedTransaction, reader: jspb.BinaryReader): DecodedTransaction;
}

export namespace DecodedTransaction {
  export type AsObject = {
    transactionHash: Uint8Array | string,
    version: number,
    lockTime: number,
    expiry: number,
    transactionType: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap],
    inputsList: Array<DecodedTransaction.Input.AsObject>,
    outputsList: Array<DecodedTransaction.Output.AsObject>,
  }

  export class Input extends jspb.Message {
    getPreviousTransactionHash(): Uint8Array | string;
    getPreviousTransactionHash_asU8(): Uint8Array;
    getPreviousTransactionHash_asB64(): string;
    setPreviousTransactionHash(value: Uint8Array | string): void;

    getPreviousTransactionIndex(): number;
    setPreviousTransactionIndex(value: number): void;

    getTree(): DecodedTransaction.Input.TreeTypeMap[keyof DecodedTransaction.Input.TreeTypeMap];
    setTree(value: DecodedTransaction.Input.TreeTypeMap[keyof DecodedTransaction.Input.TreeTypeMap]): void;

    getSequence(): number;
    setSequence(value: number): void;

    getAmountIn(): number;
    setAmountIn(value: number): void;

    getBlockHeight(): number;
    setBlockHeight(value: number): void;

    getBlockIndex(): number;
    setBlockIndex(value: number): void;

    getSignatureScript(): Uint8Array | string;
    getSignatureScript_asU8(): Uint8Array;
    getSignatureScript_asB64(): string;
    setSignatureScript(value: Uint8Array | string): void;

    getSignatureScriptAsm(): string;
    setSignatureScriptAsm(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Input.AsObject;
    static toObject(includeInstance: boolean, msg: Input): Input.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Input, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Input;
    static deserializeBinaryFromReader(message: Input, reader: jspb.BinaryReader): Input;
  }

  export namespace Input {
    export type AsObject = {
      previousTransactionHash: Uint8Array | string,
      previousTransactionIndex: number,
      tree: DecodedTransaction.Input.TreeTypeMap[keyof DecodedTransaction.Input.TreeTypeMap],
      sequence: number,
      amountIn: number,
      blockHeight: number,
      blockIndex: number,
      signatureScript: Uint8Array | string,
      signatureScriptAsm: string,
    }

    export interface TreeTypeMap {
      REGULAR: 0;
      UNKNOWN: -1;
      STAKE: 1;
    }

    export const TreeType: TreeTypeMap;
  }

  export class Output extends jspb.Message {
    getValue(): number;
    setValue(value: number): void;

    getIndex(): number;
    setIndex(value: number): void;

    getVersion(): number;
    setVersion(value: number): void;

    getScript(): Uint8Array | string;
    getScript_asU8(): Uint8Array;
    getScript_asB64(): string;
    setScript(value: Uint8Array | string): void;

    getScriptAsm(): string;
    setScriptAsm(value: string): void;

    getRequiredSignatures(): number;
    setRequiredSignatures(value: number): void;

    getScriptClass(): DecodedTransaction.Output.ScriptClassMap[keyof DecodedTransaction.Output.ScriptClassMap];
    setScriptClass(value: DecodedTransaction.Output.ScriptClassMap[keyof DecodedTransaction.Output.ScriptClassMap]): void;

    clearAddressesList(): void;
    getAddressesList(): Array<string>;
    setAddressesList(value: Array<string>): void;
    addAddresses(value: string, index?: number): string;

    getCommitmentAmount(): number;
    setCommitmentAmount(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Output.AsObject;
    static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Output;
    static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
  }

  export namespace Output {
    export type AsObject = {
      value: number,
      index: number,
      version: number,
      script: Uint8Array | string,
      scriptAsm: string,
      requiredSignatures: number,
      scriptClass: DecodedTransaction.Output.ScriptClassMap[keyof DecodedTransaction.Output.ScriptClassMap],
      addressesList: Array<string>,
      commitmentAmount: number,
    }

    export interface ScriptClassMap {
      NON_STANDARD: 0;
      PUB_KEY: 1;
      PUB_KEY_HASH: 2;
      SCRIPT_HASH: 3;
      MULTI_SIG: 4;
      NULL_DATA: 5;
      STAKE_SUBMISSION: 6;
      STAKE_GEN: 7;
      STAKE_REVOCATION: 8;
      STAKE_SUB_CHANGE: 9;
      PUB_KEY_ALT: 10;
      PUB_KEY_HASH_ALT: 11;
    }

    export const ScriptClass: ScriptClassMap;
  }
}

export class DecodeRawTransactionRequest extends jspb.Message {
  getSerializedTransaction(): Uint8Array | string;
  getSerializedTransaction_asU8(): Uint8Array;
  getSerializedTransaction_asB64(): string;
  setSerializedTransaction(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecodeRawTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DecodeRawTransactionRequest): DecodeRawTransactionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecodeRawTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecodeRawTransactionRequest;
  static deserializeBinaryFromReader(message: DecodeRawTransactionRequest, reader: jspb.BinaryReader): DecodeRawTransactionRequest;
}

export namespace DecodeRawTransactionRequest {
  export type AsObject = {
    serializedTransaction: Uint8Array | string,
  }
}

export class DecodeRawTransactionResponse extends jspb.Message {
  hasTransaction(): boolean;
  clearTransaction(): void;
  getTransaction(): DecodedTransaction | undefined;
  setTransaction(value?: DecodedTransaction): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecodeRawTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DecodeRawTransactionResponse): DecodeRawTransactionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecodeRawTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecodeRawTransactionResponse;
  static deserializeBinaryFromReader(message: DecodeRawTransactionResponse, reader: jspb.BinaryReader): DecodeRawTransactionResponse;
}

export namespace DecodeRawTransactionResponse {
  export type AsObject = {
    transaction?: DecodedTransaction.AsObject,
  }
}

export class ValidateAddressRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateAddressRequest): ValidateAddressRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateAddressRequest;
  static deserializeBinaryFromReader(message: ValidateAddressRequest, reader: jspb.BinaryReader): ValidateAddressRequest;
}

export namespace ValidateAddressRequest {
  export type AsObject = {
    address: string,
  }
}

export class ValidateAddressResponse extends jspb.Message {
  getIsValid(): boolean;
  setIsValid(value: boolean): void;

  getIsMine(): boolean;
  setIsMine(value: boolean): void;

  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  getPubKeyAddr(): string;
  setPubKeyAddr(value: string): void;

  getPubKey(): Uint8Array | string;
  getPubKey_asU8(): Uint8Array;
  getPubKey_asB64(): string;
  setPubKey(value: Uint8Array | string): void;

  getIsScript(): boolean;
  setIsScript(value: boolean): void;

  clearPkScriptAddrsList(): void;
  getPkScriptAddrsList(): Array<string>;
  setPkScriptAddrsList(value: Array<string>): void;
  addPkScriptAddrs(value: string, index?: number): string;

  getScriptType(): ValidateAddressResponse.ScriptTypeMap[keyof ValidateAddressResponse.ScriptTypeMap];
  setScriptType(value: ValidateAddressResponse.ScriptTypeMap[keyof ValidateAddressResponse.ScriptTypeMap]): void;

  getPayToAddrScript(): Uint8Array | string;
  getPayToAddrScript_asU8(): Uint8Array;
  getPayToAddrScript_asB64(): string;
  setPayToAddrScript(value: Uint8Array | string): void;

  getSigsRequired(): number;
  setSigsRequired(value: number): void;

  getIsInternal(): boolean;
  setIsInternal(value: boolean): void;

  getIndex(): number;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateAddressResponse): ValidateAddressResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateAddressResponse;
  static deserializeBinaryFromReader(message: ValidateAddressResponse, reader: jspb.BinaryReader): ValidateAddressResponse;
}

export namespace ValidateAddressResponse {
  export type AsObject = {
    isValid: boolean,
    isMine: boolean,
    accountNumber: number,
    pubKeyAddr: string,
    pubKey: Uint8Array | string,
    isScript: boolean,
    pkScriptAddrsList: Array<string>,
    scriptType: ValidateAddressResponse.ScriptTypeMap[keyof ValidateAddressResponse.ScriptTypeMap],
    payToAddrScript: Uint8Array | string,
    sigsRequired: number,
    isInternal: boolean,
    index: number,
  }

  export interface ScriptTypeMap {
    NONSTANDARDTY: 0;
    PUBKEYTY: 1;
    PUBKEYHASHTY: 2;
    SCRIPTHASHTY: 3;
    MULTISIGTY: 4;
    NULLDATATY: 5;
    STAKESUBMISSIONTY: 6;
    STAKEGENTY: 7;
    STAKEREVOCATIONTY: 8;
    STAKESUBCHANGETY: 9;
    PUBKEYALTTY: 10;
    PUBKEYHASHALTTY: 11;
  }

  export const ScriptType: ScriptTypeMap;
}

export class CommittedTicketsRequest extends jspb.Message {
  clearTicketsList(): void;
  getTicketsList(): Array<Uint8Array | string>;
  getTicketsList_asU8(): Array<Uint8Array>;
  getTicketsList_asB64(): Array<string>;
  setTicketsList(value: Array<Uint8Array | string>): void;
  addTickets(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommittedTicketsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CommittedTicketsRequest): CommittedTicketsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommittedTicketsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommittedTicketsRequest;
  static deserializeBinaryFromReader(message: CommittedTicketsRequest, reader: jspb.BinaryReader): CommittedTicketsRequest;
}

export namespace CommittedTicketsRequest {
  export type AsObject = {
    ticketsList: Array<Uint8Array | string>,
  }
}

export class GetAccountExtendedPubKeyRequest extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountExtendedPubKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountExtendedPubKeyRequest): GetAccountExtendedPubKeyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountExtendedPubKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountExtendedPubKeyRequest;
  static deserializeBinaryFromReader(message: GetAccountExtendedPubKeyRequest, reader: jspb.BinaryReader): GetAccountExtendedPubKeyRequest;
}

export namespace GetAccountExtendedPubKeyRequest {
  export type AsObject = {
    accountNumber: number,
  }
}

export class GetAccountExtendedPubKeyResponse extends jspb.Message {
  getAccExtendedPubKey(): string;
  setAccExtendedPubKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountExtendedPubKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountExtendedPubKeyResponse): GetAccountExtendedPubKeyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountExtendedPubKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountExtendedPubKeyResponse;
  static deserializeBinaryFromReader(message: GetAccountExtendedPubKeyResponse, reader: jspb.BinaryReader): GetAccountExtendedPubKeyResponse;
}

export namespace GetAccountExtendedPubKeyResponse {
  export type AsObject = {
    accExtendedPubKey: string,
  }
}

export class GetAccountExtendedPrivKeyRequest extends jspb.Message {
  getAccountNumber(): number;
  setAccountNumber(value: number): void;

  getPassphrase(): Uint8Array | string;
  getPassphrase_asU8(): Uint8Array;
  getPassphrase_asB64(): string;
  setPassphrase(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountExtendedPrivKeyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountExtendedPrivKeyRequest): GetAccountExtendedPrivKeyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountExtendedPrivKeyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountExtendedPrivKeyRequest;
  static deserializeBinaryFromReader(message: GetAccountExtendedPrivKeyRequest, reader: jspb.BinaryReader): GetAccountExtendedPrivKeyRequest;
}

export namespace GetAccountExtendedPrivKeyRequest {
  export type AsObject = {
    accountNumber: number,
    passphrase: Uint8Array | string,
  }
}

export class GetAccountExtendedPrivKeyResponse extends jspb.Message {
  getAccExtendedPrivKey(): string;
  setAccExtendedPrivKey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAccountExtendedPrivKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAccountExtendedPrivKeyResponse): GetAccountExtendedPrivKeyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAccountExtendedPrivKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAccountExtendedPrivKeyResponse;
  static deserializeBinaryFromReader(message: GetAccountExtendedPrivKeyResponse, reader: jspb.BinaryReader): GetAccountExtendedPrivKeyResponse;
}

export namespace GetAccountExtendedPrivKeyResponse {
  export type AsObject = {
    accExtendedPrivKey: string,
  }
}

export class CommittedTicketsResponse extends jspb.Message {
  clearTicketaddressesList(): void;
  getTicketaddressesList(): Array<CommittedTicketsResponse.TicketAddress>;
  setTicketaddressesList(value: Array<CommittedTicketsResponse.TicketAddress>): void;
  addTicketaddresses(value?: CommittedTicketsResponse.TicketAddress, index?: number): CommittedTicketsResponse.TicketAddress;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommittedTicketsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CommittedTicketsResponse): CommittedTicketsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommittedTicketsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommittedTicketsResponse;
  static deserializeBinaryFromReader(message: CommittedTicketsResponse, reader: jspb.BinaryReader): CommittedTicketsResponse;
}

export namespace CommittedTicketsResponse {
  export type AsObject = {
    ticketaddressesList: Array<CommittedTicketsResponse.TicketAddress.AsObject>,
  }

  export class TicketAddress extends jspb.Message {
    getTicket(): Uint8Array | string;
    getTicket_asU8(): Uint8Array;
    getTicket_asB64(): string;
    setTicket(value: Uint8Array | string): void;

    getAddress(): string;
    setAddress(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketAddress.AsObject;
    static toObject(includeInstance: boolean, msg: TicketAddress): TicketAddress.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TicketAddress, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketAddress;
    static deserializeBinaryFromReader(message: TicketAddress, reader: jspb.BinaryReader): TicketAddress;
  }

  export namespace TicketAddress {
    export type AsObject = {
      ticket: Uint8Array | string,
      address: string,
    }
  }
}

export class BestBlockRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BestBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BestBlockRequest): BestBlockRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BestBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BestBlockRequest;
  static deserializeBinaryFromReader(message: BestBlockRequest, reader: jspb.BinaryReader): BestBlockRequest;
}

export namespace BestBlockRequest {
  export type AsObject = {
  }
}

export class BestBlockResponse extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BestBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BestBlockResponse): BestBlockResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BestBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BestBlockResponse;
  static deserializeBinaryFromReader(message: BestBlockResponse, reader: jspb.BinaryReader): BestBlockResponse;
}

export namespace BestBlockResponse {
  export type AsObject = {
    height: number,
    hash: Uint8Array | string,
  }
}

export class SweepAccountRequest extends jspb.Message {
  getSourceAccount(): string;
  setSourceAccount(value: string): void;

  getDestinationAddress(): string;
  setDestinationAddress(value: string): void;

  getRequiredConfirmations(): number;
  setRequiredConfirmations(value: number): void;

  getFeePerKb(): number;
  setFeePerKb(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SweepAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SweepAccountRequest): SweepAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SweepAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SweepAccountRequest;
  static deserializeBinaryFromReader(message: SweepAccountRequest, reader: jspb.BinaryReader): SweepAccountRequest;
}

export namespace SweepAccountRequest {
  export type AsObject = {
    sourceAccount: string,
    destinationAddress: string,
    requiredConfirmations: number,
    feePerKb: number,
  }
}

export class SweepAccountResponse extends jspb.Message {
  getUnsignedTransaction(): Uint8Array | string;
  getUnsignedTransaction_asU8(): Uint8Array;
  getUnsignedTransaction_asB64(): string;
  setUnsignedTransaction(value: Uint8Array | string): void;

  getTotalPreviousOutputAmount(): number;
  setTotalPreviousOutputAmount(value: number): void;

  getTotalOutputAmount(): number;
  setTotalOutputAmount(value: number): void;

  getEstimatedSignedSize(): number;
  setEstimatedSignedSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SweepAccountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SweepAccountResponse): SweepAccountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SweepAccountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SweepAccountResponse;
  static deserializeBinaryFromReader(message: SweepAccountResponse, reader: jspb.BinaryReader): SweepAccountResponse;
}

export namespace SweepAccountResponse {
  export type AsObject = {
    unsignedTransaction: Uint8Array | string,
    totalPreviousOutputAmount: number,
    totalOutputAmount: number,
    estimatedSignedSize: number,
  }
}

export interface SyncNotificationTypeMap {
  SYNCED: 0;
  UNSYNCED: 1;
  PEER_CONNECTED: 2;
  PEER_DISCONNECTED: 3;
  FETCHED_MISSING_CFILTERS_STARTED: 4;
  FETCHED_MISSING_CFILTERS_PROGRESS: 5;
  FETCHED_MISSING_CFILTERS_FINISHED: 6;
  FETCHED_HEADERS_STARTED: 7;
  FETCHED_HEADERS_PROGRESS: 8;
  FETCHED_HEADERS_FINISHED: 9;
  DISCOVER_ADDRESSES_STARTED: 10;
  DISCOVER_ADDRESSES_FINISHED: 11;
  RESCAN_STARTED: 12;
  RESCAN_PROGRESS: 13;
  RESCAN_FINISHED: 14;
}

export const SyncNotificationType: SyncNotificationTypeMap;

