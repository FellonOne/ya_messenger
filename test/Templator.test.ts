import { StringTemplator } from '../src/scripts/Framework/Templator/Templator';

describe('### Testing Templator', () => {
  it('TEST #1: create correct DOM tree', () => {
    const tmpl = `
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
    const templator = new StringTemplator(tmpl, []).compile({}).tree;

    expect(templator !== null).toBeTruthy();
    if (templator === null) throw Error('templatro null');

    expect(templator.childrens.length).toBe(1);
    expect(templator.childrens[0].childrens.length).toBe(3);
  });

  it('TEST #2: Create HTML nodes and Text nodes', () => {
    const tmpl = `
      <div>
        <div></div>
        Hello :)
        <span></span>
        Test :)
      </div>
    `;
    const templator = new StringTemplator(tmpl, []).compile({}).tree;

    expect(templator !== null).toBeTruthy();
    if (templator === null) throw Error('templatro null');

    expect(templator.childrens.length).toBe(1);
    expect(templator.childrens[0].childrens.length).toBe(4);
  });

  it('TEST #3: Unknown HTML tag', () => {
    const tmpl = `
      <div>
        <myUniqueTag>
      </div>
    `;
    try {
      new StringTemplator(tmpl, []).compile({});
    } catch (error) {
      expect(String(error.message).includes('myUniqueTag')).toBeTruthy();
    }
  });
});
