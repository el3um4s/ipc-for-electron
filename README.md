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

- GitHub: [el3um4s/ipc-for-electron-system-info](https://github.com/el3um4s/ipc-for-electron-system-info)
- NPM: [@el3um4s/ipc-for-electron-system-info](https://www.npmjs.com/package/@el3um4s/ipc-for-electron-system-info)
