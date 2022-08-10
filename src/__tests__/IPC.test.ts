import { IPC } from "../index";

describe("IPC", () => {
  test("Init IPC", () => {
    const ipc = new IPC({
      nameAPI: "test",
      validSendChannel: {
        test: () => {
          // console.log("test");
        },
      },
      validReceiveChannel: ["test"],
    });
    expect(ipc.channels.nameAPI).toBe("test");
  });
});
