import Block, { TBlockProps } from '../../components/common/block';
import Button from '../../components/button';
import Router from '../../router/Router';

import { connect, Indexed } from '../../store';
import { FIELDS_PROFILE } from '../../consts';

import ListLink from './components/list-link';
import ListProfile from './components/list-profile';
import ListInput from './components/list-input';
import Avatar from './components/avatar';

import tmpl from './tmpl.hbs';
import ControllerAuth from '../../controllers/ControllerAuth';
import ControllerUser from '../../controllers/ControllerUser';
import { isEqual, PlainObject } from '../../utils/is-equal';
import ControllerPopup from '../../controllers/ControllerPopup';
import ControllerResources from '../../controllers/ControllerResources';
import { SignupData } from '../../api/APIAuth';
import { PasswordData } from '../../api/APIUser';

interface SettingsProps extends TBlockProps {
  edit: boolean;
  password: boolean;
  avatar: string | null;
  settings: Record<string, any>[];
}

class PageProfile extends Block<SettingsProps> {
  constructor(props: SettingsProps = {
    edit: false, password: false, avatar: null, settings: [],
  }) {
    super(props);
  }

  init() {
    this.children.back = new Button({
      modifiers: 'arrow_left',
      events: {
        click: () => this.onBack(),
      },
    });
    this.children.avatar = new Avatar({
      img: ControllerResources.resourcePath(this.props.avatar),
      events: { click: () => this.onAvatar() },
    });

    const { settings: fields } = this.props;
    this.children.list = new ListProfile({ modifiers: 'titled', fields });
    this.children.buttons = this.getButtons(
      this.changeSettings.bind(this),
      this.changePassword.bind(this),
      this.logout.bind(this),
    );

    this.children.chageSettings = new ListInput({ block: 'profile', fields });
    this.children.changePassword = new ListInput({
      block: 'profile',
      fields: [
        { name: 'oldPassword', title: 'Старый пароль', isPassword: true },
        { name: 'newPassword', title: 'Новый пароль', isPassword: true },
        { title: 'Повторите новый пароль', isPassword: true, isEqual: 'newPassword' },
      ],
    });
    this.children.button = new Button({
      title: 'Сохранить',
      block: 'footer',
      events: { click: this.saveChanges.bind(this) },
    });
  }

  get editMode(): boolean {
    return this.props.edit;
  }

  get isPassword(): boolean {
    return this.props.password;
  }

  get list(): ListProfile {
    return this.children.list as ListProfile;
  }

  get settings(): ListInput {
    return this.children.chageSettings as ListInput;
  }

  get password(): ListInput {
    return this.children.changePassword as ListInput;
  }

  get avatar(): Avatar {
    return this.children.avatar as Avatar;
  }

  getButtons(changeSettings: () => void, changePassword: () => void, logout: () => void) {
    return new ListLink({
      block: 'footer',
      fields: [
        { title: 'Изменить данные', click: changeSettings },
        { title: 'Изменить пароль', click: changePassword },
        { title: 'Выйти', modifiers: 'alert', click: logout },
      ],
    });
  }

  onBack() {
    if (this.editMode) {
      ControllerUser.closeEdit();
    } else {
      Router.go('/messenger'); // лучше back, но разве можно попасть сюда не с /messenger?
    }
  }

  onAvatar() {
    ControllerPopup.addAvatar();
  }

  changeSettings() {
    ControllerUser.editSettings();
  }

  changePassword() {
    ControllerUser.editPassword();
  }

  logout() {
    ControllerAuth.logout();
  }

  saveChanges() {
    let req;
    if (this.isPassword) {
      req = this.password.collect() as PasswordData;
      ControllerUser.password(req);
    } else {
      req = this.settings.collect() as SignupData;
      ControllerUser.profile(req);
    }
  }

  componentDidUpdate(oldProps: SettingsProps, newProps: SettingsProps): boolean {
    const { settings: oldFields } = oldProps;
    const { settings: fields } = newProps;
    if (!isEqual(oldFields as PlainObject, fields as PlainObject)) {
      this.list.setProps({ fields });
      this.settings.setProps({ fields });
    }
    this.avatar.setProps({ img: ControllerResources.resourcePath(this.props.avatar) });
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

const withUser = connect((state: Indexed) => {
  const { user: { edit, password, settings: userSettings } } = state;
  const settings = Object.keys(FIELDS_PROFILE)
    .map<Indexed>((name) => ({ name, value: userSettings[name], ...FIELDS_PROFILE[name] }));
  return {
    edit,
    password,
    id: userSettings.id,
    avatar: userSettings.avatar,
    userName: userSettings.first_name,
    settings,
  };
});

export default withUser(PageProfile as typeof Block);
