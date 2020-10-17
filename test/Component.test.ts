import { Component } from '../src/scripts/Framework/Component';

describe('### Component testing', () => {
  it('TEST #1: Set props and invoke render', () => {
    const mockRender = jest.fn((): string => {
      return '';
    });
    Component.prototype.render = mockRender;
    const comp = new Component();

    expect(mockRender.mock.calls.length).toBe(1);
    comp.setProps({});

    expect(mockRender.mock.calls.length).toBe(2);
  });
});
