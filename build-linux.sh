#!/bin/sh

./prep-repo.sh

APP=dcrwalletgui
APPDIR=build/${APP}

mkdir -p $APPDIR/usr/bin
mkdir -p $APPDIR/usr/share/applications
mkdir -p $APPDIR/usr/share/icons/hicolor/1024x1024/apps
mkdir -p $APPDIR/usr/share/icons/hicolor/256x256/apps
mkdir -p $APPDIR/DEBIAN

cd frontend && yarn install && yarn build && cd ..
cp -R frontend/dist app/www 
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
Version=1.0
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
Version: 1.0-0
Section: base
Priority: optional
Architecture: amd64
Maintainer: peterzen <peterzen@gmail.com>
Description: This application is a multi platform Decred wallet application for power users having existing wallets running in secure environments.
EOF

dpkg-deb --build $APPDIR
