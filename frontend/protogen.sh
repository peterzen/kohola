#!/bin/bash

PROTO_DIR=./src/proto

protoc  \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    -I=$PROTO_DIR $PROTO_DIR/api.proto \
    --js_out=import_style=commonjs,binary:$PROTO_DIR \
    --ts_out=service=grpc-web:$PROTO_DIR 

# protoc \
#     --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
#     -I=$PROTO_DIR $PROTO_DIR/api.proto   \
#     --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$PROTO_DIR

