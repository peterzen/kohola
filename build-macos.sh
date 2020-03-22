#!/bin/sh

APP="build/dcrwalletgui.app"
mkdir -p $APP/Contents/{MacOS,Resources}
cp app/icons/icon.icns $APP/Contents/Resources/icon.icns
cd frontend && yarn install && yarn build && cd ..
cp -R frontend/dist app/www 
cd app 
pkger -include /www
go build -o ../$APP/Contents/MacOS/dcrwalletgui
# rm pkged.go && rm -R www
cd ..
cat > $APP/Contents/Info.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleExecutable</key>
	<string>dcrwalletgui</string>
	<key>CFBundleIconFile</key>
	<string>icon.icns</string>
	<key>CFBundleIdentifier</key>
	<string>com.peterzen.dcrwalletgui</string>
</dict>
</plist>
EOF

find $APP
