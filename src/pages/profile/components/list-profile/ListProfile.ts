import List, { ListProps } from '@components/list';
import Line, { LineProps } from './elements/line';

export default class ListProfile extends List {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: LineProps): Line {
    return new Line(field);
  }
}
