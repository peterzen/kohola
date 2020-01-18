const EventEmitter = require('events');

const { PingRequest, AccountsRequest,
	TransactionNotificationsRequest, AccountNotificationsRequest } = require('./proto/api_pb.js');
const { WalletServiceClient } = require('./proto/api_grpc_web_pb.js');
const grpc = {};
grpc.web = require('grpc-web');

const walletService = new WalletServiceClient('https://localhost:8443', null, null);

function checkGrpcStatusCode(status) {
	if (status.code != grpc.web.StatusCode.OK) {
		console.error(status);
	}
}

class Datastore extends EventEmitter {

	constructor() {
		super();
		this.transactions = {};
		this.accounts = {};
		this.ping();
		this.getAccounts();
		this.txNotifications();

		this.on('change:transactions', this.onTxNotification);
	}

	onTxNotification = () => {
		this.getAccounts();
	}

	ping = () => {
		const _this = this;
		var unaryRequest = new PingRequest();
		var call = walletService.ping(unaryRequest,
			{ "custom-header-1": "value1" },
			function (err, response) {
				if (err) {
					_this.emit('ping:disconnect', response.toObject());
					console.log("err", err.message, err.code, err);
				} else {
					_this.emit('ping:connect', response.toObject());
					console.log('ping', response.toObject())
				}
			});
		call.on('status', function (status) {
			checkGrpcStatusCode(status);
			if (status.metadata) {
				console.log("Received metadata");
				console.log(status.metadata);
			}
		});
	}

	getAccounts = () => {
		const _this = this;

		const unaryRequest = new AccountsRequest();
		const call = walletService.accounts(unaryRequest,
			{ "custom-header-1": "value1" },
			function (err, response) {
				if (err) {
					console.err("err", err.message, err.code, err);
				} else {
					_this.accounts = response;
					_this.emit('change:accounts', response.toObject());
					console.log('accounts', response.toObject());
				}
			});
		call.on('status', function (status) {
			checkGrpcStatusCode(status);
			if (status.metadata) {
				console.log("Received metadata");
				console.log(status.metadata);
			}
		});
	}

	accountNotifications = () => {

		const streamingRequest = new AccountNotificationsRequest();
		const stream = walletService.accountNotifications(streamingRequest,
			{ "custom-header-1": "value1" },
		);

		stream.on('data', function (response) {
			this.account = response;
			this.emit('change:accounts', response.toObject());
			console.log('received data', response.toObject());
		});

		stream.on('error', function (err) {
			console.error('error', err);
		});

		stream.on('end', function () {
			console.log("stream end signal received");
		});

		stream.on('status', function (status) {
			checkGrpcStatusCode(status);
			if (status.metadata) {
				console.log("Received metadata");
				console.log(status.metadata);
			}
		});
	}


	txNotifications() {

		const _this = this;

		const streamingRequest = new TransactionNotificationsRequest();
		const stream = walletService.transactionNotifications(streamingRequest,
			{ "custom-header-1": "value1" },
		);

		stream.on('data', function (response) {
			_this.transactions = response;
			_this.emit('change:transactions', response.toObject());
			console.log('received data', response.toObject());
		});

		stream.on('error', function (err) {
			console.error('error', err);
		});

		stream.on('end', function () {
			console.log("stream end signal received");
		});

		stream.on('status', function (status) {
			checkGrpcStatusCode(status);
			if (status.metadata) {
				console.log("Received metadata");
				console.log(status.metadata);
			}
		});
	}


}

let datastore = null;

const DatastoreFactory = {

	getInstance: function () {
		if (datastore != null) {
			return datastore;
		}
		datastore = new Datastore();
		return datastore;
	}
}


export default DatastoreFactory;