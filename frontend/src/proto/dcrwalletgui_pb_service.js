// package: walletgui
// file: dcrwalletgui.proto

var dcrwalletgui_pb = require("./dcrwalletgui_pb");
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
  requestType: dcrwalletgui_pb.GetConfigRequest,
  responseType: dcrwalletgui_pb.AppConfiguration
};

AppConfig.SetConfig = {
  methodName: "SetConfig",
  service: AppConfig,
  requestStream: false,
  responseStream: false,
  requestType: dcrwalletgui_pb.SetConfigRequest,
  responseType: dcrwalletgui_pb.SetConfigResponse
};

AppConfig.CreateTransaction = {
  methodName: "CreateTransaction",
  service: AppConfig,
  requestStream: false,
  responseStream: false,
  requestType: dcrwalletgui_pb.CreateTransactionRequest,
  responseType: dcrwalletgui_pb.CreateTransactionResponse
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
  requestType: dcrwalletgui_pb.CheckConnectionRequest,
  responseType: dcrwalletgui_pb.CheckConnectionResponse
};

NetworkService.ConnectWallet = {
  methodName: "ConnectWallet",
  service: NetworkService,
  requestStream: false,
  responseStream: false,
  requestType: dcrwalletgui_pb.ConnectWalletRequest,
  responseType: dcrwalletgui_pb.ConnectWalletResponse
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
  requestType: dcrwalletgui_pb.GetMarketChartRequest,
  responseType: dcrwalletgui_pb.GetMarketChartResponse
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

