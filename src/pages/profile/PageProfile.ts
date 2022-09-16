import Block, { TBlockProps } from '../../components/common/block';

import tmpl from './tmpl.hbs';
import Button from '../../components/button';
import ListLink from './components/list-link';
import ListProfile from './components/list-profile';
import ListInput from './components/list-input';
import Avatar from './components/avatar';
import Router from '../../router/Router';
import { connect, Indexed } from '../../store';
import ControllerUser from '../../controllers/user';
import { PROFILE_FIELDS } from '../../consts';

const withUser = connect((state: Indexed) => {
  const { user } = state;
  const fields = Object.keys(PROFILE_FIELDS).reduce<Indexed>((res: Indexed, key) => {
    return user[key] ? { ...res, [key]: user[key] } : res;
  }, {});
  return { fields };
});

const FIELDS = [
  { name: 'email', title: 'Почта' },
  { name: 'login', title: 'Логин' },
  { name: 'first_name', title: 'Имя' },
  { name: 'second_name', title: 'Фамилия' },
  { name: 'display_name', title: 'Имя в чате' },
  { name: 'phone', title: 'Телефон' },
];

interface SettingsProps extends TBlockProps {
  edit: boolean;
  password: boolean;
}

class PageProfile extends Block<SettingsProps> {
  controller: ControllerUser;

  constructor(props: SettingsProps = { edit: false, password: false }) {
    super(props);
    this.controller = new ControllerUser();
  }

  async init() {
    this.children.back = new Button({
      modifiers: 'arrow_left',
      events: {
        click: () => Router.go('/messenger'), // лучше back, но разве можно попасть сюда не с /messenger?
      },
    });

    this.children.avatar = new Avatar({});

    this.children.list = new (withUser(ListProfile))({ modifiers: 'titled' });
    this.children.buttons = this.getButtons(this.changeSettings.bind(this), this.changePassword.bind(this));

    this.children.chageSettings = new (withUser(ListInput))({ block: 'profile' });
    this.children.changePassword = new ListInput({
      block: 'profile',
      fields: [
        { name: 'oldPassword', title: 'Старый пароль', isPassword: true },
        { name: 'newPassword', title: 'Новый пароль', isPassword: true },
        { title: 'Повторите новый пароль', isPassword: true, isEqual: 'newPassword' },
      ],
    });
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
    });
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
      this.controller.changeProfile(this.children.chageSettings.collect());
    }
    this.editMode = false;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

export default PageProfile;
