#!/bin/sh

set -e

APP=kohola
APPDIR=build/${APP}

mkdir -p $APPDIR
mkdir -p $APPDIR/usr/bin
mkdir -p $APPDIR/usr/share/applications
mkdir -p $APPDIR/usr/share/icons/hicolor/1024x1024/apps
mkdir -p $APPDIR/usr/share/icons/hicolor/256x256/apps
mkdir -p $APPDIR/DEBIAN

if [ "$NO_FRONTEND_BUILD" = "" ]; then
	cd frontend && yarn install && yarn build && cd ..
	cp -R frontend/dist app/www 
fi
cd app 
pkger -include /www
go build -o ../$APPDIR/usr/bin/$APP
rm -rf pkged.go www
cd ..

cp app/icons/icon.png $APPDIR/usr/share/icons/hicolor/1024x1024/apps/${APP}.png
cp app/icons/icon.png $APPDIR/usr/share/icons/hicolor/256x256/apps/${APP}.png

#todo set proper Version
cat > $APPDIR/usr/share/applications/${APP}.desktop << EOF
[Desktop Entry]
Version=1.1
Type=Application
Name=$APP
Exec=$APP
Icon=$APP
Terminal=false
StartupWMClass=Lorca
EOF

#todo set proper Version
cat > $APPDIR/DEBIAN/control << EOF
Package: ${APP}
Version: 1.1-0
Depends: libwebkit2gtk-4.0-37
Section: base
Priority: optional
Architecture: amd64
Maintainer: peter@froggle.org
Description: This application is a multi platform Decred wallet application for power users having existing wallets running in secure environments.
EOF

dpkg-deb --build $APPDIR
