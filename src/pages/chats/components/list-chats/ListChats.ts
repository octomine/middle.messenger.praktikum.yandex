import Block from '../../../../components/base';
import List, { ListProps } from '../../../../components/list';
import LineChat from './elements/line-chat/LineChat';

export default class ListChats extends List {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: object): Block<unknown> {
    return new LineChat(field);
  }
}
