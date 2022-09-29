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
  private _isSelected: boolean = false;

  constructor(props: LineChatProps) {
    super(props);
  }

  get chatID(): string {
    return this.props.id;
  }

  set isSelected(val: boolean) {
    this._isSelected = val;
    this.element?.querySelector('.chat').classList.toggle('chat-selected', val);
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  init() {
    const { img } = this.props;
    this.children.avatar = new Avatar({ block: 'chat', img });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
