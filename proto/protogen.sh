#!/bin/bash

PROTO_DIR=.
JS_OUTPUT_DIR=../frontend/src/proto
GO_OUTPUT_DIR=../app/walletgui

protoc  \
    --plugin=protoc-gen-ts=../frontend/node_modules/.bin/protoc-gen-ts \
    -I=$PROTO_DIR $PROTO_DIR/dcrwalletgui.proto \
    --js_out=import_style=commonjs,binary:$JS_OUTPUT_DIR \
    --ts_out=service=grpc-web:$JS_OUTPUT_DIR \
	--go_out=$GO_OUTPUT_DIR

protoc  \
    --plugin=protoc-gen-ts=../frontend/node_modules/.bin/protoc-gen-ts \
    -I=$PROTO_DIR $PROTO_DIR/api.proto \
    --js_out=import_style=commonjs,binary:$JS_OUTPUT_DIR \
    --ts_out=service=grpc-web:$JS_OUTPUT_DIR \

