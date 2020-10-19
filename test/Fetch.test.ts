import { Fetch } from '../src/scripts/Framework/Fetch/Fetch';
import { FakeAPI } from './mock/FakeAPI';

describe('### Testing Fetch Class', () => {
  it('TEST #1: send method was called', async () => {
    const fetch = Fetch.setApi((FakeAPI as unknown) as new () => XMLHttpRequest);

    const fakeSend = jest.fn();
    const fakeOpen = jest.fn();

    FakeAPI.prototype.open = fakeOpen;
    FakeAPI.prototype.send = fakeSend;

    try {
      await fetch.post('result', {
        data: {
          myData: 5,
        },
        timeout: 1,
      });
    } catch (error) {}

    expect(fakeSend.mock.calls.length).toBe(1);
  });

  it('TEST #2: open method was called', async () => {
    const fetch = Fetch.setApi((FakeAPI as unknown) as new () => XMLHttpRequest);

    const fakeSend = jest.fn();
    const fakeOpen = jest.fn();

    FakeAPI.prototype.open = fakeOpen;
    FakeAPI.prototype.send = fakeSend;

    try {
      await fetch.post('result', {
        data: {
          myData: 5,
        },
        timeout: 1,
      });
    } catch (error) {}

    expect(fakeOpen.mock.calls.length).toBe(1);
  });
});
