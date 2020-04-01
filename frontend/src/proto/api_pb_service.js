// package: walletrpc
// file: api.proto

var api_pb = require("./api_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VersionService = (function () {
  function VersionService() {}
  VersionService.serviceName = "walletrpc.VersionService";
  return VersionService;
}());

VersionService.Version = {
  methodName: "Version",
  service: VersionService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.VersionRequest,
  responseType: api_pb.VersionResponse
};

exports.VersionService = VersionService;

function VersionServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VersionServiceClient.prototype.version = function version(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VersionService.Version, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.VersionServiceClient = VersionServiceClient;

var WalletService = (function () {
  function WalletService() {}
  WalletService.serviceName = "walletrpc.WalletService";
  return WalletService;
}());

WalletService.Ping = {
  methodName: "Ping",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.PingRequest,
  responseType: api_pb.PingResponse
};

WalletService.Network = {
  methodName: "Network",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.NetworkRequest,
  responseType: api_pb.NetworkResponse
};

WalletService.CoinType = {
  methodName: "CoinType",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CoinTypeRequest,
  responseType: api_pb.CoinTypeResponse
};

WalletService.AccountNumber = {
  methodName: "AccountNumber",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.AccountNumberRequest,
  responseType: api_pb.AccountNumberResponse
};

WalletService.Accounts = {
  methodName: "Accounts",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.AccountsRequest,
  responseType: api_pb.AccountsResponse
};

WalletService.Balance = {
  methodName: "Balance",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.BalanceRequest,
  responseType: api_pb.BalanceResponse
};

WalletService.GetAccountExtendedPubKey = {
  methodName: "GetAccountExtendedPubKey",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetAccountExtendedPubKeyRequest,
  responseType: api_pb.GetAccountExtendedPubKeyResponse
};

WalletService.GetAccountExtendedPrivKey = {
  methodName: "GetAccountExtendedPrivKey",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetAccountExtendedPrivKeyRequest,
  responseType: api_pb.GetAccountExtendedPrivKeyResponse
};

WalletService.GetTransaction = {
  methodName: "GetTransaction",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetTransactionRequest,
  responseType: api_pb.GetTransactionResponse
};

WalletService.GetTransactions = {
  methodName: "GetTransactions",
  service: WalletService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.GetTransactionsRequest,
  responseType: api_pb.GetTransactionsResponse
};

WalletService.GetTicket = {
  methodName: "GetTicket",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetTicketRequest,
  responseType: api_pb.GetTicketsResponse
};

WalletService.GetTickets = {
  methodName: "GetTickets",
  service: WalletService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.GetTicketsRequest,
  responseType: api_pb.GetTicketsResponse
};

WalletService.TicketPrice = {
  methodName: "TicketPrice",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.TicketPriceRequest,
  responseType: api_pb.TicketPriceResponse
};

WalletService.StakeInfo = {
  methodName: "StakeInfo",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.StakeInfoRequest,
  responseType: api_pb.StakeInfoResponse
};

WalletService.BlockInfo = {
  methodName: "BlockInfo",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.BlockInfoRequest,
  responseType: api_pb.BlockInfoResponse
};

WalletService.BestBlock = {
  methodName: "BestBlock",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.BestBlockRequest,
  responseType: api_pb.BestBlockResponse
};

WalletService.Spender = {
  methodName: "Spender",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SpenderRequest,
  responseType: api_pb.SpenderResponse
};

WalletService.TransactionNotifications = {
  methodName: "TransactionNotifications",
  service: WalletService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.TransactionNotificationsRequest,
  responseType: api_pb.TransactionNotificationsResponse
};

WalletService.AccountNotifications = {
  methodName: "AccountNotifications",
  service: WalletService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.AccountNotificationsRequest,
  responseType: api_pb.AccountNotificationsResponse
};

WalletService.ConfirmationNotifications = {
  methodName: "ConfirmationNotifications",
  service: WalletService,
  requestStream: true,
  responseStream: true,
  requestType: api_pb.ConfirmationNotificationsRequest,
  responseType: api_pb.ConfirmationNotificationsResponse
};

WalletService.ChangePassphrase = {
  methodName: "ChangePassphrase",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ChangePassphraseRequest,
  responseType: api_pb.ChangePassphraseResponse
};

WalletService.RenameAccount = {
  methodName: "RenameAccount",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RenameAccountRequest,
  responseType: api_pb.RenameAccountResponse
};

WalletService.Rescan = {
  methodName: "Rescan",
  service: WalletService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.RescanRequest,
  responseType: api_pb.RescanResponse
};

WalletService.NextAccount = {
  methodName: "NextAccount",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.NextAccountRequest,
  responseType: api_pb.NextAccountResponse
};

WalletService.NextAddress = {
  methodName: "NextAddress",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.NextAddressRequest,
  responseType: api_pb.NextAddressResponse
};

WalletService.ImportPrivateKey = {
  methodName: "ImportPrivateKey",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ImportPrivateKeyRequest,
  responseType: api_pb.ImportPrivateKeyResponse
};

WalletService.ImportScript = {
  methodName: "ImportScript",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ImportScriptRequest,
  responseType: api_pb.ImportScriptResponse
};

WalletService.FundTransaction = {
  methodName: "FundTransaction",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.FundTransactionRequest,
  responseType: api_pb.FundTransactionResponse
};

WalletService.UnspentOutputs = {
  methodName: "UnspentOutputs",
  service: WalletService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.UnspentOutputsRequest,
  responseType: api_pb.UnspentOutputResponse
};

WalletService.ConstructTransaction = {
  methodName: "ConstructTransaction",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ConstructTransactionRequest,
  responseType: api_pb.ConstructTransactionResponse
};

WalletService.SignTransaction = {
  methodName: "SignTransaction",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SignTransactionRequest,
  responseType: api_pb.SignTransactionResponse
};

WalletService.SignTransactions = {
  methodName: "SignTransactions",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SignTransactionsRequest,
  responseType: api_pb.SignTransactionsResponse
};

WalletService.CreateRawTransaction = {
  methodName: "CreateRawTransaction",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateRawTransactionRequest,
  responseType: api_pb.CreateRawTransactionResponse
};

WalletService.CreateSignature = {
  methodName: "CreateSignature",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateSignatureRequest,
  responseType: api_pb.CreateSignatureResponse
};

WalletService.PublishTransaction = {
  methodName: "PublishTransaction",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.PublishTransactionRequest,
  responseType: api_pb.PublishTransactionResponse
};

WalletService.PublishUnminedTransactions = {
  methodName: "PublishUnminedTransactions",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.PublishUnminedTransactionsRequest,
  responseType: api_pb.PublishUnminedTransactionsResponse
};

WalletService.PurchaseTickets = {
  methodName: "PurchaseTickets",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.PurchaseTicketsRequest,
  responseType: api_pb.PurchaseTicketsResponse
};

WalletService.RevokeTickets = {
  methodName: "RevokeTickets",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RevokeTicketsRequest,
  responseType: api_pb.RevokeTicketsResponse
};

WalletService.LoadActiveDataFilters = {
  methodName: "LoadActiveDataFilters",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.LoadActiveDataFiltersRequest,
  responseType: api_pb.LoadActiveDataFiltersResponse
};

WalletService.SignMessage = {
  methodName: "SignMessage",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SignMessageRequest,
  responseType: api_pb.SignMessageResponse
};

WalletService.SignMessages = {
  methodName: "SignMessages",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SignMessagesRequest,
  responseType: api_pb.SignMessagesResponse
};

WalletService.ValidateAddress = {
  methodName: "ValidateAddress",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ValidateAddressRequest,
  responseType: api_pb.ValidateAddressResponse
};

WalletService.CommittedTickets = {
  methodName: "CommittedTickets",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CommittedTicketsRequest,
  responseType: api_pb.CommittedTicketsResponse
};

WalletService.SweepAccount = {
  methodName: "SweepAccount",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SweepAccountRequest,
  responseType: api_pb.SweepAccountResponse
};

WalletService.SignHashes = {
  methodName: "SignHashes",
  service: WalletService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SignHashesRequest,
  responseType: api_pb.SignHashesResponse
};

exports.WalletService = WalletService;

function WalletServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

WalletServiceClient.prototype.ping = function ping(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.Ping, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.network = function network(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.Network, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.coinType = function coinType(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.CoinType, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.accountNumber = function accountNumber(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.AccountNumber, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.accounts = function accounts(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.Accounts, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.balance = function balance(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.Balance, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.getAccountExtendedPubKey = function getAccountExtendedPubKey(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.GetAccountExtendedPubKey, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.getAccountExtendedPrivKey = function getAccountExtendedPrivKey(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.GetAccountExtendedPrivKey, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.getTransaction = function getTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.GetTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.getTransactions = function getTransactions(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletService.GetTransactions, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.getTicket = function getTicket(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.GetTicket, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.getTickets = function getTickets(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletService.GetTickets, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.ticketPrice = function ticketPrice(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.TicketPrice, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.stakeInfo = function stakeInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.StakeInfo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.blockInfo = function blockInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.BlockInfo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.bestBlock = function bestBlock(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.BestBlock, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.spender = function spender(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.Spender, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.transactionNotifications = function transactionNotifications(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletService.TransactionNotifications, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.accountNotifications = function accountNotifications(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletService.AccountNotifications, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.confirmationNotifications = function confirmationNotifications(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(WalletService.ConfirmationNotifications, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.changePassphrase = function changePassphrase(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.ChangePassphrase, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.renameAccount = function renameAccount(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.RenameAccount, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.rescan = function rescan(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletService.Rescan, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.nextAccount = function nextAccount(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.NextAccount, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.nextAddress = function nextAddress(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.NextAddress, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.importPrivateKey = function importPrivateKey(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.ImportPrivateKey, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.importScript = function importScript(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.ImportScript, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.fundTransaction = function fundTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.FundTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.unspentOutputs = function unspentOutputs(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletService.UnspentOutputs, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.constructTransaction = function constructTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.ConstructTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.signTransaction = function signTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.SignTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.signTransactions = function signTransactions(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.SignTransactions, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.createRawTransaction = function createRawTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.CreateRawTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.createSignature = function createSignature(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.CreateSignature, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.publishTransaction = function publishTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.PublishTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.publishUnminedTransactions = function publishUnminedTransactions(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.PublishUnminedTransactions, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.purchaseTickets = function purchaseTickets(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.PurchaseTickets, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.revokeTickets = function revokeTickets(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.RevokeTickets, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.loadActiveDataFilters = function loadActiveDataFilters(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.LoadActiveDataFilters, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.signMessage = function signMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.SignMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.signMessages = function signMessages(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.SignMessages, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.validateAddress = function validateAddress(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.ValidateAddress, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.committedTickets = function committedTickets(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.CommittedTickets, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.sweepAccount = function sweepAccount(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.SweepAccount, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletServiceClient.prototype.signHashes = function signHashes(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletService.SignHashes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.WalletServiceClient = WalletServiceClient;

var WalletLoaderService = (function () {
  function WalletLoaderService() {}
  WalletLoaderService.serviceName = "walletrpc.WalletLoaderService";
  return WalletLoaderService;
}());

WalletLoaderService.WalletExists = {
  methodName: "WalletExists",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.WalletExistsRequest,
  responseType: api_pb.WalletExistsResponse
};

WalletLoaderService.CreateWallet = {
  methodName: "CreateWallet",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateWalletRequest,
  responseType: api_pb.CreateWalletResponse
};

WalletLoaderService.CreateWatchingOnlyWallet = {
  methodName: "CreateWatchingOnlyWallet",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateWatchingOnlyWalletRequest,
  responseType: api_pb.CreateWatchingOnlyWalletResponse
};

WalletLoaderService.OpenWallet = {
  methodName: "OpenWallet",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.OpenWalletRequest,
  responseType: api_pb.OpenWalletResponse
};

WalletLoaderService.CloseWallet = {
  methodName: "CloseWallet",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CloseWalletRequest,
  responseType: api_pb.CloseWalletResponse
};

WalletLoaderService.SpvSync = {
  methodName: "SpvSync",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.SpvSyncRequest,
  responseType: api_pb.SpvSyncResponse
};

WalletLoaderService.RpcSync = {
  methodName: "RpcSync",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.RpcSyncRequest,
  responseType: api_pb.RpcSyncResponse
};

WalletLoaderService.RescanPoint = {
  methodName: "RescanPoint",
  service: WalletLoaderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RescanPointRequest,
  responseType: api_pb.RescanPointResponse
};

exports.WalletLoaderService = WalletLoaderService;

function WalletLoaderServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

WalletLoaderServiceClient.prototype.walletExists = function walletExists(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletLoaderService.WalletExists, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletLoaderServiceClient.prototype.createWallet = function createWallet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletLoaderService.CreateWallet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletLoaderServiceClient.prototype.createWatchingOnlyWallet = function createWatchingOnlyWallet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletLoaderService.CreateWatchingOnlyWallet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletLoaderServiceClient.prototype.openWallet = function openWallet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletLoaderService.OpenWallet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletLoaderServiceClient.prototype.closeWallet = function closeWallet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletLoaderService.CloseWallet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

WalletLoaderServiceClient.prototype.spvSync = function spvSync(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletLoaderService.SpvSync, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletLoaderServiceClient.prototype.rpcSync = function rpcSync(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(WalletLoaderService.RpcSync, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

WalletLoaderServiceClient.prototype.rescanPoint = function rescanPoint(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WalletLoaderService.RescanPoint, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.WalletLoaderServiceClient = WalletLoaderServiceClient;

var AccountMixerService = (function () {
  function AccountMixerService() {}
  AccountMixerService.serviceName = "walletrpc.AccountMixerService";
  return AccountMixerService;
}());

AccountMixerService.RunAccountMixer = {
  methodName: "RunAccountMixer",
  service: AccountMixerService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.RunAccountMixerRequest,
  responseType: api_pb.RunAccountMixerResponse
};

exports.AccountMixerService = AccountMixerService;

function AccountMixerServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AccountMixerServiceClient.prototype.runAccountMixer = function runAccountMixer(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AccountMixerService.RunAccountMixer, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.AccountMixerServiceClient = AccountMixerServiceClient;

var TicketBuyerV2Service = (function () {
  function TicketBuyerV2Service() {}
  TicketBuyerV2Service.serviceName = "walletrpc.TicketBuyerV2Service";
  return TicketBuyerV2Service;
}());

TicketBuyerV2Service.RunTicketBuyer = {
  methodName: "RunTicketBuyer",
  service: TicketBuyerV2Service,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.RunTicketBuyerRequest,
  responseType: api_pb.RunTicketBuyerResponse
};

exports.TicketBuyerV2Service = TicketBuyerV2Service;

function TicketBuyerV2ServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TicketBuyerV2ServiceClient.prototype.runTicketBuyer = function runTicketBuyer(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(TicketBuyerV2Service.RunTicketBuyer, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.TicketBuyerV2ServiceClient = TicketBuyerV2ServiceClient;

var TicketBuyerService = (function () {
  function TicketBuyerService() {}
  TicketBuyerService.serviceName = "walletrpc.TicketBuyerService";
  return TicketBuyerService;
}());

TicketBuyerService.StartAutoBuyer = {
  methodName: "StartAutoBuyer",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.StartAutoBuyerRequest,
  responseType: api_pb.StartAutoBuyerResponse
};

TicketBuyerService.StopAutoBuyer = {
  methodName: "StopAutoBuyer",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.StopAutoBuyerRequest,
  responseType: api_pb.StopAutoBuyerResponse
};

TicketBuyerService.TicketBuyerConfig = {
  methodName: "TicketBuyerConfig",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.TicketBuyerConfigRequest,
  responseType: api_pb.TicketBuyerConfigResponse
};

TicketBuyerService.SetAccount = {
  methodName: "SetAccount",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetAccountRequest,
  responseType: api_pb.SetAccountResponse
};

TicketBuyerService.SetBalanceToMaintain = {
  methodName: "SetBalanceToMaintain",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetBalanceToMaintainRequest,
  responseType: api_pb.SetBalanceToMaintainResponse
};

TicketBuyerService.SetMaxFee = {
  methodName: "SetMaxFee",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetMaxFeeRequest,
  responseType: api_pb.SetMaxFeeResponse
};

TicketBuyerService.SetMaxPriceRelative = {
  methodName: "SetMaxPriceRelative",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetMaxPriceRelativeRequest,
  responseType: api_pb.SetMaxPriceRelativeResponse
};

TicketBuyerService.SetMaxPriceAbsolute = {
  methodName: "SetMaxPriceAbsolute",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetMaxPriceAbsoluteRequest,
  responseType: api_pb.SetMaxPriceAbsoluteResponse
};

TicketBuyerService.SetVotingAddress = {
  methodName: "SetVotingAddress",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetVotingAddressRequest,
  responseType: api_pb.SetVotingAddressResponse
};

TicketBuyerService.SetPoolAddress = {
  methodName: "SetPoolAddress",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetPoolAddressRequest,
  responseType: api_pb.SetPoolAddressResponse
};

TicketBuyerService.SetPoolFees = {
  methodName: "SetPoolFees",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetPoolFeesRequest,
  responseType: api_pb.SetPoolFeesResponse
};

TicketBuyerService.SetMaxPerBlock = {
  methodName: "SetMaxPerBlock",
  service: TicketBuyerService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetMaxPerBlockRequest,
  responseType: api_pb.SetMaxPerBlockResponse
};

exports.TicketBuyerService = TicketBuyerService;

function TicketBuyerServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TicketBuyerServiceClient.prototype.startAutoBuyer = function startAutoBuyer(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.StartAutoBuyer, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.stopAutoBuyer = function stopAutoBuyer(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.StopAutoBuyer, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.ticketBuyerConfig = function ticketBuyerConfig(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.TicketBuyerConfig, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setAccount = function setAccount(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetAccount, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setBalanceToMaintain = function setBalanceToMaintain(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetBalanceToMaintain, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setMaxFee = function setMaxFee(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetMaxFee, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setMaxPriceRelative = function setMaxPriceRelative(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetMaxPriceRelative, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setMaxPriceAbsolute = function setMaxPriceAbsolute(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetMaxPriceAbsolute, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setVotingAddress = function setVotingAddress(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetVotingAddress, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setPoolAddress = function setPoolAddress(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetPoolAddress, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setPoolFees = function setPoolFees(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetPoolFees, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

TicketBuyerServiceClient.prototype.setMaxPerBlock = function setMaxPerBlock(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketBuyerService.SetMaxPerBlock, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TicketBuyerServiceClient = TicketBuyerServiceClient;

var SeedService = (function () {
  function SeedService() {}
  SeedService.serviceName = "walletrpc.SeedService";
  return SeedService;
}());

SeedService.GenerateRandomSeed = {
  methodName: "GenerateRandomSeed",
  service: SeedService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GenerateRandomSeedRequest,
  responseType: api_pb.GenerateRandomSeedResponse
};

SeedService.DecodeSeed = {
  methodName: "DecodeSeed",
  service: SeedService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.DecodeSeedRequest,
  responseType: api_pb.DecodeSeedResponse
};

exports.SeedService = SeedService;

function SeedServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SeedServiceClient.prototype.generateRandomSeed = function generateRandomSeed(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SeedService.GenerateRandomSeed, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

SeedServiceClient.prototype.decodeSeed = function decodeSeed(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SeedService.DecodeSeed, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.SeedServiceClient = SeedServiceClient;

var AgendaService = (function () {
  function AgendaService() {}
  AgendaService.serviceName = "walletrpc.AgendaService";
  return AgendaService;
}());

AgendaService.Agendas = {
  methodName: "Agendas",
  service: AgendaService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.AgendasRequest,
  responseType: api_pb.AgendasResponse
};

exports.AgendaService = AgendaService;

function AgendaServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AgendaServiceClient.prototype.agendas = function agendas(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AgendaService.Agendas, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.AgendaServiceClient = AgendaServiceClient;

var VotingService = (function () {
  function VotingService() {}
  VotingService.serviceName = "walletrpc.VotingService";
  return VotingService;
}());

VotingService.VoteChoices = {
  methodName: "VoteChoices",
  service: VotingService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.VoteChoicesRequest,
  responseType: api_pb.VoteChoicesResponse
};

VotingService.SetVoteChoices = {
  methodName: "SetVoteChoices",
  service: VotingService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SetVoteChoicesRequest,
  responseType: api_pb.SetVoteChoicesResponse
};

exports.VotingService = VotingService;

function VotingServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VotingServiceClient.prototype.voteChoices = function voteChoices(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VotingService.VoteChoices, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

VotingServiceClient.prototype.setVoteChoices = function setVoteChoices(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VotingService.SetVoteChoices, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.VotingServiceClient = VotingServiceClient;

var MessageVerificationService = (function () {
  function MessageVerificationService() {}
  MessageVerificationService.serviceName = "walletrpc.MessageVerificationService";
  return MessageVerificationService;
}());

MessageVerificationService.VerifyMessage = {
  methodName: "VerifyMessage",
  service: MessageVerificationService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.VerifyMessageRequest,
  responseType: api_pb.VerifyMessageResponse
};

exports.MessageVerificationService = MessageVerificationService;

function MessageVerificationServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MessageVerificationServiceClient.prototype.verifyMessage = function verifyMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MessageVerificationService.VerifyMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.MessageVerificationServiceClient = MessageVerificationServiceClient;

var DecodeMessageService = (function () {
  function DecodeMessageService() {}
  DecodeMessageService.serviceName = "walletrpc.DecodeMessageService";
  return DecodeMessageService;
}());

DecodeMessageService.DecodeRawTransaction = {
  methodName: "DecodeRawTransaction",
  service: DecodeMessageService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.DecodeRawTransactionRequest,
  responseType: api_pb.DecodeRawTransactionResponse
};

exports.DecodeMessageService = DecodeMessageService;

function DecodeMessageServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DecodeMessageServiceClient.prototype.decodeRawTransaction = function decodeRawTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DecodeMessageService.DecodeRawTransaction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.DecodeMessageServiceClient = DecodeMessageServiceClient;

