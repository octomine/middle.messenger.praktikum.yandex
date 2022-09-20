import List, { ListProps } from '../../../../../../components/list';
import LineMessage from '../line-message';
import { TBlockProps } from '../../../../../../components/common/block';
import { connect, Indexed } from '../../../../../../store';
import { isEqual } from '../../../../../../utils/isEqual';

class ListMessages extends List {
  constructor(props: ListProps) {
    super({ ...props, block: 'chat_sheet' });
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
