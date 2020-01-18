/**
 * @fileoverview gRPC-Web generated client stub for walletrpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.walletrpc = require('./api_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.VersionServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.VersionServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.VersionRequest,
 *   !proto.walletrpc.VersionResponse>}
 */
const methodDescriptor_VersionService_Version = new grpc.web.MethodDescriptor(
  '/walletrpc.VersionService/Version',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.VersionRequest,
  proto.walletrpc.VersionResponse,
  /**
   * @param {!proto.walletrpc.VersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.VersionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.VersionRequest,
 *   !proto.walletrpc.VersionResponse>}
 */
const methodInfo_VersionService_Version = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.VersionResponse,
  /**
   * @param {!proto.walletrpc.VersionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.VersionResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.VersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.VersionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.VersionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.VersionServiceClient.prototype.version =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.VersionService/Version',
      request,
      metadata || {},
      methodDescriptor_VersionService_Version,
      callback);
};


/**
 * @param {!proto.walletrpc.VersionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.VersionResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.VersionServicePromiseClient.prototype.version =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.VersionService/Version',
      request,
      metadata || {},
      methodDescriptor_VersionService_Version);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.WalletServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.WalletServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.PingRequest,
 *   !proto.walletrpc.PingResponse>}
 */
const methodDescriptor_WalletService_Ping = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/Ping',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.PingRequest,
  proto.walletrpc.PingResponse,
  /**
   * @param {!proto.walletrpc.PingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PingResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.PingRequest,
 *   !proto.walletrpc.PingResponse>}
 */
const methodInfo_WalletService_Ping = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.PingResponse,
  /**
   * @param {!proto.walletrpc.PingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PingResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.PingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.PingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.PingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.ping =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/Ping',
      request,
      metadata || {},
      methodDescriptor_WalletService_Ping,
      callback);
};


/**
 * @param {!proto.walletrpc.PingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.PingResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.ping =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/Ping',
      request,
      metadata || {},
      methodDescriptor_WalletService_Ping);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.NetworkRequest,
 *   !proto.walletrpc.NetworkResponse>}
 */
const methodDescriptor_WalletService_Network = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/Network',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.NetworkRequest,
  proto.walletrpc.NetworkResponse,
  /**
   * @param {!proto.walletrpc.NetworkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.NetworkResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.NetworkRequest,
 *   !proto.walletrpc.NetworkResponse>}
 */
const methodInfo_WalletService_Network = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.NetworkResponse,
  /**
   * @param {!proto.walletrpc.NetworkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.NetworkResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.NetworkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.NetworkResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.NetworkResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.network =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/Network',
      request,
      metadata || {},
      methodDescriptor_WalletService_Network,
      callback);
};


/**
 * @param {!proto.walletrpc.NetworkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.NetworkResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.network =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/Network',
      request,
      metadata || {},
      methodDescriptor_WalletService_Network);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.CoinTypeRequest,
 *   !proto.walletrpc.CoinTypeResponse>}
 */
const methodDescriptor_WalletService_CoinType = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/CoinType',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.CoinTypeRequest,
  proto.walletrpc.CoinTypeResponse,
  /**
   * @param {!proto.walletrpc.CoinTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CoinTypeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.CoinTypeRequest,
 *   !proto.walletrpc.CoinTypeResponse>}
 */
const methodInfo_WalletService_CoinType = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.CoinTypeResponse,
  /**
   * @param {!proto.walletrpc.CoinTypeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CoinTypeResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.CoinTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.CoinTypeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.CoinTypeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.coinType =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/CoinType',
      request,
      metadata || {},
      methodDescriptor_WalletService_CoinType,
      callback);
};


/**
 * @param {!proto.walletrpc.CoinTypeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.CoinTypeResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.coinType =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/CoinType',
      request,
      metadata || {},
      methodDescriptor_WalletService_CoinType);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.AccountNumberRequest,
 *   !proto.walletrpc.AccountNumberResponse>}
 */
const methodDescriptor_WalletService_AccountNumber = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/AccountNumber',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.AccountNumberRequest,
  proto.walletrpc.AccountNumberResponse,
  /**
   * @param {!proto.walletrpc.AccountNumberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AccountNumberResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.AccountNumberRequest,
 *   !proto.walletrpc.AccountNumberResponse>}
 */
const methodInfo_WalletService_AccountNumber = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.AccountNumberResponse,
  /**
   * @param {!proto.walletrpc.AccountNumberRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AccountNumberResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.AccountNumberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.AccountNumberResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.AccountNumberResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.accountNumber =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/AccountNumber',
      request,
      metadata || {},
      methodDescriptor_WalletService_AccountNumber,
      callback);
};


/**
 * @param {!proto.walletrpc.AccountNumberRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.AccountNumberResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.accountNumber =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/AccountNumber',
      request,
      metadata || {},
      methodDescriptor_WalletService_AccountNumber);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.AccountsRequest,
 *   !proto.walletrpc.AccountsResponse>}
 */
const methodDescriptor_WalletService_Accounts = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/Accounts',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.AccountsRequest,
  proto.walletrpc.AccountsResponse,
  /**
   * @param {!proto.walletrpc.AccountsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AccountsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.AccountsRequest,
 *   !proto.walletrpc.AccountsResponse>}
 */
const methodInfo_WalletService_Accounts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.AccountsResponse,
  /**
   * @param {!proto.walletrpc.AccountsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AccountsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.AccountsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.AccountsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.AccountsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.accounts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/Accounts',
      request,
      metadata || {},
      methodDescriptor_WalletService_Accounts,
      callback);
};


/**
 * @param {!proto.walletrpc.AccountsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.AccountsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.accounts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/Accounts',
      request,
      metadata || {},
      methodDescriptor_WalletService_Accounts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.BalanceRequest,
 *   !proto.walletrpc.BalanceResponse>}
 */
const methodDescriptor_WalletService_Balance = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/Balance',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.BalanceRequest,
  proto.walletrpc.BalanceResponse,
  /**
   * @param {!proto.walletrpc.BalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.BalanceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.BalanceRequest,
 *   !proto.walletrpc.BalanceResponse>}
 */
const methodInfo_WalletService_Balance = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.BalanceResponse,
  /**
   * @param {!proto.walletrpc.BalanceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.BalanceResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.BalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.BalanceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.BalanceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.balance =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/Balance',
      request,
      metadata || {},
      methodDescriptor_WalletService_Balance,
      callback);
};


/**
 * @param {!proto.walletrpc.BalanceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.BalanceResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.balance =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/Balance',
      request,
      metadata || {},
      methodDescriptor_WalletService_Balance);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.GetAccountExtendedPubKeyRequest,
 *   !proto.walletrpc.GetAccountExtendedPubKeyResponse>}
 */
const methodDescriptor_WalletService_GetAccountExtendedPubKey = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/GetAccountExtendedPubKey',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.GetAccountExtendedPubKeyRequest,
  proto.walletrpc.GetAccountExtendedPubKeyResponse,
  /**
   * @param {!proto.walletrpc.GetAccountExtendedPubKeyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetAccountExtendedPubKeyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.GetAccountExtendedPubKeyRequest,
 *   !proto.walletrpc.GetAccountExtendedPubKeyResponse>}
 */
const methodInfo_WalletService_GetAccountExtendedPubKey = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.GetAccountExtendedPubKeyResponse,
  /**
   * @param {!proto.walletrpc.GetAccountExtendedPubKeyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetAccountExtendedPubKeyResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.GetAccountExtendedPubKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.GetAccountExtendedPubKeyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetAccountExtendedPubKeyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.getAccountExtendedPubKey =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/GetAccountExtendedPubKey',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetAccountExtendedPubKey,
      callback);
};


/**
 * @param {!proto.walletrpc.GetAccountExtendedPubKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.GetAccountExtendedPubKeyResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.getAccountExtendedPubKey =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/GetAccountExtendedPubKey',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetAccountExtendedPubKey);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.GetAccountExtendedPrivKeyRequest,
 *   !proto.walletrpc.GetAccountExtendedPrivKeyResponse>}
 */
const methodDescriptor_WalletService_GetAccountExtendedPrivKey = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/GetAccountExtendedPrivKey',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.GetAccountExtendedPrivKeyRequest,
  proto.walletrpc.GetAccountExtendedPrivKeyResponse,
  /**
   * @param {!proto.walletrpc.GetAccountExtendedPrivKeyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetAccountExtendedPrivKeyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.GetAccountExtendedPrivKeyRequest,
 *   !proto.walletrpc.GetAccountExtendedPrivKeyResponse>}
 */
const methodInfo_WalletService_GetAccountExtendedPrivKey = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.GetAccountExtendedPrivKeyResponse,
  /**
   * @param {!proto.walletrpc.GetAccountExtendedPrivKeyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetAccountExtendedPrivKeyResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.GetAccountExtendedPrivKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.GetAccountExtendedPrivKeyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetAccountExtendedPrivKeyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.getAccountExtendedPrivKey =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/GetAccountExtendedPrivKey',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetAccountExtendedPrivKey,
      callback);
};


/**
 * @param {!proto.walletrpc.GetAccountExtendedPrivKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.GetAccountExtendedPrivKeyResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.getAccountExtendedPrivKey =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/GetAccountExtendedPrivKey',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetAccountExtendedPrivKey);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.GetTransactionRequest,
 *   !proto.walletrpc.GetTransactionResponse>}
 */
const methodDescriptor_WalletService_GetTransaction = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/GetTransaction',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.GetTransactionRequest,
  proto.walletrpc.GetTransactionResponse,
  /**
   * @param {!proto.walletrpc.GetTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTransactionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.GetTransactionRequest,
 *   !proto.walletrpc.GetTransactionResponse>}
 */
const methodInfo_WalletService_GetTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.GetTransactionResponse,
  /**
   * @param {!proto.walletrpc.GetTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.GetTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.GetTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.getTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/GetTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTransaction,
      callback);
};


/**
 * @param {!proto.walletrpc.GetTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.GetTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.getTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/GetTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTransaction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.GetTransactionsRequest,
 *   !proto.walletrpc.GetTransactionsResponse>}
 */
const methodDescriptor_WalletService_GetTransactions = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/GetTransactions',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.GetTransactionsRequest,
  proto.walletrpc.GetTransactionsResponse,
  /**
   * @param {!proto.walletrpc.GetTransactionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTransactionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.GetTransactionsRequest,
 *   !proto.walletrpc.GetTransactionsResponse>}
 */
const methodInfo_WalletService_GetTransactions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.GetTransactionsResponse,
  /**
   * @param {!proto.walletrpc.GetTransactionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.GetTransactionsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetTransactionsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.getTransactions =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/GetTransactions',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTransactions);
};


/**
 * @param {!proto.walletrpc.GetTransactionsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetTransactionsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServicePromiseClient.prototype.getTransactions =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/GetTransactions',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTransactions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.GetTicketRequest,
 *   !proto.walletrpc.GetTicketsResponse>}
 */
const methodDescriptor_WalletService_GetTicket = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/GetTicket',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.GetTicketRequest,
  proto.walletrpc.GetTicketsResponse,
  /**
   * @param {!proto.walletrpc.GetTicketRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTicketsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.GetTicketRequest,
 *   !proto.walletrpc.GetTicketsResponse>}
 */
const methodInfo_WalletService_GetTicket = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.GetTicketsResponse,
  /**
   * @param {!proto.walletrpc.GetTicketRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTicketsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.GetTicketRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.GetTicketsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetTicketsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.getTicket =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/GetTicket',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTicket,
      callback);
};


/**
 * @param {!proto.walletrpc.GetTicketRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.GetTicketsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.getTicket =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/GetTicket',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTicket);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.GetTicketsRequest,
 *   !proto.walletrpc.GetTicketsResponse>}
 */
const methodDescriptor_WalletService_GetTickets = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/GetTickets',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.GetTicketsRequest,
  proto.walletrpc.GetTicketsResponse,
  /**
   * @param {!proto.walletrpc.GetTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTicketsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.GetTicketsRequest,
 *   !proto.walletrpc.GetTicketsResponse>}
 */
const methodInfo_WalletService_GetTickets = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.GetTicketsResponse,
  /**
   * @param {!proto.walletrpc.GetTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GetTicketsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.GetTicketsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetTicketsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.getTickets =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/GetTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTickets);
};


/**
 * @param {!proto.walletrpc.GetTicketsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GetTicketsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServicePromiseClient.prototype.getTickets =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/GetTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_GetTickets);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.TicketPriceRequest,
 *   !proto.walletrpc.TicketPriceResponse>}
 */
const methodDescriptor_WalletService_TicketPrice = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/TicketPrice',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.TicketPriceRequest,
  proto.walletrpc.TicketPriceResponse,
  /**
   * @param {!proto.walletrpc.TicketPriceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.TicketPriceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.TicketPriceRequest,
 *   !proto.walletrpc.TicketPriceResponse>}
 */
const methodInfo_WalletService_TicketPrice = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.TicketPriceResponse,
  /**
   * @param {!proto.walletrpc.TicketPriceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.TicketPriceResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.TicketPriceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.TicketPriceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.TicketPriceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.ticketPrice =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/TicketPrice',
      request,
      metadata || {},
      methodDescriptor_WalletService_TicketPrice,
      callback);
};


/**
 * @param {!proto.walletrpc.TicketPriceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.TicketPriceResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.ticketPrice =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/TicketPrice',
      request,
      metadata || {},
      methodDescriptor_WalletService_TicketPrice);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.StakeInfoRequest,
 *   !proto.walletrpc.StakeInfoResponse>}
 */
const methodDescriptor_WalletService_StakeInfo = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/StakeInfo',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.StakeInfoRequest,
  proto.walletrpc.StakeInfoResponse,
  /**
   * @param {!proto.walletrpc.StakeInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.StakeInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.StakeInfoRequest,
 *   !proto.walletrpc.StakeInfoResponse>}
 */
const methodInfo_WalletService_StakeInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.StakeInfoResponse,
  /**
   * @param {!proto.walletrpc.StakeInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.StakeInfoResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.StakeInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.StakeInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.StakeInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.stakeInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/StakeInfo',
      request,
      metadata || {},
      methodDescriptor_WalletService_StakeInfo,
      callback);
};


/**
 * @param {!proto.walletrpc.StakeInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.StakeInfoResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.stakeInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/StakeInfo',
      request,
      metadata || {},
      methodDescriptor_WalletService_StakeInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.BlockInfoRequest,
 *   !proto.walletrpc.BlockInfoResponse>}
 */
const methodDescriptor_WalletService_BlockInfo = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/BlockInfo',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.BlockInfoRequest,
  proto.walletrpc.BlockInfoResponse,
  /**
   * @param {!proto.walletrpc.BlockInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.BlockInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.BlockInfoRequest,
 *   !proto.walletrpc.BlockInfoResponse>}
 */
const methodInfo_WalletService_BlockInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.BlockInfoResponse,
  /**
   * @param {!proto.walletrpc.BlockInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.BlockInfoResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.BlockInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.BlockInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.BlockInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.blockInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/BlockInfo',
      request,
      metadata || {},
      methodDescriptor_WalletService_BlockInfo,
      callback);
};


/**
 * @param {!proto.walletrpc.BlockInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.BlockInfoResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.blockInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/BlockInfo',
      request,
      metadata || {},
      methodDescriptor_WalletService_BlockInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.BestBlockRequest,
 *   !proto.walletrpc.BestBlockResponse>}
 */
const methodDescriptor_WalletService_BestBlock = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/BestBlock',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.BestBlockRequest,
  proto.walletrpc.BestBlockResponse,
  /**
   * @param {!proto.walletrpc.BestBlockRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.BestBlockResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.BestBlockRequest,
 *   !proto.walletrpc.BestBlockResponse>}
 */
const methodInfo_WalletService_BestBlock = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.BestBlockResponse,
  /**
   * @param {!proto.walletrpc.BestBlockRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.BestBlockResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.BestBlockRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.BestBlockResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.BestBlockResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.bestBlock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/BestBlock',
      request,
      metadata || {},
      methodDescriptor_WalletService_BestBlock,
      callback);
};


/**
 * @param {!proto.walletrpc.BestBlockRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.BestBlockResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.bestBlock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/BestBlock',
      request,
      metadata || {},
      methodDescriptor_WalletService_BestBlock);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.TransactionNotificationsRequest,
 *   !proto.walletrpc.TransactionNotificationsResponse>}
 */
const methodDescriptor_WalletService_TransactionNotifications = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/TransactionNotifications',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.TransactionNotificationsRequest,
  proto.walletrpc.TransactionNotificationsResponse,
  /**
   * @param {!proto.walletrpc.TransactionNotificationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.TransactionNotificationsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.TransactionNotificationsRequest,
 *   !proto.walletrpc.TransactionNotificationsResponse>}
 */
const methodInfo_WalletService_TransactionNotifications = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.TransactionNotificationsResponse,
  /**
   * @param {!proto.walletrpc.TransactionNotificationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.TransactionNotificationsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.TransactionNotificationsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.TransactionNotificationsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.transactionNotifications =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/TransactionNotifications',
      request,
      metadata || {},
      methodDescriptor_WalletService_TransactionNotifications);
};


/**
 * @param {!proto.walletrpc.TransactionNotificationsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.TransactionNotificationsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServicePromiseClient.prototype.transactionNotifications =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/TransactionNotifications',
      request,
      metadata || {},
      methodDescriptor_WalletService_TransactionNotifications);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.AccountNotificationsRequest,
 *   !proto.walletrpc.AccountNotificationsResponse>}
 */
const methodDescriptor_WalletService_AccountNotifications = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/AccountNotifications',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.AccountNotificationsRequest,
  proto.walletrpc.AccountNotificationsResponse,
  /**
   * @param {!proto.walletrpc.AccountNotificationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AccountNotificationsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.AccountNotificationsRequest,
 *   !proto.walletrpc.AccountNotificationsResponse>}
 */
const methodInfo_WalletService_AccountNotifications = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.AccountNotificationsResponse,
  /**
   * @param {!proto.walletrpc.AccountNotificationsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AccountNotificationsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.AccountNotificationsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.AccountNotificationsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.accountNotifications =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/AccountNotifications',
      request,
      metadata || {},
      methodDescriptor_WalletService_AccountNotifications);
};


/**
 * @param {!proto.walletrpc.AccountNotificationsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.AccountNotificationsResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServicePromiseClient.prototype.accountNotifications =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/AccountNotifications',
      request,
      metadata || {},
      methodDescriptor_WalletService_AccountNotifications);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.ChangePassphraseRequest,
 *   !proto.walletrpc.ChangePassphraseResponse>}
 */
const methodDescriptor_WalletService_ChangePassphrase = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/ChangePassphrase',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.ChangePassphraseRequest,
  proto.walletrpc.ChangePassphraseResponse,
  /**
   * @param {!proto.walletrpc.ChangePassphraseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ChangePassphraseResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.ChangePassphraseRequest,
 *   !proto.walletrpc.ChangePassphraseResponse>}
 */
const methodInfo_WalletService_ChangePassphrase = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.ChangePassphraseResponse,
  /**
   * @param {!proto.walletrpc.ChangePassphraseRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ChangePassphraseResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.ChangePassphraseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.ChangePassphraseResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.ChangePassphraseResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.changePassphrase =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/ChangePassphrase',
      request,
      metadata || {},
      methodDescriptor_WalletService_ChangePassphrase,
      callback);
};


/**
 * @param {!proto.walletrpc.ChangePassphraseRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.ChangePassphraseResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.changePassphrase =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/ChangePassphrase',
      request,
      metadata || {},
      methodDescriptor_WalletService_ChangePassphrase);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.RenameAccountRequest,
 *   !proto.walletrpc.RenameAccountResponse>}
 */
const methodDescriptor_WalletService_RenameAccount = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/RenameAccount',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.RenameAccountRequest,
  proto.walletrpc.RenameAccountResponse,
  /**
   * @param {!proto.walletrpc.RenameAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RenameAccountResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.RenameAccountRequest,
 *   !proto.walletrpc.RenameAccountResponse>}
 */
const methodInfo_WalletService_RenameAccount = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.RenameAccountResponse,
  /**
   * @param {!proto.walletrpc.RenameAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RenameAccountResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.RenameAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.RenameAccountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RenameAccountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.renameAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/RenameAccount',
      request,
      metadata || {},
      methodDescriptor_WalletService_RenameAccount,
      callback);
};


/**
 * @param {!proto.walletrpc.RenameAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.RenameAccountResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.renameAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/RenameAccount',
      request,
      metadata || {},
      methodDescriptor_WalletService_RenameAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.RescanRequest,
 *   !proto.walletrpc.RescanResponse>}
 */
const methodDescriptor_WalletService_Rescan = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/Rescan',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.RescanRequest,
  proto.walletrpc.RescanResponse,
  /**
   * @param {!proto.walletrpc.RescanRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RescanResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.RescanRequest,
 *   !proto.walletrpc.RescanResponse>}
 */
const methodInfo_WalletService_Rescan = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.RescanResponse,
  /**
   * @param {!proto.walletrpc.RescanRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RescanResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.RescanRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RescanResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.rescan =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/Rescan',
      request,
      metadata || {},
      methodDescriptor_WalletService_Rescan);
};


/**
 * @param {!proto.walletrpc.RescanRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RescanResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServicePromiseClient.prototype.rescan =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/Rescan',
      request,
      metadata || {},
      methodDescriptor_WalletService_Rescan);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.NextAccountRequest,
 *   !proto.walletrpc.NextAccountResponse>}
 */
const methodDescriptor_WalletService_NextAccount = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/NextAccount',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.NextAccountRequest,
  proto.walletrpc.NextAccountResponse,
  /**
   * @param {!proto.walletrpc.NextAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.NextAccountResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.NextAccountRequest,
 *   !proto.walletrpc.NextAccountResponse>}
 */
const methodInfo_WalletService_NextAccount = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.NextAccountResponse,
  /**
   * @param {!proto.walletrpc.NextAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.NextAccountResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.NextAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.NextAccountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.NextAccountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.nextAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/NextAccount',
      request,
      metadata || {},
      methodDescriptor_WalletService_NextAccount,
      callback);
};


/**
 * @param {!proto.walletrpc.NextAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.NextAccountResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.nextAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/NextAccount',
      request,
      metadata || {},
      methodDescriptor_WalletService_NextAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.NextAddressRequest,
 *   !proto.walletrpc.NextAddressResponse>}
 */
const methodDescriptor_WalletService_NextAddress = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/NextAddress',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.NextAddressRequest,
  proto.walletrpc.NextAddressResponse,
  /**
   * @param {!proto.walletrpc.NextAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.NextAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.NextAddressRequest,
 *   !proto.walletrpc.NextAddressResponse>}
 */
const methodInfo_WalletService_NextAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.NextAddressResponse,
  /**
   * @param {!proto.walletrpc.NextAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.NextAddressResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.NextAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.NextAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.NextAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.nextAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/NextAddress',
      request,
      metadata || {},
      methodDescriptor_WalletService_NextAddress,
      callback);
};


/**
 * @param {!proto.walletrpc.NextAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.NextAddressResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.nextAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/NextAddress',
      request,
      metadata || {},
      methodDescriptor_WalletService_NextAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.ImportPrivateKeyRequest,
 *   !proto.walletrpc.ImportPrivateKeyResponse>}
 */
const methodDescriptor_WalletService_ImportPrivateKey = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/ImportPrivateKey',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.ImportPrivateKeyRequest,
  proto.walletrpc.ImportPrivateKeyResponse,
  /**
   * @param {!proto.walletrpc.ImportPrivateKeyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ImportPrivateKeyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.ImportPrivateKeyRequest,
 *   !proto.walletrpc.ImportPrivateKeyResponse>}
 */
const methodInfo_WalletService_ImportPrivateKey = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.ImportPrivateKeyResponse,
  /**
   * @param {!proto.walletrpc.ImportPrivateKeyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ImportPrivateKeyResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.ImportPrivateKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.ImportPrivateKeyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.ImportPrivateKeyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.importPrivateKey =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/ImportPrivateKey',
      request,
      metadata || {},
      methodDescriptor_WalletService_ImportPrivateKey,
      callback);
};


/**
 * @param {!proto.walletrpc.ImportPrivateKeyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.ImportPrivateKeyResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.importPrivateKey =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/ImportPrivateKey',
      request,
      metadata || {},
      methodDescriptor_WalletService_ImportPrivateKey);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.ImportScriptRequest,
 *   !proto.walletrpc.ImportScriptResponse>}
 */
const methodDescriptor_WalletService_ImportScript = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/ImportScript',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.ImportScriptRequest,
  proto.walletrpc.ImportScriptResponse,
  /**
   * @param {!proto.walletrpc.ImportScriptRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ImportScriptResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.ImportScriptRequest,
 *   !proto.walletrpc.ImportScriptResponse>}
 */
const methodInfo_WalletService_ImportScript = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.ImportScriptResponse,
  /**
   * @param {!proto.walletrpc.ImportScriptRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ImportScriptResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.ImportScriptRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.ImportScriptResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.ImportScriptResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.importScript =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/ImportScript',
      request,
      metadata || {},
      methodDescriptor_WalletService_ImportScript,
      callback);
};


/**
 * @param {!proto.walletrpc.ImportScriptRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.ImportScriptResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.importScript =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/ImportScript',
      request,
      metadata || {},
      methodDescriptor_WalletService_ImportScript);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.FundTransactionRequest,
 *   !proto.walletrpc.FundTransactionResponse>}
 */
const methodDescriptor_WalletService_FundTransaction = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/FundTransaction',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.FundTransactionRequest,
  proto.walletrpc.FundTransactionResponse,
  /**
   * @param {!proto.walletrpc.FundTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.FundTransactionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.FundTransactionRequest,
 *   !proto.walletrpc.FundTransactionResponse>}
 */
const methodInfo_WalletService_FundTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.FundTransactionResponse,
  /**
   * @param {!proto.walletrpc.FundTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.FundTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.FundTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.FundTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.FundTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.fundTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/FundTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_FundTransaction,
      callback);
};


/**
 * @param {!proto.walletrpc.FundTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.FundTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.fundTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/FundTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_FundTransaction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.UnspentOutputsRequest,
 *   !proto.walletrpc.UnspentOutputResponse>}
 */
const methodDescriptor_WalletService_UnspentOutputs = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/UnspentOutputs',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.UnspentOutputsRequest,
  proto.walletrpc.UnspentOutputResponse,
  /**
   * @param {!proto.walletrpc.UnspentOutputsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.UnspentOutputResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.UnspentOutputsRequest,
 *   !proto.walletrpc.UnspentOutputResponse>}
 */
const methodInfo_WalletService_UnspentOutputs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.UnspentOutputResponse,
  /**
   * @param {!proto.walletrpc.UnspentOutputsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.UnspentOutputResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.UnspentOutputsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.UnspentOutputResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.unspentOutputs =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/UnspentOutputs',
      request,
      metadata || {},
      methodDescriptor_WalletService_UnspentOutputs);
};


/**
 * @param {!proto.walletrpc.UnspentOutputsRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.UnspentOutputResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServicePromiseClient.prototype.unspentOutputs =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletService/UnspentOutputs',
      request,
      metadata || {},
      methodDescriptor_WalletService_UnspentOutputs);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.ConstructTransactionRequest,
 *   !proto.walletrpc.ConstructTransactionResponse>}
 */
const methodDescriptor_WalletService_ConstructTransaction = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/ConstructTransaction',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.ConstructTransactionRequest,
  proto.walletrpc.ConstructTransactionResponse,
  /**
   * @param {!proto.walletrpc.ConstructTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ConstructTransactionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.ConstructTransactionRequest,
 *   !proto.walletrpc.ConstructTransactionResponse>}
 */
const methodInfo_WalletService_ConstructTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.ConstructTransactionResponse,
  /**
   * @param {!proto.walletrpc.ConstructTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ConstructTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.ConstructTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.ConstructTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.ConstructTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.constructTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/ConstructTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_ConstructTransaction,
      callback);
};


/**
 * @param {!proto.walletrpc.ConstructTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.ConstructTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.constructTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/ConstructTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_ConstructTransaction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SignTransactionRequest,
 *   !proto.walletrpc.SignTransactionResponse>}
 */
const methodDescriptor_WalletService_SignTransaction = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/SignTransaction',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SignTransactionRequest,
  proto.walletrpc.SignTransactionResponse,
  /**
   * @param {!proto.walletrpc.SignTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignTransactionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SignTransactionRequest,
 *   !proto.walletrpc.SignTransactionResponse>}
 */
const methodInfo_WalletService_SignTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SignTransactionResponse,
  /**
   * @param {!proto.walletrpc.SignTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SignTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SignTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SignTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.signTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/SignTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignTransaction,
      callback);
};


/**
 * @param {!proto.walletrpc.SignTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SignTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.signTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/SignTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignTransaction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SignTransactionsRequest,
 *   !proto.walletrpc.SignTransactionsResponse>}
 */
const methodDescriptor_WalletService_SignTransactions = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/SignTransactions',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SignTransactionsRequest,
  proto.walletrpc.SignTransactionsResponse,
  /**
   * @param {!proto.walletrpc.SignTransactionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignTransactionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SignTransactionsRequest,
 *   !proto.walletrpc.SignTransactionsResponse>}
 */
const methodInfo_WalletService_SignTransactions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SignTransactionsResponse,
  /**
   * @param {!proto.walletrpc.SignTransactionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SignTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SignTransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SignTransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.signTransactions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/SignTransactions',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignTransactions,
      callback);
};


/**
 * @param {!proto.walletrpc.SignTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SignTransactionsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.signTransactions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/SignTransactions',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignTransactions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.CreateSignatureRequest,
 *   !proto.walletrpc.CreateSignatureResponse>}
 */
const methodDescriptor_WalletService_CreateSignature = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/CreateSignature',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.CreateSignatureRequest,
  proto.walletrpc.CreateSignatureResponse,
  /**
   * @param {!proto.walletrpc.CreateSignatureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CreateSignatureResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.CreateSignatureRequest,
 *   !proto.walletrpc.CreateSignatureResponse>}
 */
const methodInfo_WalletService_CreateSignature = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.CreateSignatureResponse,
  /**
   * @param {!proto.walletrpc.CreateSignatureRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CreateSignatureResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.CreateSignatureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.CreateSignatureResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.CreateSignatureResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.createSignature =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/CreateSignature',
      request,
      metadata || {},
      methodDescriptor_WalletService_CreateSignature,
      callback);
};


/**
 * @param {!proto.walletrpc.CreateSignatureRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.CreateSignatureResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.createSignature =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/CreateSignature',
      request,
      metadata || {},
      methodDescriptor_WalletService_CreateSignature);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.PublishTransactionRequest,
 *   !proto.walletrpc.PublishTransactionResponse>}
 */
const methodDescriptor_WalletService_PublishTransaction = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/PublishTransaction',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.PublishTransactionRequest,
  proto.walletrpc.PublishTransactionResponse,
  /**
   * @param {!proto.walletrpc.PublishTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PublishTransactionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.PublishTransactionRequest,
 *   !proto.walletrpc.PublishTransactionResponse>}
 */
const methodInfo_WalletService_PublishTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.PublishTransactionResponse,
  /**
   * @param {!proto.walletrpc.PublishTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PublishTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.PublishTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.PublishTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.PublishTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.publishTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/PublishTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_PublishTransaction,
      callback);
};


/**
 * @param {!proto.walletrpc.PublishTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.PublishTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.publishTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/PublishTransaction',
      request,
      metadata || {},
      methodDescriptor_WalletService_PublishTransaction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.PublishUnminedTransactionsRequest,
 *   !proto.walletrpc.PublishUnminedTransactionsResponse>}
 */
const methodDescriptor_WalletService_PublishUnminedTransactions = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/PublishUnminedTransactions',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.PublishUnminedTransactionsRequest,
  proto.walletrpc.PublishUnminedTransactionsResponse,
  /**
   * @param {!proto.walletrpc.PublishUnminedTransactionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PublishUnminedTransactionsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.PublishUnminedTransactionsRequest,
 *   !proto.walletrpc.PublishUnminedTransactionsResponse>}
 */
const methodInfo_WalletService_PublishUnminedTransactions = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.PublishUnminedTransactionsResponse,
  /**
   * @param {!proto.walletrpc.PublishUnminedTransactionsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PublishUnminedTransactionsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.PublishUnminedTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.PublishUnminedTransactionsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.PublishUnminedTransactionsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.publishUnminedTransactions =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/PublishUnminedTransactions',
      request,
      metadata || {},
      methodDescriptor_WalletService_PublishUnminedTransactions,
      callback);
};


/**
 * @param {!proto.walletrpc.PublishUnminedTransactionsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.PublishUnminedTransactionsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.publishUnminedTransactions =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/PublishUnminedTransactions',
      request,
      metadata || {},
      methodDescriptor_WalletService_PublishUnminedTransactions);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.PurchaseTicketsRequest,
 *   !proto.walletrpc.PurchaseTicketsResponse>}
 */
const methodDescriptor_WalletService_PurchaseTickets = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/PurchaseTickets',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.PurchaseTicketsRequest,
  proto.walletrpc.PurchaseTicketsResponse,
  /**
   * @param {!proto.walletrpc.PurchaseTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PurchaseTicketsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.PurchaseTicketsRequest,
 *   !proto.walletrpc.PurchaseTicketsResponse>}
 */
const methodInfo_WalletService_PurchaseTickets = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.PurchaseTicketsResponse,
  /**
   * @param {!proto.walletrpc.PurchaseTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.PurchaseTicketsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.PurchaseTicketsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.PurchaseTicketsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.PurchaseTicketsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.purchaseTickets =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/PurchaseTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_PurchaseTickets,
      callback);
};


/**
 * @param {!proto.walletrpc.PurchaseTicketsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.PurchaseTicketsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.purchaseTickets =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/PurchaseTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_PurchaseTickets);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.RevokeTicketsRequest,
 *   !proto.walletrpc.RevokeTicketsResponse>}
 */
const methodDescriptor_WalletService_RevokeTickets = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/RevokeTickets',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.RevokeTicketsRequest,
  proto.walletrpc.RevokeTicketsResponse,
  /**
   * @param {!proto.walletrpc.RevokeTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RevokeTicketsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.RevokeTicketsRequest,
 *   !proto.walletrpc.RevokeTicketsResponse>}
 */
const methodInfo_WalletService_RevokeTickets = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.RevokeTicketsResponse,
  /**
   * @param {!proto.walletrpc.RevokeTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RevokeTicketsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.RevokeTicketsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.RevokeTicketsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RevokeTicketsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.revokeTickets =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/RevokeTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_RevokeTickets,
      callback);
};


/**
 * @param {!proto.walletrpc.RevokeTicketsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.RevokeTicketsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.revokeTickets =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/RevokeTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_RevokeTickets);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.LoadActiveDataFiltersRequest,
 *   !proto.walletrpc.LoadActiveDataFiltersResponse>}
 */
const methodDescriptor_WalletService_LoadActiveDataFilters = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/LoadActiveDataFilters',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.LoadActiveDataFiltersRequest,
  proto.walletrpc.LoadActiveDataFiltersResponse,
  /**
   * @param {!proto.walletrpc.LoadActiveDataFiltersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.LoadActiveDataFiltersResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.LoadActiveDataFiltersRequest,
 *   !proto.walletrpc.LoadActiveDataFiltersResponse>}
 */
const methodInfo_WalletService_LoadActiveDataFilters = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.LoadActiveDataFiltersResponse,
  /**
   * @param {!proto.walletrpc.LoadActiveDataFiltersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.LoadActiveDataFiltersResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.LoadActiveDataFiltersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.LoadActiveDataFiltersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.LoadActiveDataFiltersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.loadActiveDataFilters =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/LoadActiveDataFilters',
      request,
      metadata || {},
      methodDescriptor_WalletService_LoadActiveDataFilters,
      callback);
};


/**
 * @param {!proto.walletrpc.LoadActiveDataFiltersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.LoadActiveDataFiltersResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.loadActiveDataFilters =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/LoadActiveDataFilters',
      request,
      metadata || {},
      methodDescriptor_WalletService_LoadActiveDataFilters);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SignMessageRequest,
 *   !proto.walletrpc.SignMessageResponse>}
 */
const methodDescriptor_WalletService_SignMessage = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/SignMessage',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SignMessageRequest,
  proto.walletrpc.SignMessageResponse,
  /**
   * @param {!proto.walletrpc.SignMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignMessageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SignMessageRequest,
 *   !proto.walletrpc.SignMessageResponse>}
 */
const methodInfo_WalletService_SignMessage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SignMessageResponse,
  /**
   * @param {!proto.walletrpc.SignMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignMessageResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SignMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SignMessageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SignMessageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.signMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/SignMessage',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignMessage,
      callback);
};


/**
 * @param {!proto.walletrpc.SignMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SignMessageResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.signMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/SignMessage',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SignMessagesRequest,
 *   !proto.walletrpc.SignMessagesResponse>}
 */
const methodDescriptor_WalletService_SignMessages = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/SignMessages',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SignMessagesRequest,
  proto.walletrpc.SignMessagesResponse,
  /**
   * @param {!proto.walletrpc.SignMessagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignMessagesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SignMessagesRequest,
 *   !proto.walletrpc.SignMessagesResponse>}
 */
const methodInfo_WalletService_SignMessages = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SignMessagesResponse,
  /**
   * @param {!proto.walletrpc.SignMessagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SignMessagesResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SignMessagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SignMessagesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SignMessagesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.signMessages =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/SignMessages',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignMessages,
      callback);
};


/**
 * @param {!proto.walletrpc.SignMessagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SignMessagesResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.signMessages =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/SignMessages',
      request,
      metadata || {},
      methodDescriptor_WalletService_SignMessages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.ValidateAddressRequest,
 *   !proto.walletrpc.ValidateAddressResponse>}
 */
const methodDescriptor_WalletService_ValidateAddress = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/ValidateAddress',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.ValidateAddressRequest,
  proto.walletrpc.ValidateAddressResponse,
  /**
   * @param {!proto.walletrpc.ValidateAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ValidateAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.ValidateAddressRequest,
 *   !proto.walletrpc.ValidateAddressResponse>}
 */
const methodInfo_WalletService_ValidateAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.ValidateAddressResponse,
  /**
   * @param {!proto.walletrpc.ValidateAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.ValidateAddressResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.ValidateAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.ValidateAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.ValidateAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.validateAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/ValidateAddress',
      request,
      metadata || {},
      methodDescriptor_WalletService_ValidateAddress,
      callback);
};


/**
 * @param {!proto.walletrpc.ValidateAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.ValidateAddressResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.validateAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/ValidateAddress',
      request,
      metadata || {},
      methodDescriptor_WalletService_ValidateAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.CommittedTicketsRequest,
 *   !proto.walletrpc.CommittedTicketsResponse>}
 */
const methodDescriptor_WalletService_CommittedTickets = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/CommittedTickets',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.CommittedTicketsRequest,
  proto.walletrpc.CommittedTicketsResponse,
  /**
   * @param {!proto.walletrpc.CommittedTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CommittedTicketsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.CommittedTicketsRequest,
 *   !proto.walletrpc.CommittedTicketsResponse>}
 */
const methodInfo_WalletService_CommittedTickets = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.CommittedTicketsResponse,
  /**
   * @param {!proto.walletrpc.CommittedTicketsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CommittedTicketsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.CommittedTicketsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.CommittedTicketsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.CommittedTicketsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.committedTickets =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/CommittedTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_CommittedTickets,
      callback);
};


/**
 * @param {!proto.walletrpc.CommittedTicketsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.CommittedTicketsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.committedTickets =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/CommittedTickets',
      request,
      metadata || {},
      methodDescriptor_WalletService_CommittedTickets);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SweepAccountRequest,
 *   !proto.walletrpc.SweepAccountResponse>}
 */
const methodDescriptor_WalletService_SweepAccount = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletService/SweepAccount',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SweepAccountRequest,
  proto.walletrpc.SweepAccountResponse,
  /**
   * @param {!proto.walletrpc.SweepAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SweepAccountResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SweepAccountRequest,
 *   !proto.walletrpc.SweepAccountResponse>}
 */
const methodInfo_WalletService_SweepAccount = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SweepAccountResponse,
  /**
   * @param {!proto.walletrpc.SweepAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SweepAccountResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SweepAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SweepAccountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SweepAccountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletServiceClient.prototype.sweepAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletService/SweepAccount',
      request,
      metadata || {},
      methodDescriptor_WalletService_SweepAccount,
      callback);
};


/**
 * @param {!proto.walletrpc.SweepAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SweepAccountResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletServicePromiseClient.prototype.sweepAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletService/SweepAccount',
      request,
      metadata || {},
      methodDescriptor_WalletService_SweepAccount);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.WalletLoaderServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.WalletLoaderServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.WalletExistsRequest,
 *   !proto.walletrpc.WalletExistsResponse>}
 */
const methodDescriptor_WalletLoaderService_WalletExists = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/WalletExists',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.WalletExistsRequest,
  proto.walletrpc.WalletExistsResponse,
  /**
   * @param {!proto.walletrpc.WalletExistsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.WalletExistsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.WalletExistsRequest,
 *   !proto.walletrpc.WalletExistsResponse>}
 */
const methodInfo_WalletLoaderService_WalletExists = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.WalletExistsResponse,
  /**
   * @param {!proto.walletrpc.WalletExistsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.WalletExistsResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.WalletExistsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.WalletExistsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.WalletExistsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.walletExists =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/WalletExists',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_WalletExists,
      callback);
};


/**
 * @param {!proto.walletrpc.WalletExistsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.WalletExistsResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.walletExists =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/WalletExists',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_WalletExists);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.CreateWalletRequest,
 *   !proto.walletrpc.CreateWalletResponse>}
 */
const methodDescriptor_WalletLoaderService_CreateWallet = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/CreateWallet',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.CreateWalletRequest,
  proto.walletrpc.CreateWalletResponse,
  /**
   * @param {!proto.walletrpc.CreateWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CreateWalletResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.CreateWalletRequest,
 *   !proto.walletrpc.CreateWalletResponse>}
 */
const methodInfo_WalletLoaderService_CreateWallet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.CreateWalletResponse,
  /**
   * @param {!proto.walletrpc.CreateWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CreateWalletResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.CreateWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.CreateWalletResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.CreateWalletResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.createWallet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/CreateWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_CreateWallet,
      callback);
};


/**
 * @param {!proto.walletrpc.CreateWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.CreateWalletResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.createWallet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/CreateWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_CreateWallet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.CreateWatchingOnlyWalletRequest,
 *   !proto.walletrpc.CreateWatchingOnlyWalletResponse>}
 */
const methodDescriptor_WalletLoaderService_CreateWatchingOnlyWallet = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/CreateWatchingOnlyWallet',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.CreateWatchingOnlyWalletRequest,
  proto.walletrpc.CreateWatchingOnlyWalletResponse,
  /**
   * @param {!proto.walletrpc.CreateWatchingOnlyWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CreateWatchingOnlyWalletResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.CreateWatchingOnlyWalletRequest,
 *   !proto.walletrpc.CreateWatchingOnlyWalletResponse>}
 */
const methodInfo_WalletLoaderService_CreateWatchingOnlyWallet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.CreateWatchingOnlyWalletResponse,
  /**
   * @param {!proto.walletrpc.CreateWatchingOnlyWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CreateWatchingOnlyWalletResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.CreateWatchingOnlyWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.CreateWatchingOnlyWalletResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.CreateWatchingOnlyWalletResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.createWatchingOnlyWallet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/CreateWatchingOnlyWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_CreateWatchingOnlyWallet,
      callback);
};


/**
 * @param {!proto.walletrpc.CreateWatchingOnlyWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.CreateWatchingOnlyWalletResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.createWatchingOnlyWallet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/CreateWatchingOnlyWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_CreateWatchingOnlyWallet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.OpenWalletRequest,
 *   !proto.walletrpc.OpenWalletResponse>}
 */
const methodDescriptor_WalletLoaderService_OpenWallet = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/OpenWallet',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.OpenWalletRequest,
  proto.walletrpc.OpenWalletResponse,
  /**
   * @param {!proto.walletrpc.OpenWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.OpenWalletResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.OpenWalletRequest,
 *   !proto.walletrpc.OpenWalletResponse>}
 */
const methodInfo_WalletLoaderService_OpenWallet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.OpenWalletResponse,
  /**
   * @param {!proto.walletrpc.OpenWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.OpenWalletResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.OpenWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.OpenWalletResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.OpenWalletResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.openWallet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/OpenWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_OpenWallet,
      callback);
};


/**
 * @param {!proto.walletrpc.OpenWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.OpenWalletResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.openWallet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/OpenWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_OpenWallet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.CloseWalletRequest,
 *   !proto.walletrpc.CloseWalletResponse>}
 */
const methodDescriptor_WalletLoaderService_CloseWallet = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/CloseWallet',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.CloseWalletRequest,
  proto.walletrpc.CloseWalletResponse,
  /**
   * @param {!proto.walletrpc.CloseWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CloseWalletResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.CloseWalletRequest,
 *   !proto.walletrpc.CloseWalletResponse>}
 */
const methodInfo_WalletLoaderService_CloseWallet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.CloseWalletResponse,
  /**
   * @param {!proto.walletrpc.CloseWalletRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.CloseWalletResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.CloseWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.CloseWalletResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.CloseWalletResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.closeWallet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/CloseWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_CloseWallet,
      callback);
};


/**
 * @param {!proto.walletrpc.CloseWalletRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.CloseWalletResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.closeWallet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/CloseWallet',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_CloseWallet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SpvSyncRequest,
 *   !proto.walletrpc.SpvSyncResponse>}
 */
const methodDescriptor_WalletLoaderService_SpvSync = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/SpvSync',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.SpvSyncRequest,
  proto.walletrpc.SpvSyncResponse,
  /**
   * @param {!proto.walletrpc.SpvSyncRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SpvSyncResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SpvSyncRequest,
 *   !proto.walletrpc.SpvSyncResponse>}
 */
const methodInfo_WalletLoaderService_SpvSync = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SpvSyncResponse,
  /**
   * @param {!proto.walletrpc.SpvSyncRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SpvSyncResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SpvSyncRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SpvSyncResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.spvSync =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletLoaderService/SpvSync',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_SpvSync);
};


/**
 * @param {!proto.walletrpc.SpvSyncRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SpvSyncResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.spvSync =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletLoaderService/SpvSync',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_SpvSync);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.RpcSyncRequest,
 *   !proto.walletrpc.RpcSyncResponse>}
 */
const methodDescriptor_WalletLoaderService_RpcSync = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/RpcSync',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.RpcSyncRequest,
  proto.walletrpc.RpcSyncResponse,
  /**
   * @param {!proto.walletrpc.RpcSyncRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RpcSyncResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.RpcSyncRequest,
 *   !proto.walletrpc.RpcSyncResponse>}
 */
const methodInfo_WalletLoaderService_RpcSync = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.RpcSyncResponse,
  /**
   * @param {!proto.walletrpc.RpcSyncRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RpcSyncResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.RpcSyncRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RpcSyncResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.rpcSync =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletLoaderService/RpcSync',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_RpcSync);
};


/**
 * @param {!proto.walletrpc.RpcSyncRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RpcSyncResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.rpcSync =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.WalletLoaderService/RpcSync',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_RpcSync);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.RescanPointRequest,
 *   !proto.walletrpc.RescanPointResponse>}
 */
const methodDescriptor_WalletLoaderService_RescanPoint = new grpc.web.MethodDescriptor(
  '/walletrpc.WalletLoaderService/RescanPoint',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.RescanPointRequest,
  proto.walletrpc.RescanPointResponse,
  /**
   * @param {!proto.walletrpc.RescanPointRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RescanPointResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.RescanPointRequest,
 *   !proto.walletrpc.RescanPointResponse>}
 */
const methodInfo_WalletLoaderService_RescanPoint = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.RescanPointResponse,
  /**
   * @param {!proto.walletrpc.RescanPointRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RescanPointResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.RescanPointRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.RescanPointResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RescanPointResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.WalletLoaderServiceClient.prototype.rescanPoint =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/RescanPoint',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_RescanPoint,
      callback);
};


/**
 * @param {!proto.walletrpc.RescanPointRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.RescanPointResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.WalletLoaderServicePromiseClient.prototype.rescanPoint =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.WalletLoaderService/RescanPoint',
      request,
      metadata || {},
      methodDescriptor_WalletLoaderService_RescanPoint);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.TicketBuyerV2ServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.TicketBuyerV2ServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.RunTicketBuyerRequest,
 *   !proto.walletrpc.RunTicketBuyerResponse>}
 */
const methodDescriptor_TicketBuyerV2Service_RunTicketBuyer = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerV2Service/RunTicketBuyer',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.walletrpc.RunTicketBuyerRequest,
  proto.walletrpc.RunTicketBuyerResponse,
  /**
   * @param {!proto.walletrpc.RunTicketBuyerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RunTicketBuyerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.RunTicketBuyerRequest,
 *   !proto.walletrpc.RunTicketBuyerResponse>}
 */
const methodInfo_TicketBuyerV2Service_RunTicketBuyer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.RunTicketBuyerResponse,
  /**
   * @param {!proto.walletrpc.RunTicketBuyerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.RunTicketBuyerResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.RunTicketBuyerRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RunTicketBuyerResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerV2ServiceClient.prototype.runTicketBuyer =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.TicketBuyerV2Service/RunTicketBuyer',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerV2Service_RunTicketBuyer);
};


/**
 * @param {!proto.walletrpc.RunTicketBuyerRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.RunTicketBuyerResponse>}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerV2ServicePromiseClient.prototype.runTicketBuyer =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/walletrpc.TicketBuyerV2Service/RunTicketBuyer',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerV2Service_RunTicketBuyer);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.TicketBuyerServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.TicketBuyerServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.StartAutoBuyerRequest,
 *   !proto.walletrpc.StartAutoBuyerResponse>}
 */
const methodDescriptor_TicketBuyerService_StartAutoBuyer = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/StartAutoBuyer',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.StartAutoBuyerRequest,
  proto.walletrpc.StartAutoBuyerResponse,
  /**
   * @param {!proto.walletrpc.StartAutoBuyerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.StartAutoBuyerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.StartAutoBuyerRequest,
 *   !proto.walletrpc.StartAutoBuyerResponse>}
 */
const methodInfo_TicketBuyerService_StartAutoBuyer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.StartAutoBuyerResponse,
  /**
   * @param {!proto.walletrpc.StartAutoBuyerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.StartAutoBuyerResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.StartAutoBuyerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.StartAutoBuyerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.StartAutoBuyerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.startAutoBuyer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/StartAutoBuyer',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_StartAutoBuyer,
      callback);
};


/**
 * @param {!proto.walletrpc.StartAutoBuyerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.StartAutoBuyerResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.startAutoBuyer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/StartAutoBuyer',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_StartAutoBuyer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.StopAutoBuyerRequest,
 *   !proto.walletrpc.StopAutoBuyerResponse>}
 */
const methodDescriptor_TicketBuyerService_StopAutoBuyer = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/StopAutoBuyer',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.StopAutoBuyerRequest,
  proto.walletrpc.StopAutoBuyerResponse,
  /**
   * @param {!proto.walletrpc.StopAutoBuyerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.StopAutoBuyerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.StopAutoBuyerRequest,
 *   !proto.walletrpc.StopAutoBuyerResponse>}
 */
const methodInfo_TicketBuyerService_StopAutoBuyer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.StopAutoBuyerResponse,
  /**
   * @param {!proto.walletrpc.StopAutoBuyerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.StopAutoBuyerResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.StopAutoBuyerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.StopAutoBuyerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.StopAutoBuyerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.stopAutoBuyer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/StopAutoBuyer',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_StopAutoBuyer,
      callback);
};


/**
 * @param {!proto.walletrpc.StopAutoBuyerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.StopAutoBuyerResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.stopAutoBuyer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/StopAutoBuyer',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_StopAutoBuyer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.TicketBuyerConfigRequest,
 *   !proto.walletrpc.TicketBuyerConfigResponse>}
 */
const methodDescriptor_TicketBuyerService_TicketBuyerConfig = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/TicketBuyerConfig',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.TicketBuyerConfigRequest,
  proto.walletrpc.TicketBuyerConfigResponse,
  /**
   * @param {!proto.walletrpc.TicketBuyerConfigRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.TicketBuyerConfigResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.TicketBuyerConfigRequest,
 *   !proto.walletrpc.TicketBuyerConfigResponse>}
 */
const methodInfo_TicketBuyerService_TicketBuyerConfig = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.TicketBuyerConfigResponse,
  /**
   * @param {!proto.walletrpc.TicketBuyerConfigRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.TicketBuyerConfigResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.TicketBuyerConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.TicketBuyerConfigResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.TicketBuyerConfigResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.ticketBuyerConfig =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/TicketBuyerConfig',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_TicketBuyerConfig,
      callback);
};


/**
 * @param {!proto.walletrpc.TicketBuyerConfigRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.TicketBuyerConfigResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.ticketBuyerConfig =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/TicketBuyerConfig',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_TicketBuyerConfig);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetAccountRequest,
 *   !proto.walletrpc.SetAccountResponse>}
 */
const methodDescriptor_TicketBuyerService_SetAccount = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetAccount',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetAccountRequest,
  proto.walletrpc.SetAccountResponse,
  /**
   * @param {!proto.walletrpc.SetAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetAccountResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetAccountRequest,
 *   !proto.walletrpc.SetAccountResponse>}
 */
const methodInfo_TicketBuyerService_SetAccount = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetAccountResponse,
  /**
   * @param {!proto.walletrpc.SetAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetAccountResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetAccountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetAccountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetAccount',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetAccount,
      callback);
};


/**
 * @param {!proto.walletrpc.SetAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetAccountResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetAccount',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetBalanceToMaintainRequest,
 *   !proto.walletrpc.SetBalanceToMaintainResponse>}
 */
const methodDescriptor_TicketBuyerService_SetBalanceToMaintain = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetBalanceToMaintain',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetBalanceToMaintainRequest,
  proto.walletrpc.SetBalanceToMaintainResponse,
  /**
   * @param {!proto.walletrpc.SetBalanceToMaintainRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetBalanceToMaintainResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetBalanceToMaintainRequest,
 *   !proto.walletrpc.SetBalanceToMaintainResponse>}
 */
const methodInfo_TicketBuyerService_SetBalanceToMaintain = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetBalanceToMaintainResponse,
  /**
   * @param {!proto.walletrpc.SetBalanceToMaintainRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetBalanceToMaintainResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetBalanceToMaintainRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetBalanceToMaintainResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetBalanceToMaintainResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setBalanceToMaintain =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetBalanceToMaintain',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetBalanceToMaintain,
      callback);
};


/**
 * @param {!proto.walletrpc.SetBalanceToMaintainRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetBalanceToMaintainResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setBalanceToMaintain =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetBalanceToMaintain',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetBalanceToMaintain);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetMaxFeeRequest,
 *   !proto.walletrpc.SetMaxFeeResponse>}
 */
const methodDescriptor_TicketBuyerService_SetMaxFee = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetMaxFee',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetMaxFeeRequest,
  proto.walletrpc.SetMaxFeeResponse,
  /**
   * @param {!proto.walletrpc.SetMaxFeeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxFeeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetMaxFeeRequest,
 *   !proto.walletrpc.SetMaxFeeResponse>}
 */
const methodInfo_TicketBuyerService_SetMaxFee = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetMaxFeeResponse,
  /**
   * @param {!proto.walletrpc.SetMaxFeeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxFeeResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetMaxFeeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetMaxFeeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetMaxFeeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setMaxFee =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxFee',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxFee,
      callback);
};


/**
 * @param {!proto.walletrpc.SetMaxFeeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetMaxFeeResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setMaxFee =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxFee',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxFee);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetMaxPriceRelativeRequest,
 *   !proto.walletrpc.SetMaxPriceRelativeResponse>}
 */
const methodDescriptor_TicketBuyerService_SetMaxPriceRelative = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetMaxPriceRelative',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetMaxPriceRelativeRequest,
  proto.walletrpc.SetMaxPriceRelativeResponse,
  /**
   * @param {!proto.walletrpc.SetMaxPriceRelativeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxPriceRelativeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetMaxPriceRelativeRequest,
 *   !proto.walletrpc.SetMaxPriceRelativeResponse>}
 */
const methodInfo_TicketBuyerService_SetMaxPriceRelative = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetMaxPriceRelativeResponse,
  /**
   * @param {!proto.walletrpc.SetMaxPriceRelativeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxPriceRelativeResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetMaxPriceRelativeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetMaxPriceRelativeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetMaxPriceRelativeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setMaxPriceRelative =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxPriceRelative',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxPriceRelative,
      callback);
};


/**
 * @param {!proto.walletrpc.SetMaxPriceRelativeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetMaxPriceRelativeResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setMaxPriceRelative =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxPriceRelative',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxPriceRelative);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetMaxPriceAbsoluteRequest,
 *   !proto.walletrpc.SetMaxPriceAbsoluteResponse>}
 */
const methodDescriptor_TicketBuyerService_SetMaxPriceAbsolute = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetMaxPriceAbsolute',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetMaxPriceAbsoluteRequest,
  proto.walletrpc.SetMaxPriceAbsoluteResponse,
  /**
   * @param {!proto.walletrpc.SetMaxPriceAbsoluteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxPriceAbsoluteResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetMaxPriceAbsoluteRequest,
 *   !proto.walletrpc.SetMaxPriceAbsoluteResponse>}
 */
const methodInfo_TicketBuyerService_SetMaxPriceAbsolute = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetMaxPriceAbsoluteResponse,
  /**
   * @param {!proto.walletrpc.SetMaxPriceAbsoluteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxPriceAbsoluteResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetMaxPriceAbsoluteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetMaxPriceAbsoluteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetMaxPriceAbsoluteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setMaxPriceAbsolute =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxPriceAbsolute',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxPriceAbsolute,
      callback);
};


/**
 * @param {!proto.walletrpc.SetMaxPriceAbsoluteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetMaxPriceAbsoluteResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setMaxPriceAbsolute =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxPriceAbsolute',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxPriceAbsolute);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetVotingAddressRequest,
 *   !proto.walletrpc.SetVotingAddressResponse>}
 */
const methodDescriptor_TicketBuyerService_SetVotingAddress = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetVotingAddress',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetVotingAddressRequest,
  proto.walletrpc.SetVotingAddressResponse,
  /**
   * @param {!proto.walletrpc.SetVotingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetVotingAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetVotingAddressRequest,
 *   !proto.walletrpc.SetVotingAddressResponse>}
 */
const methodInfo_TicketBuyerService_SetVotingAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetVotingAddressResponse,
  /**
   * @param {!proto.walletrpc.SetVotingAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetVotingAddressResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetVotingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetVotingAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetVotingAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setVotingAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetVotingAddress',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetVotingAddress,
      callback);
};


/**
 * @param {!proto.walletrpc.SetVotingAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetVotingAddressResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setVotingAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetVotingAddress',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetVotingAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetPoolAddressRequest,
 *   !proto.walletrpc.SetPoolAddressResponse>}
 */
const methodDescriptor_TicketBuyerService_SetPoolAddress = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetPoolAddress',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetPoolAddressRequest,
  proto.walletrpc.SetPoolAddressResponse,
  /**
   * @param {!proto.walletrpc.SetPoolAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetPoolAddressResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetPoolAddressRequest,
 *   !proto.walletrpc.SetPoolAddressResponse>}
 */
const methodInfo_TicketBuyerService_SetPoolAddress = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetPoolAddressResponse,
  /**
   * @param {!proto.walletrpc.SetPoolAddressRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetPoolAddressResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetPoolAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetPoolAddressResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetPoolAddressResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setPoolAddress =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetPoolAddress',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetPoolAddress,
      callback);
};


/**
 * @param {!proto.walletrpc.SetPoolAddressRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetPoolAddressResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setPoolAddress =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetPoolAddress',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetPoolAddress);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetPoolFeesRequest,
 *   !proto.walletrpc.SetPoolFeesResponse>}
 */
const methodDescriptor_TicketBuyerService_SetPoolFees = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetPoolFees',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetPoolFeesRequest,
  proto.walletrpc.SetPoolFeesResponse,
  /**
   * @param {!proto.walletrpc.SetPoolFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetPoolFeesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetPoolFeesRequest,
 *   !proto.walletrpc.SetPoolFeesResponse>}
 */
const methodInfo_TicketBuyerService_SetPoolFees = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetPoolFeesResponse,
  /**
   * @param {!proto.walletrpc.SetPoolFeesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetPoolFeesResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetPoolFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetPoolFeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetPoolFeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setPoolFees =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetPoolFees',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetPoolFees,
      callback);
};


/**
 * @param {!proto.walletrpc.SetPoolFeesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetPoolFeesResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setPoolFees =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetPoolFees',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetPoolFees);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetMaxPerBlockRequest,
 *   !proto.walletrpc.SetMaxPerBlockResponse>}
 */
const methodDescriptor_TicketBuyerService_SetMaxPerBlock = new grpc.web.MethodDescriptor(
  '/walletrpc.TicketBuyerService/SetMaxPerBlock',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetMaxPerBlockRequest,
  proto.walletrpc.SetMaxPerBlockResponse,
  /**
   * @param {!proto.walletrpc.SetMaxPerBlockRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxPerBlockResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetMaxPerBlockRequest,
 *   !proto.walletrpc.SetMaxPerBlockResponse>}
 */
const methodInfo_TicketBuyerService_SetMaxPerBlock = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetMaxPerBlockResponse,
  /**
   * @param {!proto.walletrpc.SetMaxPerBlockRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetMaxPerBlockResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetMaxPerBlockRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetMaxPerBlockResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetMaxPerBlockResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.TicketBuyerServiceClient.prototype.setMaxPerBlock =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxPerBlock',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxPerBlock,
      callback);
};


/**
 * @param {!proto.walletrpc.SetMaxPerBlockRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetMaxPerBlockResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.TicketBuyerServicePromiseClient.prototype.setMaxPerBlock =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.TicketBuyerService/SetMaxPerBlock',
      request,
      metadata || {},
      methodDescriptor_TicketBuyerService_SetMaxPerBlock);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.SeedServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.SeedServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.GenerateRandomSeedRequest,
 *   !proto.walletrpc.GenerateRandomSeedResponse>}
 */
const methodDescriptor_SeedService_GenerateRandomSeed = new grpc.web.MethodDescriptor(
  '/walletrpc.SeedService/GenerateRandomSeed',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.GenerateRandomSeedRequest,
  proto.walletrpc.GenerateRandomSeedResponse,
  /**
   * @param {!proto.walletrpc.GenerateRandomSeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GenerateRandomSeedResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.GenerateRandomSeedRequest,
 *   !proto.walletrpc.GenerateRandomSeedResponse>}
 */
const methodInfo_SeedService_GenerateRandomSeed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.GenerateRandomSeedResponse,
  /**
   * @param {!proto.walletrpc.GenerateRandomSeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.GenerateRandomSeedResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.GenerateRandomSeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.GenerateRandomSeedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.GenerateRandomSeedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.SeedServiceClient.prototype.generateRandomSeed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.SeedService/GenerateRandomSeed',
      request,
      metadata || {},
      methodDescriptor_SeedService_GenerateRandomSeed,
      callback);
};


/**
 * @param {!proto.walletrpc.GenerateRandomSeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.GenerateRandomSeedResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.SeedServicePromiseClient.prototype.generateRandomSeed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.SeedService/GenerateRandomSeed',
      request,
      metadata || {},
      methodDescriptor_SeedService_GenerateRandomSeed);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.DecodeSeedRequest,
 *   !proto.walletrpc.DecodeSeedResponse>}
 */
const methodDescriptor_SeedService_DecodeSeed = new grpc.web.MethodDescriptor(
  '/walletrpc.SeedService/DecodeSeed',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.DecodeSeedRequest,
  proto.walletrpc.DecodeSeedResponse,
  /**
   * @param {!proto.walletrpc.DecodeSeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.DecodeSeedResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.DecodeSeedRequest,
 *   !proto.walletrpc.DecodeSeedResponse>}
 */
const methodInfo_SeedService_DecodeSeed = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.DecodeSeedResponse,
  /**
   * @param {!proto.walletrpc.DecodeSeedRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.DecodeSeedResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.DecodeSeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.DecodeSeedResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.DecodeSeedResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.SeedServiceClient.prototype.decodeSeed =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.SeedService/DecodeSeed',
      request,
      metadata || {},
      methodDescriptor_SeedService_DecodeSeed,
      callback);
};


/**
 * @param {!proto.walletrpc.DecodeSeedRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.DecodeSeedResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.SeedServicePromiseClient.prototype.decodeSeed =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.SeedService/DecodeSeed',
      request,
      metadata || {},
      methodDescriptor_SeedService_DecodeSeed);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.AgendaServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.AgendaServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.AgendasRequest,
 *   !proto.walletrpc.AgendasResponse>}
 */
const methodDescriptor_AgendaService_Agendas = new grpc.web.MethodDescriptor(
  '/walletrpc.AgendaService/Agendas',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.AgendasRequest,
  proto.walletrpc.AgendasResponse,
  /**
   * @param {!proto.walletrpc.AgendasRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AgendasResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.AgendasRequest,
 *   !proto.walletrpc.AgendasResponse>}
 */
const methodInfo_AgendaService_Agendas = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.AgendasResponse,
  /**
   * @param {!proto.walletrpc.AgendasRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.AgendasResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.AgendasRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.AgendasResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.AgendasResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.AgendaServiceClient.prototype.agendas =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.AgendaService/Agendas',
      request,
      metadata || {},
      methodDescriptor_AgendaService_Agendas,
      callback);
};


/**
 * @param {!proto.walletrpc.AgendasRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.AgendasResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.AgendaServicePromiseClient.prototype.agendas =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.AgendaService/Agendas',
      request,
      metadata || {},
      methodDescriptor_AgendaService_Agendas);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.VotingServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.VotingServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.VoteChoicesRequest,
 *   !proto.walletrpc.VoteChoicesResponse>}
 */
const methodDescriptor_VotingService_VoteChoices = new grpc.web.MethodDescriptor(
  '/walletrpc.VotingService/VoteChoices',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.VoteChoicesRequest,
  proto.walletrpc.VoteChoicesResponse,
  /**
   * @param {!proto.walletrpc.VoteChoicesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.VoteChoicesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.VoteChoicesRequest,
 *   !proto.walletrpc.VoteChoicesResponse>}
 */
const methodInfo_VotingService_VoteChoices = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.VoteChoicesResponse,
  /**
   * @param {!proto.walletrpc.VoteChoicesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.VoteChoicesResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.VoteChoicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.VoteChoicesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.VoteChoicesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.VotingServiceClient.prototype.voteChoices =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.VotingService/VoteChoices',
      request,
      metadata || {},
      methodDescriptor_VotingService_VoteChoices,
      callback);
};


/**
 * @param {!proto.walletrpc.VoteChoicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.VoteChoicesResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.VotingServicePromiseClient.prototype.voteChoices =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.VotingService/VoteChoices',
      request,
      metadata || {},
      methodDescriptor_VotingService_VoteChoices);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.SetVoteChoicesRequest,
 *   !proto.walletrpc.SetVoteChoicesResponse>}
 */
const methodDescriptor_VotingService_SetVoteChoices = new grpc.web.MethodDescriptor(
  '/walletrpc.VotingService/SetVoteChoices',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.SetVoteChoicesRequest,
  proto.walletrpc.SetVoteChoicesResponse,
  /**
   * @param {!proto.walletrpc.SetVoteChoicesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetVoteChoicesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.SetVoteChoicesRequest,
 *   !proto.walletrpc.SetVoteChoicesResponse>}
 */
const methodInfo_VotingService_SetVoteChoices = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.SetVoteChoicesResponse,
  /**
   * @param {!proto.walletrpc.SetVoteChoicesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.SetVoteChoicesResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.SetVoteChoicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.SetVoteChoicesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.SetVoteChoicesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.VotingServiceClient.prototype.setVoteChoices =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.VotingService/SetVoteChoices',
      request,
      metadata || {},
      methodDescriptor_VotingService_SetVoteChoices,
      callback);
};


/**
 * @param {!proto.walletrpc.SetVoteChoicesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.SetVoteChoicesResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.VotingServicePromiseClient.prototype.setVoteChoices =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.VotingService/SetVoteChoices',
      request,
      metadata || {},
      methodDescriptor_VotingService_SetVoteChoices);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.MessageVerificationServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.MessageVerificationServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.VerifyMessageRequest,
 *   !proto.walletrpc.VerifyMessageResponse>}
 */
const methodDescriptor_MessageVerificationService_VerifyMessage = new grpc.web.MethodDescriptor(
  '/walletrpc.MessageVerificationService/VerifyMessage',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.VerifyMessageRequest,
  proto.walletrpc.VerifyMessageResponse,
  /**
   * @param {!proto.walletrpc.VerifyMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.VerifyMessageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.VerifyMessageRequest,
 *   !proto.walletrpc.VerifyMessageResponse>}
 */
const methodInfo_MessageVerificationService_VerifyMessage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.VerifyMessageResponse,
  /**
   * @param {!proto.walletrpc.VerifyMessageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.VerifyMessageResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.VerifyMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.VerifyMessageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.VerifyMessageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.MessageVerificationServiceClient.prototype.verifyMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.MessageVerificationService/VerifyMessage',
      request,
      metadata || {},
      methodDescriptor_MessageVerificationService_VerifyMessage,
      callback);
};


/**
 * @param {!proto.walletrpc.VerifyMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.VerifyMessageResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.MessageVerificationServicePromiseClient.prototype.verifyMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.MessageVerificationService/VerifyMessage',
      request,
      metadata || {},
      methodDescriptor_MessageVerificationService_VerifyMessage);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.DecodeMessageServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.walletrpc.DecodeMessageServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.walletrpc.DecodeRawTransactionRequest,
 *   !proto.walletrpc.DecodeRawTransactionResponse>}
 */
const methodDescriptor_DecodeMessageService_DecodeRawTransaction = new grpc.web.MethodDescriptor(
  '/walletrpc.DecodeMessageService/DecodeRawTransaction',
  grpc.web.MethodType.UNARY,
  proto.walletrpc.DecodeRawTransactionRequest,
  proto.walletrpc.DecodeRawTransactionResponse,
  /**
   * @param {!proto.walletrpc.DecodeRawTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.DecodeRawTransactionResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.walletrpc.DecodeRawTransactionRequest,
 *   !proto.walletrpc.DecodeRawTransactionResponse>}
 */
const methodInfo_DecodeMessageService_DecodeRawTransaction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.walletrpc.DecodeRawTransactionResponse,
  /**
   * @param {!proto.walletrpc.DecodeRawTransactionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.walletrpc.DecodeRawTransactionResponse.deserializeBinary
);


/**
 * @param {!proto.walletrpc.DecodeRawTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.walletrpc.DecodeRawTransactionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.walletrpc.DecodeRawTransactionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.walletrpc.DecodeMessageServiceClient.prototype.decodeRawTransaction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/walletrpc.DecodeMessageService/DecodeRawTransaction',
      request,
      metadata || {},
      methodDescriptor_DecodeMessageService_DecodeRawTransaction,
      callback);
};


/**
 * @param {!proto.walletrpc.DecodeRawTransactionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.walletrpc.DecodeRawTransactionResponse>}
 *     A native promise that resolves to the response
 */
proto.walletrpc.DecodeMessageServicePromiseClient.prototype.decodeRawTransaction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/walletrpc.DecodeMessageService/DecodeRawTransaction',
      request,
      metadata || {},
      methodDescriptor_DecodeMessageService_DecodeRawTransaction);
};


module.exports = proto.walletrpc;

