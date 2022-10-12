import List, { ListProps } from '@components/list';
import LineUser from '../line-user';
import { LineUserProps } from '../line-user/LineUser';

export interface ListUsersProps extends ListProps {
  onUser: (id: string) => void;
}

export default class ListUsers extends List {
  constructor(props: ListUsersProps) {
    super(props);
  }

  line(field: LineUserProps): LineUser {
    const { onUser } = this.props as ListUsersProps;
    const line: LineUser = new LineUser({
      ...field,
      events: {
        click: () => onUser(line.userId),
      },
    });
    return line;
  }
}
