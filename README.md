# Startpage

**DO NOT USE ON PUBLIC SERVER!**

## Install

### macOS

Apache is installed by default on macOS.  
Run this command to enable auto-start.

```shell
sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

Build and deploy frontend resources.

```shell
cd frontend
npm run build
sudo rsync -r build/ /Library/WebServer/Documents/
```
