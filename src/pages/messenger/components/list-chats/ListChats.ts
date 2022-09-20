import Block from '../../../../components/common/block';

import List, { ListProps } from '../../../../components/list';

import LineChat, { LineChatProps } from './elements/line-chat/LineChat';
import Search from './elements/search';

import tmpl from './tmpl.hbs';
import { connect, Indexed } from '../../../../store';
import ControllerChats from '../../../../controllers/ControllerChats';

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
    super.init();
  }

  line(field: LineChatProps): Block<unknown> {
    const events = {
      click: () => this.select(line.id),
    };
    const line = new LineChat({ ...field, events });
    return line;
  }

  getCurrentChat(): Indexed {
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
  const { chats: fields } = state;
  return { fields };
});

export default withChats(ListChats);
