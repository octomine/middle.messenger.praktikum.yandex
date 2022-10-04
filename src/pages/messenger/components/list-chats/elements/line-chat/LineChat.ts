import Block, { TBlockProps } from '../../../../../../components/common/block';
import Avatar from '../../../../../../components/avatar/Avatar';

import tmpl from './tmpl.hbs';

export interface LineChatProps extends TBlockProps {
  isSelected: false;
  chatID: string;
  id: string;
  title: string;
  unread_count: number;
  last_message: object;
}

export default class LineChat extends Block<LineChatProps> {
  constructor(props: LineChatProps) {
    super(props);
  }

  get chatID(): string {
    return this.props.id;
  }

  init() {
    const { img } = this.props;
    this.children.avatar = new Avatar({ block: 'chat', img });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
