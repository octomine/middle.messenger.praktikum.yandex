import { render } from '../../utils/render';

import ProfileWrapper from '../../wrappers/profile-wrapper';
import List from './components/list';
import ListLink from './components/list-link';
import ListInput from './components/list-input';
import Button from '../../components/button';
import ButtonArrow from '../../components/button-arrow';

const title = {
  profile: "Профиль",
  change: "Изменить профиль",
  changePassword: "Сменить пароль",
};

window.addEventListener('DOMContentLoaded', () => {
  const ctxProfile = {
    title: "Восилей",
    content: new List({
      fields: [
        { key: "Почта", value: "adf@mail.ru" },
        { key: "Логин", value: "adf" },
        { key: "Имя", value: "Восилей" },
        { key: "Фамилия", value: "Пупкен" },
        { key: "Имя в чате", value: "VoPup" },
        { key: "Телефон", value: "+7 (321) 987-45-33" },
      ]
    }),
    footer: new ListLink({
      fields: [
        { label: "Изменить данные" },
        { label: "Изменить пароль" },
        { label: "Выйти", modifiers: "alert" },
      ]
    }),
  };

  const ctxChange = {
    content: new ListInput({
      fields: [
        { name: "email", key: "Почта", value: "adf@mail.ru" },
        { name: "login", key: "Логин", value: "adf" },
        { name: "first_name", key: "Имя", value: "Восилей" },
        { name: "second_name", key: "Фамилия", value: "Пупкен" },
        { name: "display_name", key: "Имя в чате", value: "VoPup" },
        { name: "phone", key: "Телефон", value: "+7 (321) 987-45-33" },
      ]
    }),
    footer: new Button({
      label: "Сохранить",
      block: "footer",
      events: {
        click: () => profile.check()
      }
    }),
  }

  const ctxPassword = {
    content: new ListInput({
      fields: [
        { name: "oldPassword", key: "Старый пароль", value: "asdasdfasdf", isPassword: true },
        { name: "newPassword", key: "Новый пароль", value: "adf", isPassword: true },
        { key: "Повторите новый пароль", isPassword: true, isEqual: "newPassword" },
      ],
    }),
    footer: new Button({
      label: "Сохранить",
      block: "footer",
      events: {
        click: () => profile.check()
      }
    })
  };

  let ctx = ctxProfile;
  let type = location.hash.replace("#", "");
  switch (type) {
    case "change":
      ctx = ctxChange;
      document.title = title.change;
      break;
    case "changePassword":
      ctx = ctxPassword;
      document.title = title.changePassword;
      break;
    default:
      document.title = title.profile;
  }

  const btn = new ButtonArrow({
    modifiers: "left",
    events: {
      click: () => console.log('BACK!!1')
    }
  });
  const profile = new ProfileWrapper(ctx);

  render('.main', btn);
  render('.main', profile);
});
