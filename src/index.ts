import { render } from './utils/render'

import LineForm from './wrappers/form-wrapper/components/list-form/elements/line-form/LineForm';
import Button from './components/button';

const ctx = {
  modifiers: 'arrow_right'
}

window.addEventListener('DOMContentLoaded', () => {
  const btn1 = new Button({ modifiers: 'arrow_right' });
  const btn2 = new Button({ modifiers: 'arrow_left' });
  const btn3 = new Button({ modifiers: 'attach' });

  render('.main', btn1);
  render('.main', btn2);
  render('.main', btn3);
});
