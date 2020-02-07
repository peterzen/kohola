// package: dcrwalletgui
// file: dcrwalletgui.proto

var dcrwalletgui_pb = require("./dcrwalletgui_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AppConfig = (function () {
  function AppConfig() {}
  AppConfig.serviceName = "dcrwalletgui.AppConfig";
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

exports.AppConfigClient = AppConfigClient;
