import { contextBridge, ipcRenderer } from "electron";
import { APIChannels } from "./channelsInterface";
import IPC from "./IPC";

interface APIContextBridge {
  send: (channel: string, data: unknown) => void;
  receive: (channel: string, func: (arg0: unknown) => void) => void;
}

export default function generateContextBridge(listIPC: IPC[], apiKey = "ipc") {
  const listChannels: APIChannels[] = [];
  listIPC.forEach((el) => {
    listChannels.push(el.channels);
  });

  const listAPI: { [key: string]: APIContextBridge } = {};

  listChannels.forEach((el) => {
    const api = getContextBridge(el);
    const name = el.nameAPI;
    listAPI[name] = { ...api };
  });

  contextBridge.exposeInMainWorld(apiKey, {
    ...listAPI,
  });
}

function getContextBridge(obj: APIChannels): APIContextBridge {
  const { validReceiveChannel } = { ...obj };
  const validSendChannel = getArrayOfValidSendChannel(obj);

  return {
    send: (channel: string, data: unknown) => {
      // whitelist channels
      if (validSendChannel.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel: string, func: (arg0: unknown) => void) => {
      if (validReceiveChannel.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args: [unknown]) => {
          func(...args);
        });
      }
    },
  };
}

function getArrayOfValidSendChannel(obj: APIChannels): string[] {
  const { validSendChannel } = { ...obj };
  const result: string[] = Object.keys(validSendChannel);
  return result;
}
