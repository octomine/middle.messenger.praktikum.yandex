// import '../../../../components/common/styles';

import Line, { LineProps } from './elements/line';
import List, { ListProps } from '../../../../components/list';

export default class ListProfile extends List {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: LineProps): Line {
    return new Line(field);
  }
}
