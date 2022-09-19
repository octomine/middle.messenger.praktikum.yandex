import List, { ListProps } from '../../../../../../components/list';
import LineMessage from '../line-message';
import { TBlockProps } from '../../../../../../components/common/block';
import { connect, Indexed } from '../../../../../../store';
import { isEqual } from '../../../../../../utils/isEqual';

class ListMessages extends List {
  constructor(props: ListProps) {
    super({ ...props, block: 'chat_sheet' });
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
          field.show();
        } else {
          field.hide();
        }
      } else {
        this.children.fields.push(this.line(fields[i]));
      }
    }
    return true;
  }

  line(field: TBlockProps): LineMessage {
    return new LineMessage(field);
  }
}

const withMessages = connect((state: Indexed) => {
  const { currentChat: { messages: fields } } = state;
  return { fields };
});

export default withMessages(ListMessages);
