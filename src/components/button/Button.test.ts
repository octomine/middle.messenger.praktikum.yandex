import { expect } from 'chai';
import Button from '.';

describe('Button', () => {
  it(('should render'), () => {
    new Button({});
  });

  it('element should return <button>', () => {
    const btn = new Button({});
    const el = btn.getContent();
    expect(el).to.be.instanceof(window.HTMLButtonElement);
  });
});
