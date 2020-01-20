import { grpc } from "@improbable-eng/grpc-web";
import * as jspb from "google-protobuf";

import { WalletService } from '../proto/api_pb_service';
import * as api_pb from "../proto/api_pb";



import {
    PingRequest,
    AccountsRequest,
    TransactionNotificationsRequest,
    TransactionNotificationsResponse,
    AccountsResponse,
    PingResponse,
    GetTransactionsResponse,
    GetTransactionsRequest,
    BestBlockResponse,
    BestBlockRequest,
    GetTicketsResponse,
    GetTicketsRequest,
    BalanceRequest,
    BalanceResponse
} from '../proto/api_pb';
import { ServiceDefinition, UnaryMethodDefinition, MethodDefinition } from "@improbable-eng/grpc-web/dist/typings/service";
import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";
import { InvokeRpcOptions } from "@improbable-eng/grpc-web/dist/typings/invoke";
import { Code } from "@improbable-eng/grpc-web/dist/typings/Code";
import { Metadata } from "@improbable-eng/grpc-web/dist/typings/metadata";
import { Client } from "@improbable-eng/grpc-web/dist/typings/client";



const transport = grpc.WebsocketTransport();
const wsHost = "https://localhost:8443"


interface GrpcInvokePropsInterface {
    onMessage: (res: ProtobufMessage) => void,
    onEnd: (code: Code, message: string, trailers: Metadata) => void,
    onHeaders?: (headers: Metadata) => void
}

export function grpcInvoke(
    service: MethodDefinition<ProtobufMessage, ProtobufMessage>,
    request: ProtobufMessage,
    p: GrpcInvokePropsInterface){

    const props: InvokeRpcOptions<ProtobufMessage, ProtobufMessage> = {
        host: wsHost,
        request: request,
        onEnd: p.onEnd,
        onMessage: p.onMessage,
        onHeaders: p.onHeaders
    }
    return grpc.invoke(service, props);
}

export function getGrpcClient(method: MethodDefinition<ProtobufMessage, ProtobufMessage>): Client<ProtobufMessage, ProtobufMessage> {
    return grpc.client(method, {
        host: wsHost,
        transport: transport
    });
}