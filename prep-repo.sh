#!/usr/bin/env bash

cat > deps/dcrwallet/rpc/walletrpc/go.mod <<EOF
module github.com/decred/dcrwallet/rpc/walletrpc

go 1.13

require (
	github.com/golang/protobuf v1.3.5
	google.golang.org/grpc v1.28.0
)
EOF

