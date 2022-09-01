import { render } from './utils/render'

import LineForm from './wrappers/form-wrapper/components/list-form/elements/line-form/LineForm';

const ctx = {
  title: 'title',
  placeholder: 'test',
  error:'!!!'
}

window.addEventListener('DOMContentLoaded', () => {
  const input = new LineForm(ctx);

  render('.main', input);
});
