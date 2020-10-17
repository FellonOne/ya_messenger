import { Fetch } from '../src/scripts/Framework/Fetch/Fetch';
import { FakeAPI } from './mock/FakeAPI';

describe('### Testing Fetch Class', () => {
  it('TEST #1: create POST request', async () => {
    const fetch = new Fetch((FakeAPI as unknown) as new () => XMLHttpRequest);

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
    } catch (error) {
      expect(error.error).toBe('timeout');
    }

    expect(fakeOpen.mock.calls.length).toBe(1);
    expect(fakeSend.mock.calls.length).toBe(1);
  });
});
