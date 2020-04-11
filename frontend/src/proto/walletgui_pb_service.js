// package: walletgui
// file: walletgui.proto

var walletgui_pb = require("./walletgui_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AppConfig = (function () {
  function AppConfig() {}
  AppConfig.serviceName = "walletgui.AppConfig";
  return AppConfig;
}());

AppConfig.GetConfig = {
  methodName: "GetConfig",
  service: AppConfig,
  requestStream: false,
  responseStream: false,
  requestType: walletgui_pb.GetConfigRequest,
  responseType: walletgui_pb.AppConfiguration
};

AppConfig.SetConfig = {
  methodName: "SetConfig",
  service: AppConfig,
  requestStream: false,
  responseStream: false,
  requestType: walletgui_pb.SetConfigRequest,
  responseType: walletgui_pb.SetConfigResponse
};

AppConfig.CreateTransaction = {
  methodName: "CreateTransaction",
  service: AppConfig,
  requestStream: false,
  responseStream: false,
  requestType: walletgui_pb.CreateTransactionRequest,
  responseType: walletgui_pb.CreateTransactionResponse
};

exports.AppConfig = AppConfig;

function AppConfigClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AppConfigClient.prototype.getConfig = function getConfig(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AppConfig.GetConfig, {
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

AppConfigClient.prototype.setConfig = function setConfig(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AppConfig.SetConfig, {
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

AppConfigClient.prototype.createTransaction = function createTransaction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AppConfig.CreateTransaction, {
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

exports.AppConfigClient = AppConfigClient;

var NetworkService = (function () {
  function NetworkService() {}
  NetworkService.serviceName = "walletgui.NetworkService";
  return NetworkService;
}());

NetworkService.CheckConnection = {
  methodName: "CheckConnection",
  service: NetworkService,
  requestStream: false,
  responseStream: false,
  requestType: walletgui_pb.CheckConnectionRequest,
  responseType: walletgui_pb.CheckConnectionResponse
};

NetworkService.ConnectWallet = {
  methodName: "ConnectWallet",
  service: NetworkService,
  requestStream: false,
  responseStream: false,
  requestType: walletgui_pb.ConnectWalletRequest,
  responseType: walletgui_pb.ConnectWalletResponse
};

exports.NetworkService = NetworkService;

function NetworkServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

NetworkServiceClient.prototype.checkConnection = function checkConnection(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NetworkService.CheckConnection, {
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

NetworkServiceClient.prototype.connectWallet = function connectWallet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NetworkService.ConnectWallet, {
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

exports.NetworkServiceClient = NetworkServiceClient;

var ExchangeRates = (function () {
  function ExchangeRates() {}
  ExchangeRates.serviceName = "walletgui.ExchangeRates";
  return ExchangeRates;
}());

ExchangeRates.GetMarketChart = {
  methodName: "GetMarketChart",
  service: ExchangeRates,
  requestStream: false,
  responseStream: false,
  requestType: walletgui_pb.GetMarketChartRequest,
  responseType: walletgui_pb.GetMarketChartResponse
};

exports.ExchangeRates = ExchangeRates;

function ExchangeRatesClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ExchangeRatesClient.prototype.getMarketChart = function getMarketChart(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ExchangeRates.GetMarketChart, {
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

exports.ExchangeRatesClient = ExchangeRatesClient;

