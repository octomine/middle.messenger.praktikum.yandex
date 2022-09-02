import Block from "../../../../../../components/common/block";
import Input from "../../../../../../components/input";
import Button from "../../../../../../components/button";

import tmpl from './tmpl.hbs';

interface ChatInputProps {

}

export default class ChatInput extends Block<ChatInputProps> {
  constructor(props: ChatInputProps) {
    super(props);
  }

  init() {
    this.children.attach = new Button({
      modifiers: 'attach',
      events: {
        click: () => console.log('ATTACH!!1')
      }
    });

    this.children.input = new Input({
      placeholder: 'Сообщение', modifiers: 'chat',
      events: {
        keyup: (evt: KeyboardEvent) => {
          if (evt.key === 'Enter') {
            this.send();
          }
        }
      }
    });

    this.children.button = new Button({
      modifiers: 'arrow_right',
      events: {
        click: () => this.send()
      }
    })
  }

  send() {
    const { value } = this.children.input;
    if (value && value.length > 0) {
      console.log('SEND!!1');
      console.log(value);
      this.children.input.setProps({ value: '' });
    }
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
