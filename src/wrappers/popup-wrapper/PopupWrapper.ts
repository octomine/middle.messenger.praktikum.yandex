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
  flags: Record<string, boolean>;
  inputTitle: string;
  button: string;
  action: (val?: string | FormData | null) => void;
  onUser: (id: string) => void;
}

class PopupWrapper extends Block<PopupProps> {
  constructor(props: PopupProps) {
    super(props);
  }

  init() {
    this.children.clsButton = new Button({
      modifiers: 'close',
      events: {
        click: () => ControllerPopup.hide(),
      },
    });

    const { inputTitle: title } = this.props;
    this.children.input = new LineForm({
      name: 'input',
      title,
      placeholder: title,
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

  get button(): Button {
    return this.children.button as Button;
  }

  get input(): LineForm {
    return this.children.input as LineForm;
  }

  get upload(): Upload {
    return this.children.upload as Upload;
  }

  get list(): ListUsers {
    return this.children.list as ListUsers;
  }

  performAction() {
    const { action } = this.props;
    if (action) {
      const { flags: { input, upload } } = this.props;
      if (input) {
        action(this.input.value);
      } else if (upload) {
        action(this.upload.formData);
      } else {
        action();
      }
    } else {
      ControllerPopup.hide();
    }
  }

  onUser(id: string): void {
    const { onUser } = this.props;
    if (onUser) {
      onUser(id);
    }
  }

  componentDidUpdate(oldProps: PopupProps, newProps: PopupProps): boolean {
    const { button: oldButton, users: oldUsers, inputTitle: oldInputTitle } = oldProps;
    const { button, users, inputTitle } = newProps;
    if (button !== oldButton) {
      this.button.setProps({ label: button });
    }
    if (inputTitle !== oldInputTitle) {
      this.input.setProps({
        title: inputTitle,
        placeholder: inputTitle,
      });
    }
    if (users !== oldUsers) {
      this.list.setProps({ fields: users });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

const withPopup = connect((state: Indexed): PopupProps => {
  const { popup } = state;
  const {
    isShown, flag, title, inputTitle, button, action, onUser, users,
  } = popup as PopupProps;
  const modifiers = isShown ? '' : 'hidden';
  const flags = FLAGS.reduce((res, name) => ({ ...res, [name]: name === flag }), {});
  return {
    modifiers, flags, title, inputTitle, button, action, onUser, users,
  };
});

export default withPopup(PopupWrapper);
