import Block, { TBlockProps } from '../../components/common/block';
import Button from '../../components/button';
import Router from '../../router/Router';

import { connect, Indexed } from '../../store';
import { PROFILE_FIELDS } from '../../consts';

import ListLink from './components/list-link';
import ListProfile from './components/list-profile';
import ListInput from './components/list-input';
import Avatar from './components/avatar';

import tmpl from './tmpl.hbs';
import ControllerAuth from '../../controllers/ControllerAuth';

const withUser = connect((state: Indexed) => {
  const { user } = state;
  const fields = Object.keys(PROFILE_FIELDS)
    .map<Indexed>((name) => ({ name, value: user[name], ...PROFILE_FIELDS[name] }));
  return { fields };
});

interface SettingsProps extends TBlockProps {
  edit: boolean;
  password: boolean;
}

class PageProfile extends Block<SettingsProps> {
  constructor(props: SettingsProps = { edit: false, password: false, title: 'aaa' }) {
    super(props);
  }

  init() {
    this.children.back = new Button({
      modifiers: 'arrow_left',
      events: {
        click: () => this.onBack(),
      },
    });

    this.children.avatar = new Avatar({});

    this.children.list = new (withUser(ListProfile))({ modifiers: 'titled' });
    this.children.buttons = this.getButtons(
      this.changeSettings.bind(this),
      this.changePassword.bind(this),
      this.logout.bind(this));

    this.children.chageSettings = new (withUser(ListInput))({ block: 'profile' });
    this.children.changePassword = new ListInput({
      block: 'profile',
      fields: [
        { name: 'oldPassword', title: 'Старый пароль', isPassword: true },
        { name: 'newPassword', title: 'Новый пароль', isPassword: true },
        { title: 'Повторите новый пароль', isPassword: true, isEqual: 'newPassword' },
      ],
    });
    this.children.button = new Button({
      label: 'Сохранить',
      block: 'footer',
      events: { click: this.saveChanges.bind(this) }
    });
  }

  set editMode(val: boolean) {
    this.setProps({ edit: val });
  }

  get editMode(): boolean {
    return this.props.edit;
  }

  set isPassword(val: boolean) {
    this.setProps({ password: val });
  }

  get isPassword(): boolean {
    return this.props.password;
  }

  getButtons(changeSettings: () => void, changePassword: () => void, logout: () => void) {
    return new ListLink({
      block: 'footer',
      fields: [
        { label: 'Изменить данные', click: changeSettings },
        { label: 'Изменить пароль', click: changePassword },
        { label: 'Выйти', modifiers: 'alert', click: logout },
      ],
    });
  }

  onBack() {
    if (this.editMode) {
      this.editMode = false;
    } else {
      Router.go('/messenger'); // лучше back, но разве можно попасть сюда не с /messenger?
    }
  }

  changeSettings() {
    this.isPassword = false;
    this.editMode = true;
  }

  changePassword() {
    this.isPassword = true;
    this.editMode = true;
  }

  logout() {
    ControllerAuth.logout();
  }

  saveChanges() {
    if (this.isPassword) {
      console.log(this.children.changePassword.collect());
    } else {
      // this.controller.changeProfile(this.children.chageSettings.collect());
    }
    this.editMode = false;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

export default PageProfile;
