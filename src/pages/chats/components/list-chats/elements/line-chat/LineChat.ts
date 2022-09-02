import { getTime } from "../../../../../../utils/time";
import Block from "../../../../../../components/base";
import tmpl from './tmpl.hbs';
import Avatar from "../../../../../../components/avatar/Avatar";

interface LineChatProps {
  id: string,
  title: string,
  unread_count: number,
  last_message: object,
}

export default class LineChat extends Block<LineChatProps> {
  _isSelected: boolean = false;

  constructor(props: LineChatProps) {
    super(props);
  }

  get chatID(): string {
    return this.props.id;
  }

  set isSelected(val: boolean) {
    this._isSelected = val;
    this._element.querySelector('.chat').classList.toggle('chat-selected', val);
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  init() {
    this.children.avatar = new Avatar({ block: 'chat' });
  }

  render() {
    const { title, last_message: { content: msg, time }, unread_count: unread } = this.props;

    return this.compile(tmpl, { title, msg, time: getTime(time), unread });
  }
}
