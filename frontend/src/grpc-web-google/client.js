/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const { PingRequest,
	TransactionNotificationsRequest } = require('./proto/api_pb.js');
const { WalletServiceClient } = require('./proto/api_grpc_web_pb.js');
const grpc = {};
grpc.web = require('grpc-web');

var walletService = new WalletServiceClient('https://localhost:8443', null, null);

function checkGrpcStatusCode(status) {
	if (status.code != grpc.web.StatusCode.OK) {
		console.log(status);
	}
}
function ping() {
	var unaryRequest = new PingRequest();
	var call = walletService.ping(unaryRequest,
		{ "custom-header-1": "value1" },
		function (err, response) {
			if (err) {
				console.log("err", err.message, err.code, err);
			} else {
				setTimeout(function () {
					console.log(response)
				}, 500);
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


function txNotifications() {
	var streamingRequest = new TransactionNotificationsRequest();
	var stream = walletService.transactionNotifications(streamingRequest,
		{ "deadline": "5456987" });

	stream.on('data', function (response) {
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


ping();
txNotifications();