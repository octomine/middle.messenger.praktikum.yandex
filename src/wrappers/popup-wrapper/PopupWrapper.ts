import Block, { TBlockProps } from '../../components/common/block';
import Button from '../../components/button';
import '../../components/label';

import tmpl from './tmpl.hbs';
import { connect, Indexed } from '../../store';
import ControllerPopup from '../../controllers/ControllerPopup';
import LineForm from '../form-wrapper/components/list-form/elements/line-form';
import ListUsers from './components/list-users';
import Upload from './components/upload';

const FLAGS = ['input', 'list', 'upload', 'info'];

interface PopupProps extends TBlockProps {
  button: string,
}

class PopupWrapper extends Block<PopupProps> {
  constructor(props: PopupProps) {
    super(props);
  }

  init() {
    this.children.input = new LineForm({
      name: 'login',
      title: 'Логин',
      placeholder: 'Логин',
    });

    this.children.list = new ListUsers({ fields: [], onUser: this.onUser.bind(this) });

    this.children.upload = new Upload({});

    const { button: label } = this.props;
    this.children.button = new Button({
      label,
      events: {
        click: () => this.performAction(),
      },
    });
  }

  performAction() {
    const { action } = this.props;
    if (action) {
      const { flags: { input, upload } } = this.props;
      if (input) {
        action(this.children.input.value); // TODO: чё-т как-то тут не очень
      }
      if (upload) {
        action(this.children.upload.formData);
      }
    } else {
      ControllerPopup.hide();
    }
  }

  onUser(id: string) {
    const { onUser } = this.props;
    if (onUser) {
      onUser(id);
    }
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    const { button: oldButton, users: oldUsers } = oldProps;
    const { button, users } = newProps;
    if (button !== oldButton) {
      this.children.button.setProps({ label: button });
    }
    if (users !== oldUsers) {
      this.children.list.setProps({ fields: users });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

const withPopup = connect((state: Indexed): Indexed => {
  const { popup } = state;
  const {
    isShown, flag, title, button, action, onUser, users,
  } = popup;
  const modifiers = isShown ? '' : 'hidden';
  const flags = FLAGS.reduce((res, name) => ({ ...res, [name]: name === flag }), {});
  return {
    modifiers, flags, title, button, action, onUser, users,
  };
});

export default withPopup(PopupWrapper);
