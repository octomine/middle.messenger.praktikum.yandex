import Block, { TBlockProps } from '../../../../../../components/common/block';
import ControllerMessenger from '../../../../../../controllers/ControllerMessenger';
import Input from '../../../../../../components/input';
import Button from '../../../../../../components/button';

import tmpl from './tmpl.hbs';

interface ChatInputProps extends TBlockProps {
  attachClick: () => void,
}

export default class ChatInput extends Block<ChatInputProps> {
  constructor(props: ChatInputProps) {
    super(props);
  }

  init() {
    const { attachClick } = this.props;

    this.children.attach = new Button({
      modifiers: 'attach',
      events: {
        click: attachClick,
      },
    });

    this.children.input = new Input({
      placeholder: 'Сообщение',
      modifiers: 'chat',
      events: {
        keyup: (evt: KeyboardEvent) => {
          if (evt.key === 'Enter') {
            this.send();
          }
        },
      },
    });

    this.children.button = new Button({
      modifiers: 'arrow_right',
      events: {
        click: () => this.send(),
      },
    });
  }

  send() {
    const { value } = this.children.input as Input;
    if (value && value.length > 0) {
      this.children.input.setProps({ value: '' }); // TODO: наверно делать это через контроллеp
      ControllerMessenger.sendMessage(value);
    }
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
