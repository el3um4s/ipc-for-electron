export interface APIChannels {
  nameAPI: string;
  validSendChannel: SendChannels;
  validReceiveChannel: string[];
}

export interface SendChannels {
  [key: string]: (...args: unknown[]) => unknown; // Function
}
