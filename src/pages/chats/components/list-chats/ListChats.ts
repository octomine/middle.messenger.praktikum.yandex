import Block from '../../../../components/base';
import { TBlockProps } from '../../../../components/base/types';
import List, { ListProps } from '../../../../components/list';

import LineChat from './elements/line-chat/LineChat';
import Search from './elements/search';

import tmpl from './tmpl.hbs';

export default class ListChats extends List {
  _selected: string;

  constructor(props: ListProps) {
    super(props);
  }

  set selected(val: string) {
    this._selected = val;
  }

  get selected(): string {
    return this._selected;
  }

  init() {
    this.children.search = new Search({});
    super.init();
  }

  line(field: TBlockProps): Block<unknown> {
    field.events = {
      click: () => this.select(line.id)
    };
    const line = new LineChat(field)
    return line;
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
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
