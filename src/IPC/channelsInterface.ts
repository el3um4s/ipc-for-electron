export interface APIChannels {
  nameAPI: string;
  validSendChannel: SendChannels;
  validReceiveChannel: string[];
}

export interface SendChannels {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function;
}
