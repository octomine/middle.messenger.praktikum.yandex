import { render } from '../../utils/render';
import Status from './components/status';

const ctx = {
  '404': {
    title: { txt: '404' },
    subtitle: { txt: 'Не туда попали', block: 'status' },
    link: { label: 'Назад к чатам' },
  },
  '500': {
    title: { txt: '500' },
    subtitle: { txt: 'Мы уже фиксим', block: 'status' },
    link: { label: 'Назад к чатам' },
  },
};

window.addEventListener('DOMContentLoaded', () => {
  let sts = location.hash.replace('#', '');
  sts = ctx[sts] ? sts : '404';
  document.title = sts;

  const status = new Status(ctx[sts]);

  render('.main', status);
});
