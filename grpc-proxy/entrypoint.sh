#!/bin/bash


grpcwebproxy \
    --backend_addr=$BACKEND_ADDRESS \
    --backend_tls \
    --backend_tls_noverify \
    --backend_tls_ca_files $BACKEND_TLS_CA_FILES \
    --allow_all_origins \
    --run_http_server \
    --run_tls_server \
    --use_websockets \
    --server_bind_address 0.0.0.0 \
    --server_tls_cert_file $SERVER_TLS_CERT_FILE \
    --server_tls_key_file $SERVER_TLS_KEY_FILE