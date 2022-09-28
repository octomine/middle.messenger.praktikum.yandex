import Block from '../../../../components/common/block';

import List, { ListProps } from '../../../../components/list';

import LineChat, { LineChatProps } from './elements/line-chat/LineChat';
import Search from './elements/search';

import tmpl from './tmpl.hbs';
import { connect, Indexed } from '../../../../store';
import ControllerChats, { CurrentChatData } from '../../../../controllers/ControllerChats';
import ControllerResources from '../../../../controllers/ControllerResources';
import { getTime } from '../../../../utils/time';
import Button from '../../../../components/button';
import ControllerPopup from '../../../../controllers/ControllerPopup';

export class ListChats extends List {
  private _selected: string | null = null;

  constructor(props: ListProps) {
    super(props);
  }

  set selected(val: string | null) {
    this._selected = val;
  }

  get selected(): string | null {
    return this._selected;
  }

  init() {
    this.children.search = new Search({});
    this.children.addChat = new Button({
      modifiers: 'add_chat',
      events: {
        click: () => ControllerPopup.addChat(),
      },
    });

    super.init();
  }

  line(field: LineChatProps): Block<unknown> {
    const events = {
      click: () => this.select(line.id),
    };
    const line = new LineChat({ ...field, events });
    return line;
  }

  getCurrentChat(): CurrentChatData {
    const { fields } = this.props;
    return fields.filter(({ id }) => id === this.selected)[0]; // id все уникальные
  }

  select(id: string) {
    const { fields } = this.children;
    fields.forEach((field: LineChat) => {
      if (field.id === id) {
        field.isSelected = true;
        this.selected = field.chatID;
      } else {
        field.isSelected = false;
      }
    });
    ControllerChats.selectChat(this.getCurrentChat());
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

const withChats = connect((state: Indexed) => {
  const { chats }: Record<string, CurrentChatData[]> = state;
  const fields = chats.map(({
    id, avatar, title, last_message, unread_count: unread,
  }) => ({
    id,
    title,
    img: ControllerResources.resourcePath(avatar),
    time: last_message ? getTime(last_message.time) : '',
    msg: last_message ? last_message.content : 'Нет сообщений',
    unread,
  }));
  return { fields };
});

export default withChats(ListChats);
