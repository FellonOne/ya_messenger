import { ComponentClass } from '../src/scripts/Framework/Router/Route';
import { Router } from '../src/scripts/Framework/Router/Router';
import { fakeHistory } from './mock/fakeHistory';
import { FakeRoute } from './mock/fakeRoute';

describe('### Testing Router Module', () => {
  it('TEST #1: register Route and find them', () => {
    const router = new Router(fakeHistory, FakeRoute, {} as Window);
    router.use('/test', {} as ComponentClass, {}, []);
    expect(router.getRoute('/test')).toBeTruthy();
  });

  it('TEST #2: testing back functional', () => {
    const router = new Router(fakeHistory, FakeRoute);
    router.use('/', {} as ComponentClass, {}, []);
    router.use('/test', {} as ComponentClass, {}, []);
    router.start();

    const mockBackFn = jest.fn();
    const mockForwardFn = jest.fn();

    fakeHistory.back = mockBackFn;

    router.go('/test');
    router.back();

    expect(mockBackFn.mock.calls.length).toBe(1);
  });

  it('TEST #3: testing forward functional', () => {
    const router = new Router(fakeHistory, FakeRoute);
    router.use('/', {} as ComponentClass, {}, []);
    router.use('/test', {} as ComponentClass, {}, []);
    router.start();

    const mockForwardFn = jest.fn();

    fakeHistory.forward = mockForwardFn;

    router.go('/test');
    router.forward();

    expect(mockForwardFn.mock.calls.length).toBe(1);
  })
});
