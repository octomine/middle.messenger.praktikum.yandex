import List from './components/list';
import { render } from './utils/render'

const ctx = {
  fields: [
    { label: '1' },
    { label: '22' },
    { label: '333' },
    { label: '4444' },
    { label: '55555' },
  ]
}

window.addEventListener('DOMContentLoaded', () => {
  const list = new List(ctx);

  render('.main', list);
});
