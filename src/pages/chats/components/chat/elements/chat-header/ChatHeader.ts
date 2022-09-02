import Block from "../../../../../../components/common/block";
import Avatar from "../../../../../../components/avatar";
import Button from "../../../../../../components/button";

import tmpl from './tmpl.hbs';

interface ChaHeaderProps {
  optionsClick: () => void,
}

export default class ChatHeader extends Block<ChaHeaderProps> {
  constructor(props: ChaHeaderProps) {
    super(props);
  }

  init() {
    const { optionsClick } = this.props;

    this.children.avatar = new Avatar({ block: 'chat_header', modifiers: 's' });
    this.children.options = new Button({
      modifiers: "options",
      events: {
        click: optionsClick
      }
    })
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
