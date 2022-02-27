# Stage I - frontend node build
FROM debian:bullseye-slim AS nodebuilder

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y -q --no-install-recommends \
	ca-certificates \
	curl \
	git 

SHELL ["/bin/bash", "--login", "-c"]

RUN curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN nvm install v12 && nvm use v12
RUN npm install --global yarn

COPY ./frontend/package.json /src/frontend/
COPY ./frontend/yarn.lock /src/frontend/
WORKDIR /src/frontend/
RUN yarn install

COPY ./frontend/  /src/frontend/
RUN yarn --verbose build

# stage II - Go build & packaging
FROM golang:1.17-buster AS golangbuild

RUN go install github.com/markbates/pkger/cmd/pkger@v0.17.1

RUN apt-get update && apt-get install -y -q --no-install-recommends \
	gcc \
	libwebkit2gtk-4.0-dev \
	libgtk-3-dev \
	libglib2.0-dev \
	libappindicator3-dev

WORKDIR /src
#COPY --from=nodebuilder /root/deps ./deps
COPY ./app/ ./app/
COPY --from=nodebuilder /src/frontend/dist/ ./app/www/
COPY ./build-linux.sh .

ENV NO_FRONTEND_BUILD yes
RUN ./build-linux.sh

# WORKDIR /src/app/
# RUN go build -v -tags=legacy_appindicator

