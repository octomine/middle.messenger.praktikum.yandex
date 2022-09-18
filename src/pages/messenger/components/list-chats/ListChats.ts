import Block from '../../../../components/common/block';

import List, { ListProps } from '../../../../components/list';

import LineChat, { LineChatProps } from './elements/line-chat/LineChat';
import Search from './elements/search';

import tmpl from './tmpl.hbs';
import { connect, Indexed } from '../../../../store';
import { isEqual } from '../../../../utils/isEqual';

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

  select(id: string | null) {
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

  componentDidUpdate({ fields: oldFields }: Indexed, { fields }: Indexed): boolean {
    if (isEqual(oldFields as Indexed, fields as Indexed)) {
      return false;
    }
    const l = Math.max(fields.length, this.children.fields.length);

    for (let i: number = 0; i < l; i++) {
      const field = this.children.fields[i];
      if (field) {
        if (fields[i]) {
          field.setProps(field[i]);
        } else {
          field.hide();
        }
      } else {
        this.children.fields.push(this.line(fields[i]));
      }
    }
    return true;
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
