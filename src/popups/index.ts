import PopupWrapper from '../wrappers/popup-wrapper';

import { render } from '../utils/render';
import Button from '../components/button';
import LineForm from '../wrappers/form-wrapper/components/list-form/elements/line-form/LineForm';

const ctx = {
  1: {
    title: {
      txt: 'Загрузите файл',
    },
    custom: new Button({
      label: 'Выбрать файл на компьютере',
      modifiers: 'link',
    }),
    button: 'Поменять',
  },
  2: {
    title: {
      txt: 'Загрузите файл',
    },
    custom: new Button({
      label: 'Выбрать файл на компьютере',
      modifiers: 'link',
    }),
    button: 'Поменять',
    footer: 'Нужно выбрать файл',
  },
  3: {
    title: {
      txt: 'Ошибка, попробуйте ещё раз',
      modifiers: 'error',
    },
    custom: new Button({
      label: 'Выбрать файл на компьютере',
      modifiers: 'link',
    }),
    button: 'Поменять',
  },
  4: {
    title: {
      txt: 'Файл загружен',
    },
    message: 'pic11.jpg',
    button: 'Поменять',
  },
  5: {
    title: {
      txt: 'Добавить пользователя',
    },
    custom: new LineForm({
      name: 'login',
      title: 'Логин',
      placeholder: 'Логин',
    }),
    button: 'Добавить',
  },
  6: {
    title: {
      txt: 'Удалить пользователя',
    },
    custom: new LineForm({
      name: 'login',
      title: 'Логин',
      placeholder: 'Логин',
      value: 'VoPup',
    }),
    button: 'Удалить',
  },
};

window.addEventListener('DOMContentLoaded', () => {
  let n = location.hash.replace('#', '');
  n = ctx[n] ? n : '1';

  const popup = new PopupWrapper(ctx[n]);

  render('.main', popup);
});
