/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.dcrwalletgui.AppConfiguration', null, global);
goog.exportSymbol('proto.dcrwalletgui.AppConfiguration.Network', null, global);
goog.exportSymbol('proto.dcrwalletgui.AppConfiguration.RPCEndpoint', null, global);
goog.exportSymbol('proto.dcrwalletgui.GetConfigRequest', null, global);
goog.exportSymbol('proto.dcrwalletgui.SetConfigRequest', null, global);
goog.exportSymbol('proto.dcrwalletgui.SetConfigResponse', null, global);
goog.exportSymbol('proto.dcrwalletgui.SetConfigResponse.UpdateStatus', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dcrwalletgui.GetConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dcrwalletgui.GetConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.dcrwalletgui.GetConfigRequest.displayName = 'proto.dcrwalletgui.GetConfigRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dcrwalletgui.GetConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dcrwalletgui.GetConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dcrwalletgui.GetConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 */
proto.dcrwalletgui.GetConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    passphrase: msg.getPassphrase_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dcrwalletgui.GetConfigRequest}
 */
proto.dcrwalletgui.GetConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dcrwalletgui.GetConfigRequest;
  return proto.dcrwalletgui.GetConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dcrwalletgui.GetConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dcrwalletgui.GetConfigRequest}
 */
proto.dcrwalletgui.GetConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPassphrase(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dcrwalletgui.GetConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dcrwalletgui.GetConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dcrwalletgui.GetConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.dcrwalletgui.GetConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPassphrase_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes passphrase = 1;
 * @return {!(string|Uint8Array)}
 */
proto.dcrwalletgui.GetConfigRequest.prototype.getPassphrase = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes passphrase = 1;
 * This is a type-conversion wrapper around `getPassphrase()`
 * @return {string}
 */
proto.dcrwalletgui.GetConfigRequest.prototype.getPassphrase_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPassphrase()));
};


/**
 * optional bytes passphrase = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPassphrase()`
 * @return {!Uint8Array}
 */
proto.dcrwalletgui.GetConfigRequest.prototype.getPassphrase_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPassphrase()));
};


/** @param {!(string|Uint8Array)} value */
proto.dcrwalletgui.GetConfigRequest.prototype.setPassphrase = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dcrwalletgui.SetConfigRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dcrwalletgui.SetConfigRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.dcrwalletgui.SetConfigRequest.displayName = 'proto.dcrwalletgui.SetConfigRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dcrwalletgui.SetConfigRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dcrwalletgui.SetConfigRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dcrwalletgui.SetConfigRequest} msg The msg instance to transform.
 * @return {!Object}
 */
proto.dcrwalletgui.SetConfigRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    appConfig: (f = msg.getAppConfig()) && proto.dcrwalletgui.AppConfiguration.toObject(includeInstance, f),
    passphrase: msg.getPassphrase_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dcrwalletgui.SetConfigRequest}
 */
proto.dcrwalletgui.SetConfigRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dcrwalletgui.SetConfigRequest;
  return proto.dcrwalletgui.SetConfigRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dcrwalletgui.SetConfigRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dcrwalletgui.SetConfigRequest}
 */
proto.dcrwalletgui.SetConfigRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.dcrwalletgui.AppConfiguration;
      reader.readMessage(value,proto.dcrwalletgui.AppConfiguration.deserializeBinaryFromReader);
      msg.setAppConfig(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPassphrase(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dcrwalletgui.SetConfigRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dcrwalletgui.SetConfigRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dcrwalletgui.SetConfigRequest} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.dcrwalletgui.SetConfigRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAppConfig();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.dcrwalletgui.AppConfiguration.serializeBinaryToWriter
    );
  }
  f = message.getPassphrase_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional AppConfiguration app_config = 1;
 * @return {?proto.dcrwalletgui.AppConfiguration}
 */
proto.dcrwalletgui.SetConfigRequest.prototype.getAppConfig = function() {
  return /** @type{?proto.dcrwalletgui.AppConfiguration} */ (
    jspb.Message.getWrapperField(this, proto.dcrwalletgui.AppConfiguration, 1));
};


/** @param {?proto.dcrwalletgui.AppConfiguration|undefined} value */
proto.dcrwalletgui.SetConfigRequest.prototype.setAppConfig = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.dcrwalletgui.SetConfigRequest.prototype.clearAppConfig = function() {
  this.setAppConfig(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.dcrwalletgui.SetConfigRequest.prototype.hasAppConfig = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes passphrase = 2;
 * @return {!(string|Uint8Array)}
 */
proto.dcrwalletgui.SetConfigRequest.prototype.getPassphrase = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes passphrase = 2;
 * This is a type-conversion wrapper around `getPassphrase()`
 * @return {string}
 */
proto.dcrwalletgui.SetConfigRequest.prototype.getPassphrase_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPassphrase()));
};


/**
 * optional bytes passphrase = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPassphrase()`
 * @return {!Uint8Array}
 */
proto.dcrwalletgui.SetConfigRequest.prototype.getPassphrase_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPassphrase()));
};


/** @param {!(string|Uint8Array)} value */
proto.dcrwalletgui.SetConfigRequest.prototype.setPassphrase = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dcrwalletgui.SetConfigResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dcrwalletgui.SetConfigResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.dcrwalletgui.SetConfigResponse.displayName = 'proto.dcrwalletgui.SetConfigResponse';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dcrwalletgui.SetConfigResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.dcrwalletgui.SetConfigResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dcrwalletgui.SetConfigResponse} msg The msg instance to transform.
 * @return {!Object}
 */
proto.dcrwalletgui.SetConfigResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    updateStatus: jspb.Message.getFieldWithDefault(msg, 1, 0),
    errorCode: jspb.Message.getFieldWithDefault(msg, 2, 0),
    errorDescription: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dcrwalletgui.SetConfigResponse}
 */
proto.dcrwalletgui.SetConfigResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dcrwalletgui.SetConfigResponse;
  return proto.dcrwalletgui.SetConfigResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dcrwalletgui.SetConfigResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dcrwalletgui.SetConfigResponse}
 */
proto.dcrwalletgui.SetConfigResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.dcrwalletgui.SetConfigResponse.UpdateStatus} */ (reader.readEnum());
      msg.setUpdateStatus(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setErrorCode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setErrorDescription(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dcrwalletgui.SetConfigResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dcrwalletgui.SetConfigResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dcrwalletgui.SetConfigResponse} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.dcrwalletgui.SetConfigResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUpdateStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getErrorCode();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getErrorDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.dcrwalletgui.SetConfigResponse.UpdateStatus = {
  STATUS_SUCCESS: 0,
  STATUS_ERROR: 1
};

/**
 * optional UpdateStatus update_status = 1;
 * @return {!proto.dcrwalletgui.SetConfigResponse.UpdateStatus}
 */
proto.dcrwalletgui.SetConfigResponse.prototype.getUpdateStatus = function() {
  return /** @type {!proto.dcrwalletgui.SetConfigResponse.UpdateStatus} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.dcrwalletgui.SetConfigResponse.UpdateStatus} value */
proto.dcrwalletgui.SetConfigResponse.prototype.setUpdateStatus = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int32 error_code = 2;
 * @return {number}
 */
proto.dcrwalletgui.SetConfigResponse.prototype.getErrorCode = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.dcrwalletgui.SetConfigResponse.prototype.setErrorCode = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string error_description = 3;
 * @return {string}
 */
proto.dcrwalletgui.SetConfigResponse.prototype.getErrorDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.dcrwalletgui.SetConfigResponse.prototype.setErrorDescription = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dcrwalletgui.AppConfiguration = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dcrwalletgui.AppConfiguration.repeatedFields_, null);
};
goog.inherits(proto.dcrwalletgui.AppConfiguration, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.dcrwalletgui.AppConfiguration.displayName = 'proto.dcrwalletgui.AppConfiguration';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dcrwalletgui.AppConfiguration.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dcrwalletgui.AppConfiguration.prototype.toObject = function(opt_includeInstance) {
  return proto.dcrwalletgui.AppConfiguration.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dcrwalletgui.AppConfiguration} msg The msg instance to transform.
 * @return {!Object}
 */
proto.dcrwalletgui.AppConfiguration.toObject = function(includeInstance, msg) {
  var f, obj = {
    dcrdHost: (f = msg.getDcrdHost()) && proto.dcrwalletgui.AppConfiguration.RPCEndpoint.toObject(includeInstance, f),
    dcrwalletHostsList: jspb.Message.toObjectList(msg.getDcrwalletHostsList(),
    proto.dcrwalletgui.AppConfiguration.RPCEndpoint.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dcrwalletgui.AppConfiguration}
 */
proto.dcrwalletgui.AppConfiguration.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dcrwalletgui.AppConfiguration;
  return proto.dcrwalletgui.AppConfiguration.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dcrwalletgui.AppConfiguration} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dcrwalletgui.AppConfiguration}
 */
proto.dcrwalletgui.AppConfiguration.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.dcrwalletgui.AppConfiguration.RPCEndpoint;
      reader.readMessage(value,proto.dcrwalletgui.AppConfiguration.RPCEndpoint.deserializeBinaryFromReader);
      msg.setDcrdHost(value);
      break;
    case 2:
      var value = new proto.dcrwalletgui.AppConfiguration.RPCEndpoint;
      reader.readMessage(value,proto.dcrwalletgui.AppConfiguration.RPCEndpoint.deserializeBinaryFromReader);
      msg.addDcrwalletHosts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dcrwalletgui.AppConfiguration.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dcrwalletgui.AppConfiguration.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dcrwalletgui.AppConfiguration} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.dcrwalletgui.AppConfiguration.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDcrdHost();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.dcrwalletgui.AppConfiguration.RPCEndpoint.serializeBinaryToWriter
    );
  }
  f = message.getDcrwalletHostsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.dcrwalletgui.AppConfiguration.RPCEndpoint.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.dcrwalletgui.AppConfiguration.Network = {
  MAINNET: 0,
  TESTNET: 1,
  SIMNET: 2
};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dcrwalletgui.AppConfiguration.RPCEndpoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.dcrwalletgui.AppConfiguration.RPCEndpoint.displayName = 'proto.dcrwalletgui.AppConfiguration.RPCEndpoint';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.toObject = function(opt_includeInstance) {
  return proto.dcrwalletgui.AppConfiguration.RPCEndpoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dcrwalletgui.AppConfiguration.RPCEndpoint} msg The msg instance to transform.
 * @return {!Object}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.toObject = function(includeInstance, msg) {
  var f, obj = {
    hostname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    port: jspb.Message.getFieldWithDefault(msg, 2, 0),
    username: jspb.Message.getFieldWithDefault(msg, 3, ""),
    password: jspb.Message.getFieldWithDefault(msg, 4, ""),
    certFileName: jspb.Message.getFieldWithDefault(msg, 5, ""),
    certBlob: jspb.Message.getFieldWithDefault(msg, 6, ""),
    network: jspb.Message.getFieldWithDefault(msg, 7, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dcrwalletgui.AppConfiguration.RPCEndpoint}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dcrwalletgui.AppConfiguration.RPCEndpoint;
  return proto.dcrwalletgui.AppConfiguration.RPCEndpoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dcrwalletgui.AppConfiguration.RPCEndpoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dcrwalletgui.AppConfiguration.RPCEndpoint}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setHostname(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPort(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUsername(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setCertFileName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setCertBlob(value);
      break;
    case 7:
      var value = /** @type {!proto.dcrwalletgui.AppConfiguration.Network} */ (reader.readEnum());
      msg.setNetwork(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dcrwalletgui.AppConfiguration.RPCEndpoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dcrwalletgui.AppConfiguration.RPCEndpoint} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHostname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPort();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getCertFileName();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getCertBlob();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getNetwork();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional string hostname = 1;
 * @return {string}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.getHostname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.setHostname = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional uint32 port = 2;
 * @return {number}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.getPort = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.setPort = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string username = 3;
 * @return {string}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.getUsername = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.setUsername = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string password = 4;
 * @return {string}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.setPassword = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string cert_file_name = 5;
 * @return {string}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.getCertFileName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.setCertFileName = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string cert_blob = 6;
 * @return {string}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.getCertBlob = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.setCertBlob = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional Network network = 7;
 * @return {!proto.dcrwalletgui.AppConfiguration.Network}
 */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.getNetwork = function() {
  return /** @type {!proto.dcrwalletgui.AppConfiguration.Network} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/** @param {!proto.dcrwalletgui.AppConfiguration.Network} value */
proto.dcrwalletgui.AppConfiguration.RPCEndpoint.prototype.setNetwork = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional RPCEndpoint dcrd_host = 1;
 * @return {?proto.dcrwalletgui.AppConfiguration.RPCEndpoint}
 */
proto.dcrwalletgui.AppConfiguration.prototype.getDcrdHost = function() {
  return /** @type{?proto.dcrwalletgui.AppConfiguration.RPCEndpoint} */ (
    jspb.Message.getWrapperField(this, proto.dcrwalletgui.AppConfiguration.RPCEndpoint, 1));
};


/** @param {?proto.dcrwalletgui.AppConfiguration.RPCEndpoint|undefined} value */
proto.dcrwalletgui.AppConfiguration.prototype.setDcrdHost = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.dcrwalletgui.AppConfiguration.prototype.clearDcrdHost = function() {
  this.setDcrdHost(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.dcrwalletgui.AppConfiguration.prototype.hasDcrdHost = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated RPCEndpoint dcrwallet_hosts = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.dcrwalletgui.AppConfiguration.RPCEndpoint>}
 */
proto.dcrwalletgui.AppConfiguration.prototype.getDcrwalletHostsList = function() {
  return /** @type{!Array.<!proto.dcrwalletgui.AppConfiguration.RPCEndpoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dcrwalletgui.AppConfiguration.RPCEndpoint, 2));
};


/** @param {!Array.<!proto.dcrwalletgui.AppConfiguration.RPCEndpoint>} value */
proto.dcrwalletgui.AppConfiguration.prototype.setDcrwalletHostsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.dcrwalletgui.AppConfiguration.RPCEndpoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dcrwalletgui.AppConfiguration.RPCEndpoint}
 */
proto.dcrwalletgui.AppConfiguration.prototype.addDcrwalletHosts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.dcrwalletgui.AppConfiguration.RPCEndpoint, opt_index);
};


proto.dcrwalletgui.AppConfiguration.prototype.clearDcrwalletHostsList = function() {
  this.setDcrwalletHostsList([]);
};


goog.object.extend(exports, proto.dcrwalletgui);
