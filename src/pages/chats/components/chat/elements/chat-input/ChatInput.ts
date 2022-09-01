import Block from "../../../../../../components/base";

import tmpl from './tmpl.hbs';
import ButtonArrow from "../../../../../../components/button-arrow";
import ButtonAttach from "../button-attach/ButtonAttach";
import Input from "../../../../../../components/input";

interface ChatInputProps {

}

export default class ChatInput extends Block<ChatInputProps> {
  constructor(props: ChatInputProps) {
    super(props);
  }

  init() {
    this.children.attach = new ButtonAttach({
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

    this.children.button = new ButtonArrow({
      events: {
        click: () => this.send()
      }
    })
  }

  send() {
    const { value } = this.children.input;
    if (value && value.length > 0) {
      console.log('SEND!!1');
      console.log(this.children.input.value);
      this.children.input.setProps({ value: '' });
    }
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
