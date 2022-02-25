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

WORKDIR /root

COPY .  .

WORKDIR /root/frontend/
RUN yarn && yarn build

# stage II - Go build & packaging
FROM golang:1.17-bullseye

RUN apt-get update && apt-get install -y -q --no-install-recommends \
	gcc \
	libwebkit2gtk-4.0-dev \
	libgtk-3-dev \
	libcairo2-dev \
	libglib2.0-dev \
	libayatana-appindicator3-dev \
	libappindicator3-0.1-cil-dev

RUN go get -v github.com/markbates/pkger/cmd/pkger

WORKDIR /root
#COPY --from=nodebuilder /root/deps ./deps
COPY --from=nodebuilder /root/app ./app
COPY --from=nodebuilder /root/frontend/dist/ ./app/www/
COPY --from=nodebuilder /root/build-linux.sh .

ENV NO_FRONTEND_BUILD yes
RUN ./build-linux.sh

