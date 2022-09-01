import Block from "../../../../../../components/base";

import tmpl from './tmpl.hbs';
import ButtonArrow from "../../../../../../components/button-arrow";
import ButtonAttach from "../button-attach/ButtonAttach";

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

    this.children.button = new ButtonArrow({
      events: {
        click: () => console.log('SEND!!1')
      }
    })
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
