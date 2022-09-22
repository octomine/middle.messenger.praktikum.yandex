import Block, { TBlockProps } from '../../../../../../components/common/block';
import { Indexed } from '../../../../../../store';

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
    const { optionsClick, img } = this.props;
    this.children.avatar = new Avatar({ block: 'chat_header', modifiers: 's', img });
    this.children.options = new Button({
      modifiers: 'options',
      events: {
        click: optionsClick,
      },
    });
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    const { img: oldImg } = oldProps;
    const { img } = newProps;
    if (img !== oldImg) {
      this.children.avatar.setProps({ img });
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
