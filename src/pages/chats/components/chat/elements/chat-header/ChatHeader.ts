import Block, { TBlockProps } from '../../../../../../components/common/block';
import Avatar from '../../../../../../components/avatar';
import Button from '../../../../../../components/button';

import tmpl from './tmpl.hbs';

interface ChatHeaderProps extends TBlockProps {
  optionsClick: () => void,
}

export default class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super(props);
  }

  init() {
    const { optionsClick } = this.props;

    this.children.avatar = new Avatar({ block: 'chat_header', modifiers: 's' });
    this.children.options = new Button({
      modifiers: 'options',
      events: {
        click: optionsClick
      }
    })
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
