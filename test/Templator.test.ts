import { StringTemplator } from '../src/scripts/Framework/Templator/Templator';

const tmpl = `
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;

describe('### Testing Templator', () => {
  it('TEST #1: templator result must be not null', () => {
    const templator = new StringTemplator(tmpl, []).compile({}).tree;
    expect(templator !== null).toBeTruthy();
  });

  it('TEST #2: templator should be create root element', () => {
    const templator = new StringTemplator(tmpl, []).compile({}).tree;
    if (templator === null) throw Error('templator null');
    expect(templator.childrens.length).toBe(1);
  });

  it('TEST #3: correct create children', () => {
    const templator = new StringTemplator(tmpl, []).compile({}).tree;
    if (templator === null) throw Error('templator null');

    expect(templator.childrens[0].childrens.length).toBe(3);
  });

  it('TEST #4: Create HTML nodes and Text nodes', () => {
    const tmpl = `
      <div>
        <div></div>
        Hello :)
        <span></span>
        Test :)
      </div>
    `;
    const templator = new StringTemplator(tmpl, []).compile({}).tree;
    if (templator === null) throw Error('templator null');

    expect(templator.childrens[0].childrens.length).toBe(4);
  });

  it('TEST #5: Unknown HTML tag', () => {
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
