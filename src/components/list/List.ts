import Block from "../base";
import "../common/styles";

import tmpl from "./tmpl.hbs";

export interface ListProps {
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
    return null;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
