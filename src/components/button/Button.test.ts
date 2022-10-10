import { expect } from 'chai';
// import sinon from 'sinon';
import Button from '.';

describe('Button', () => {
  it(('should render'), () => {
    new Button({});
  });

  it('element should return <button>', () => {
    const btn = new Button({});
    const el = btn.element;
    console.log('from test');
    console.log(el?.classList.length);
    expect(el).to.be.instanceof(window.HTMLButtonElement);
  });
});
