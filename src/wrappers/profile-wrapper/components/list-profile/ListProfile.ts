import Block from "../../../../components/base";
import '../../../../components/common/styles'

import Line from "./elements/line";
import List, { ListProps } from "../../../../components/list";

export default class ListProfile extends List {
  constructor(props: ListProps) {
    super(props);
  }

  line(field): Block<unknown> {
    return new Line(field);
  }
}
