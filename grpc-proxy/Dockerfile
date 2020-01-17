# build image
FROM golang:1.13

WORKDIR /root

ENV GOPATH=/go
RUN curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
RUN git clone https://github.com/improbable-eng/grpc-web.git $GOPATH/src/github.com/improbable-eng/grpc-web
WORKDIR $GOPATH/src/github.com/improbable-eng/grpc-web
RUN dep ensure  && \
    go install ./go/grpcwebproxy

# deployment image
FROM debian:10

WORKDIR /root

COPY --from=0 /go/bin/ /usr/bin/

COPY entrypoint.sh .
COPY localhost.* ./

# CMD ["./entrypoint.sh"]