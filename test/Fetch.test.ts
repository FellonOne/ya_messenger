import { Fetch } from "../src/scripts/Framework/Fetch/Fetch";
import { FakeAPI } from "./mock/FakeAPI";

describe("### Testing Fetch Class", () => {
  it("TEST #1: create POST request", () => {
    const fetch = new Fetch((FakeAPI as unknown) as new () => XMLHttpRequest);

    const fakeSend = jest.fn();
    const fakeOpen = jest.fn();

    FakeAPI.prototype.open = fakeOpen;
    FakeAPI.prototype.send = fakeSend;

    fetch.post("result", {
      data: {
        myData: 5,
      },
    });

    expect(fakeOpen.mock.calls.length).toBe(1);
    expect(fakeSend.mock.calls.length).toBe(1);
  });
});
