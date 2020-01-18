import { grpc } from "@improbable-eng/grpc-web";
import { VersionService, WalletService } from "../_proto/api_pb_service";
import { VersionRequest, AccountsRequest, AccountNotificationsRequest, AccountNotificationsResponse, TransactionNotificationsRequest, TransactionNotificationsResponse } from "../_proto/api_pb";


const transport = grpc.WebsocketTransport();
const wsHost = "https://localhost:8443"


function getVersion() {
	const versionRequest = new VersionRequest();
	grpc.unary(VersionService.Version, {
		request: versionRequest,
		host: wsHost,
		onEnd: res => {
			console.log('result', res);
			const { status, statusMessage, headers, message } = res;
			console.log("onEnd.status", status, statusMessage);
			console.log("onEnd.headers", headers);
			if (status === grpc.Code.OK && message) {
				console.log("onEnd.message", message.toObject());
			}
		}
	});
}


function getAccounts() {
	const accountRequest = new AccountsRequest();
	grpc.unary(WalletService.Accounts, {
		request: accountRequest,
		host: wsHost,
		onEnd: res => {
			console.log('result', res);
			const { status, statusMessage, headers, message } = res;
			console.log("onEnd.status", status, statusMessage);
			console.log("onEnd.headers", headers);
			if (status === grpc.Code.OK && message) {
				console.log("onEnd.message", message.toObject());
			}
		}
	});
}




function getAccountNotifications() {
	const request = new AccountNotificationsRequest();

	const client = grpc.client(WalletService.AccountNotifications, {
		host: wsHost,
		transport: transport
	});
	client.onHeaders((headers: grpc.Metadata) => {
		console.log("onHeaders", headers);
	});
	client.onMessage((message: AccountNotificationsResponse) => {
		console.log("accountnotifications", message.toObject());
	});
	client.onEnd((status: grpc.Code, statusMessage: string, trailers: grpc.Metadata) => {
		console.log("onEnd", status, statusMessage, trailers);
	});

	client.start(new grpc.Metadata({ "HeaderTestKey1": "ClientValue1" }));
	client.send(request);
}


function getTxNotifications() {
	const request = new TransactionNotificationsRequest();

	const client = grpc.client(WalletService.TransactionNotifications, {
		host: wsHost,
		transport: transport
	});
	client.onHeaders((headers: grpc.Metadata) => {
		console.log("onHeaders", headers);
	});
	client.onMessage((message: TransactionNotificationsResponse) => {
		console.log("txnotifications", message.toObject());
	});
	client.onEnd((status: grpc.Code, statusMessage: string, trailers: grpc.Metadata) => {
		console.log("onEnd", status, statusMessage, trailers);
	});

	client.start(new grpc.Metadata({ "HeaderTestKey1": "ClientValue1" }));
	client.send(request);
}


getVersion();
getAccounts();
getAccountNotifications();
getTxNotifications();