import { render } from '../../utils/render';

import ProfileWrapper from '../../wrappers/profile-wrapper';
import ListProfile from '../../wrappers/profile-wrapper/components/list-profile';
import ListInput from '../../wrappers/profile-wrapper/components/list-input';
import ListLink from '../../wrappers/profile-wrapper/components/list-link';
import Button from '../../components/button';

const title = {
  profile: 'Профиль',
  change: 'Изменить профиль',
  changePassword: 'Сменить пароль',
};

window.addEventListener('DOMContentLoaded', () => {
  const ctxProfile = {
    title: 'Восилей',
    content: new ListProfile({
      modifiers: 'titled',
      fields: [
        { title: 'Почта', value: 'adf@mail.ru' },
        { title: 'Логин', value: 'adf' },
        { title: 'Имя', value: 'Восилей' },
        { title: 'Фамилия', value: 'Пупкен' },
        { title: 'Имя в чате', value: 'VoPup' },
        { title: 'Телефон', value: '+7 (321) 987-45-33' },
      ],
    }),
    footer: new ListLink({
      block: 'footer',
      fields: [
        { label: 'Изменить данные' },
        { label: 'Изменить пароль' },
        { label: 'Выйти', modifiers: 'alert' },
      ],
    }),
  };

  const ctxChange = {
    content: new ListInput({
      block: 'profile',
      fields: [
        { name: 'email', title: 'Почта', value: 'adf@mail.ru' },
        { name: 'login', title: 'Логин', value: 'adf' },
        { name: 'first_name', title: 'Имя', value: 'Восилей' },
        { name: 'second_name', title: 'Фамилия', value: 'Пупкен' },
        { name: 'display_name', title: 'Имя в чате', value: 'VoPup' },
        { name: 'phone', title: 'Телефон', value: '+7 (321) 987-45-33' },
      ],
    }),
    footer: new Button({
      label: 'Сохранить',
      block: 'footer',
      events: {
        click: () => profile.submit(),
      },
    }),
  };

  const ctxPassword = {
    content: new ListInput({
      block: 'profile',
      fields: [
        {
          name: 'oldPassword', title: 'Старый пароль', value: 'asdasdfasdf', isPassword: true,
        },
        {
          name: 'newPassword', title: 'Новый пароль', value: 'adf', isPassword: true,
        },
        { title: 'Повторите новый пароль', isPassword: true, isEqual: 'newPassword' },
      ],
    }),
    footer: new Button({
      label: 'Сохранить',
      block: 'footer',
      events: {
        click: () => profile.submit(),
      },
    }),
  };

  let ctx = ctxProfile;
  const type = location.hash.replace('#', '');
  switch (type) {
    case 'change':
      ctx = ctxChange;
      document.title = title.change;
      break;
    case 'changePassword':
      ctx = ctxPassword;
      document.title = title.changePassword;
      break;
    default:
      document.title = title.profile;
  }

  const btn = new Button({
    modifiers: 'arrow_left',
    events: {
      click: () => console.log('BACK!!1'),
    },
  });
  const profile = new ProfileWrapper(ctx);

  render('.main', btn);
  render('.main', profile);
});
