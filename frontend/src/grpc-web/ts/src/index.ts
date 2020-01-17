import {grpc} from "@improbable-eng/grpc-web";
import {VersionService, WalletService} from "../_proto/api_pb_service";
import {VersionRequest, AccountsRequest} from "../_proto/api_pb";

declare const USE_TLS: boolean;
const host = USE_TLS ? "https://localhost:8443" : "http://localhost:9090";


function getVersion() {
  const versionRequest = new VersionRequest();
  grpc.unary(VersionService.Version, {
    request: versionRequest,
    host: host,
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
    host: host,
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

getVersion();
getAccounts();
