import Block, { TBlockProps } from '../../components/common/block';

import tmpl from './tmpl.hbs';
import Button from '../../components/button';
import ListLink from './components/list-link';
import ListProfile from './components/list-profile';
import ListInput from './components/list-input';
import Avatar from './components/avatar';

interface SettingsProps extends TBlockProps {
  edit: boolean;
  password: boolean;
}

export default class PageProfile extends Block<SettingsProps> {
  constructor(props: SettingsProps = { edit: false, password: false }) {
    super(props);
  }

  init() {
    this.children.back = new Button({ modifiers: 'arrow_left' });

    this.children.avatar = new Avatar({});

    this.children.list = new ListProfile({
      modifiers: 'titled',
      fields: [
        { title: 'Почта', value: 'adf@mail.ru' },
        { title: 'Логин', value: 'adf' },
        { title: 'Имя', value: 'Восилей' },
        { title: 'Фамилия', value: 'Пупкен' },
        { title: 'Имя в чате', value: 'VoPup' },
        { title: 'Телефон', value: '+7 (321) 987-45-33' },
      ],
    })
    this.children.buttons = this.getButtons(this.changeSettings.bind(this), this.changePassword.bind(this));

    this.children.chageSettings = new ListInput({
      block: 'profile',
      fields: [
        { name: 'email', title: 'Почта', value: 'adf@mail.ru' },
        { name: 'login', title: 'Логин', value: 'adf' },
        { name: 'first_name', title: 'Имя', value: 'Восилей' },
        { name: 'second_name', title: 'Фамилия', value: 'Пупкен' },
        { name: 'display_name', title: 'Имя в чате', value: 'VoPup' },
        { name: 'phone', title: 'Телефон', value: '+7 (321) 987-45-33' },
      ],
    });
    this.children.changePassword = new ListInput({
      block: 'profile',
      fields: [
        { name: 'oldPassword', title: 'Старый пароль', isPassword: true },
        { name: 'newPassword', title: 'Новый пароль', isPassword: true },
        { title: 'Повторите новый пароль', isPassword: true, isEqual: 'newPassword' },
      ],
    })
    this.children.button = new Button({ label: 'Сохранить', block: 'footer', events: { click: this.saveChanges.bind(this) } });
  }

  set editMode(val: boolean) {
    this.setProps({ edit: val });
  }

  set isPassword(val: boolean) {
    this.setProps({ password: val });
  }

  get isPassword(): boolean {
    return this.props.password;
  }

  getButtons(changeSettings: () => void, changePassword: () => void) {
    return new ListLink({
      block: 'footer',
      fields: [
        { label: 'Изменить данные', click: changeSettings },
        { label: 'Изменить пароль', click: changePassword },
        { label: 'Выйти', modifiers: 'alert' },
      ],
    })
  }

  changeSettings() {
    this.isPassword = false;
    this.editMode = true;
  }

  changePassword() {
    this.isPassword = true;
    this.editMode = true;
  }

  saveChanges() {
    if (this.isPassword) {
      console.log(this.children.changePassword.collect());
    } else {
      console.log(this.children.chageSettings.collect());
    }
    this.editMode = false;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
