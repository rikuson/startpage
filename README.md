# Startpage

**DO NOT USE ON PUBLIC SERVER!**

## Install

### macOS - Safari

Apache is installed by default on macOS.  
Run this command to enable auto-start.

```shell
sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

Build and deploy frontend resources.

```shell
cd frontend
vim config.json # Add configuration file
npm run build
sudo rsync -r build/ /Library/WebServer/Documents/
```

Set `http://localhost` as startpage.

### macOS - Chrome

Build frontend resources.

```shell
cd frontend
vim config.json # Add configuration file
npm run build
```

Chrome doesn't provide the way to customize newtab.  
To change newtab page, install `frontend/build` as extension.

## Configuration

```json
{
  "todoist": {
    "apiToken": "<YOUR API TOKEN>"
  }
}
```
