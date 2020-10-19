import { Component } from '../src/scripts/Framework/Component';

describe('### Component testing', () => {
  it('TEST #1: render function was called', () => {
    const mockRender = jest.fn((): string => {
      return '';
    });
    Component.prototype.render = mockRender;
    const comp = new Component();

    expect(mockRender.mock.calls.length).toBe(1);
  });

  it('TEST #2: Set props and invoke render', () => {
    const mockRender = jest.fn((): string => {
      return '';
    });

    Component.prototype.render = mockRender;
    const comp = new Component();
    comp.setProps({});

    expect(mockRender.mock.calls.length).toBe(2);
  });
});
