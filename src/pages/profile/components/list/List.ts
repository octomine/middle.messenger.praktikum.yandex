import Block from "../../../../components/base";
import "../../../../components/common/styles";

import tmpl from "./tmpl.hbs";
import Line from "./elements/line";

interface ListProps {
  fields: Record<string, string>[],
}

export default class List extends Block<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  init() {
    const { fields } = this.props;
    this.children.fields = fields.map((field) => this.line(field));
  }

  line(field): Block<unknown> {
    return new Line(field);
  }

  render() {
    return this.compile(tmpl, {});
  }
}
