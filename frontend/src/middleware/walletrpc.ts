import { grpc } from "@improbable-eng/grpc-web";
import { MethodDefinition } from "@improbable-eng/grpc-web/dist/typings/service";
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
    p: GrpcInvokePropsInterface) {

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



export function grpcInvokerFactory(reqClassRef: MethodDefinition<ProtobufMessage, ProtobufMessage>) {

    return async function () {
        const req = new reqClassRef.requestType();
        const methodName = reqClassRef.methodName;

        return new Promise<ProtobufMessage>((resolve, reject) => {
            grpc.invoke(reqClassRef, {
                host: wsHost,
                request: req,
                onMessage: (message) => {
                    console.log(methodName, message.toObject());
                    resolve(message);
                },
                onEnd: (code: grpc.Code, message: any, headers) => {
                    if (code !== grpc.Code.OK) {
                        console.error(methodName, code, message, headers);
                        reject({
                            status: code,
                            msg: message
                        });
                    }
                }
            });
        });
    }
}
