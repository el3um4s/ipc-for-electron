# IPC for Electron

A package to simplify the communication between renderer and node js in Electron applications

NPM link: [@el3um4s/ipc-for-electron](https://www.npmjs.com/package/@el3um4s/ipc-for-electron)

### Install and use the package

To use the package in a project:

```bash
npm i @el3um4s/ipc-for-electron
```

and then in a file:

```ts
import { IPC, generateContextBridge } from "@el3um4s/ipc-for-electron";
```

### How to add a new API

Use IPC to create a new API for the renderer process:

```ts
import { IPC, SendChannels } from "@el3um4s/ipc-for-electron";
import { BrowserWindow } from "electron";

const nameAPI = "helloWorld";

// to Main
const validSendChannel: SendChannels = {
  requestHello: requestHello,
};

// from Main
const validReceiveChannel: string[] = ["getHello"];

const systemInfo = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
});

export default helloWorld;

// Enter here the functions for ElectronJS

function requestHello(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  const result = {
    name: "John",
    message: "Hello",
  };
  mainWindow.webContents.send("getHello", result);
}
```

### Add the API to the context bridge

Add the api to the context bridge to use it in the renderer process. In the `preload.ts` file:

```ts
import { generateContextBridge } from "@el3um4s/ipc-for-electron";
import helloWorld from "./helloWorld";

const listAPI = [helloWorld];

generateContextBridge(listAPI, "ipc");
```

### Use the API from the renderer

In the renderer process, use the API:

```ts
globalThis.ipc.helloWorld.send("requestHello", null);

globalThis.ipc.helloWorld.receive("getHello", async (data) => {
  const { name, message } = data;
  console.log(message, name);
  //   Hello John
});
```

### API Prebuilt

**System Info**: _Allow the renderer to get information about the version of Electron, Chrome and NodeJS_

- GitHub: [el3um4s/ipc-for-electron-system-info](https://github.com/el3um4s/ipc-for-electron-system-info) - [el3um4s/renderer-for-electron-system-info](https://github.com/el3um4s/renderer-for-electron-system-info)
- NPM: [@el3um4s/ipc-for-electron-system-info](https://www.npmjs.com/package/@el3um4s/ipc-for-electron-system-info) - [@el3um4s/renderer-for-electron-system-info](https://www.npmjs.com/package/@el3um4s/renderer-for-electron-system-info)

**Window Controls**: _Allow the renderer to close, minimize and maximize the window_

- GitHub: [el3um4s/ipc-for-electron-window-controls](https://github.com/el3um4s/ipc-for-electron-window-controls) - [el3um4s/renderer-for-electron-window-controls](https://github.com/el3um4s/renderer-for-electron-window-controls)
- NPM: [@el3um4s/ipc-for-electron-window-controls](https://www.npmjs.com/package/@el3um4s/ipc-for-electron-window-controls) - [@el3um4s/renderer-for-electron-window-controls](https://www.npmjs.com/package/@el3um4s/renderer-for-electron-window-controls)

**Chokidar**: _Allow the renderer to use [chokidar](https://www.npmjs.com/package/chokidar) (Minimal and efficient cross-platform file watching library)_

- GitHub: [el3um4s/ipc-for-electron-chokidar](https://github.com/el3um4s/ipc-for-electron-chokidar) - [el3um4s/renderer-for-electron-chokidar](https://github.com/el3um4s/renderer-for-electron-chokidar)
- NPM: [@el3um4s/ipc-for-electron-chokidar](https://www.npmjs.com/package/@el3um4s/ipc-for-electron-chokidar) - [@el3um4s/renderer-for-electron-chokidar](https://www.npmjs.com/package/@el3um4s/renderer-for-electron-chokidar)

**Auto Updater**: _Allow the renderer to update electron apps via [electron-updater](https://www.npmjs.com/package/electron-updater)_

- GitHub: [el3um4s/ipc-for-electron-auto-updater](https://github.com/el3um4s/ipc-for-electron-auto-updater) - [el3um4s/renderer-for-electron-auto-updater](https://github.com/el3um4s/renderer-for-electron-auto-updater)
- NPM: [@el3um4s/ipc-for-electron-auto-updater](https://www.npmjs.com/package/@el3um4s/ipc-for-electron-auto-updater) - [@el3um4s/renderer-for-electron-auto-updater](https://www.npmjs.com/package/@el3um4s/renderer-for-electron-auto-updater)
  **Auto Updater**: _Allow the renderer to update electron apps via [electron-updater](https://www.npmjs.com/package/electron-updater)_

**Electron Window**: _Create a window with optional autoupdater and browserview_

- GitHub: [el3um4s/electron-window](https://github.com/el3um4s/electron-window) - [el3um4s/renderer-electron-window-browser-view](https://github.com/el3um4s/renderer-electron-window-browser-view)
- NPM: [@el3um4s/electron-window](https://www.npmjs.com/package/@el3um4s/electron-window) - [@el3um4s/renderer-electron-window-browser-view](https://www.npmjs.com/package/@el3um4s/renderer-electron-window-browser-view)
