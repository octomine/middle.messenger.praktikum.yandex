import Block, { TBlockProps } from '../../components/common/block';

import tmpl from './tmpl.hbs';
import Button from '../../components/button';
import ProfileWrapper from '../../wrappers/profile-wrapper';
import ListProfile from '../../wrappers/profile-wrapper/components/list-profile';
import ListLink from '../../wrappers/profile-wrapper/components/list-link';

const ctx = {
  title: 'Восилей',
  list: new ListProfile({
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
};

export default class PageProfile extends Block<TBlockProps> {
  constructor(props: TBlockProps = {}) {
    super(props);
  }

  init() {
    this.children.back = new Button({ modifiers: 'arrow_left' });

    const buttons = this.getButtons(this.changeSettings.bind(this), this.changePassword);
    const button = new Button({ label: 'Сохранить', block: 'footer' });
    this.children.profile = new ProfileWrapper({ ...ctx, buttons, button });
  }

  set editMode(val: boolean) {
    this.children.profile.setProps({ edit: val });
  }

  getButtons(change, changePassword) {
    return new ListLink({
      block: 'footer',
      fields: [
        {
          label: 'Изменить данные',
          click: change
        },
        {
          label: 'Изменить пароль',
          click: changePassword
        },
        { label: 'Выйти', modifiers: 'alert' },
      ],
    })
  }

  changeSettings() {
    console.log(this.children);
    this.children.button.setProps({ events: { click: () => this.saveSettings() } });
    this.editMode = true;
  }

  changePassword() {
    this.children.button.setProps({ events: { click: () => this.savePassword() } });
    this.editMode = true;
  }

  saveSettings() {
    console.log('settings');
    this.children.profile.setProps({ edit: false });
  }

  savePassword() {
    console.log('password');
    this.children.profile.setProps({ edit: false });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

//   const ctxChange = {
//     content: new ListInput({
//       block: 'profile',
//       fields: [
//         { name: 'email', title: 'Почта', value: 'adf@mail.ru' },
//         { name: 'login', title: 'Логин', value: 'adf' },
//         { name: 'first_name', title: 'Имя', value: 'Восилей' },
//         { name: 'second_name', title: 'Фамилия', value: 'Пупкен' },
//         { name: 'display_name', title: 'Имя в чате', value: 'VoPup' },
//         { name: 'phone', title: 'Телефон', value: '+7 (321) 987-45-33' },
//       ],
//     }),
//     footer: new Button({
//       label: 'Сохранить',
//       block: 'footer',
//       events: {
//         click: () => profile.submit(),
//       },
//     }),
//   };

//   const ctxPassword = {
//     content: new ListInput({
//       block: 'profile',
//       fields: [
//         {
//           name: 'oldPassword', title: 'Старый пароль', value: 'asdasdfasdf', isPassword: true,
//         },
//         {
//           name: 'newPassword', title: 'Новый пароль', value: 'adf', isPassword: true,
//         },
//         { title: 'Повторите новый пароль', isPassword: true, isEqual: 'newPassword' },
//       ],
//     }),
//     footer: new Button({
//       label: 'Сохранить',
//       block: 'footer',
//       events: {
//         click: () => profile.submit(),
//       },
//     }),
//   };
