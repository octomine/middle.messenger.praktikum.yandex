import Block from "../../../../components/base";

import tmpl from './tmpl.hbs';
import ChatInput from "./elements/chat-input/ChatInput";
import ChatHeader from "./elements/chat-header/ChatHeader";

interface ChatProps {

}

export default class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  init() {
    this.children.header = new ChatHeader({});
    this.children.input = new ChatInput({});
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
