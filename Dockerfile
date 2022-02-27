# Stage I - frontend node build
FROM debian:bullseye-slim AS nodebuilder

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y -q --no-install-recommends \
	ca-certificates \
	python \
	curl \
	git 

SHELL ["/bin/bash", "--login", "-c"]

RUN curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN nvm install v16 && nvm use v16
RUN npm install --global yarn

COPY ./frontend/package.json /src/frontend/
COPY ./frontend/yarn.lock /src/frontend/
WORKDIR /src/frontend/
RUN yarn install

COPY ./frontend/  /src/frontend/
RUN yarn --verbose build

# Stage II - Go build & packaging
FROM golang:1.17-bullseye AS golangbuild

RUN go install github.com/markbates/pkger/cmd/pkger@v0.17.1

RUN apt-get update && apt-get install -y -q --no-install-recommends \
	gcc \
	libgtk-3-dev \
	libglib2.0-dev \
	libwebkit2gtk-4.0-dev \
	libayatana-appindicator3-dev

# Workaround to get `getlantern/systray` to compile on Debian bullseye.  This is neccessary 
# until the dependency is fixed upstream.
RUN cp /usr/lib/x86_64-linux-gnu/pkgconfig/ayatana-appindicator3-0.1.pc /usr/lib/x86_64-linux-gnu/pkgconfig/appindicator3-0.1.pc

WORKDIR /src
COPY ./app/ ./app/
COPY --from=nodebuilder /src/frontend/dist/ ./app/www/
COPY ./build-linux.sh .

# expensive step to compile gotk3 - let docker cache
WORKDIR /src/app/
RUN go get -v

WORKDIR /src
ENV NO_FRONTEND_BUILD yes
RUN ./build-linux.sh
