import List, { ListProps } from '../../../../components/list';
import { Indexed } from '../../../../store';
import LineUser from '../line-user';

export default class ListUsers extends List {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: Indexed): LineUser {
    const line = new LineUser({
      ...field,
      events: {
        click: () => this.props.onUser(line.userId),
      },
    });
    return line;
  }
}
