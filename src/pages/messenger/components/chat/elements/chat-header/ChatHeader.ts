import Block, { TBlockProps } from '@components/common/block';

import Avatar from '@components/avatar';
import Button from '@components/button';

import tmpl from './tmpl.hbs';

interface ChatHeaderProps extends TBlockProps {
  optionsClick: () => void,
}

export default class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super(props);
  }

  init() {
    const { optionsClick, img } = this.props;
    this.children.avatar = new Avatar({ block: 'chat_header', modifiers: 's', img });
    this.children.options = new Button({
      modifiers: 'options',
      events: {
        click: optionsClick,
      },
    });
  }

  get avatar(): Avatar {
    return this.children.avatar as Avatar;
  }

  componentDidUpdate(oldProps: ChatHeaderProps, newProps: ChatHeaderProps): boolean {
    const { img: oldImg } = oldProps;
    const { img } = newProps;
    if (img !== oldImg) {
      this.avatar.setProps({ img });
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
