import Block, { TBlockProps } from '../../components/common/block';
import Button from '../../components/button';
import '../../components/label';

import tmpl from './tmpl.hbs';
import { connect, Indexed } from '../../store';
import ControllerPopup from '../../controllers/ControllerPopup';
import LineForm from '../form-wrapper/components/list-form/elements/line-form';

interface PopupProps extends TBlockProps {
  button: string,
}

class PopupWrapper extends Block<PopupProps> {
  constructor(props: PopupProps) {
    super(props);
  }

  init() {
    // TODO: эт, канеш, отсюда убрать и сделать по-нормальному
    this.children.custom = new LineForm({
      name: 'login',
      title: 'Логин',
      placeholder: 'Логин',
    });

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
      action(this.children.custom.value);
    } else {
      ControllerPopup.hide();
    }
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    const { button: oldButton } = oldProps;
    const { button } = newProps;
    if (button !== oldButton) {
      this.children.button.setProps({ label: button });
    }

    return true;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

const withPopup = connect((state: Indexed): Indexed => {
  const { popup } = state;
  const {
    isShown, title, button, action,
  } = popup;
  const modifiers = isShown ? '' : 'hidden';
  return {
    modifiers, title, button, action,
  };
});

export default withPopup(PopupWrapper);
