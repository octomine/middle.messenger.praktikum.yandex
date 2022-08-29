import Block from "../base";
import { TBlockProps } from "../base/types";
import "../label";
import "../common/styles";

import tmpl from "./tmpl.hbs";

interface ListProps extends TBlockProps {
  type: object,
  fields: [],
}

export default class List extends Block<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  init() {
    const { blockType, fields } = this.props;

    fields.map((field) => this.children[field.name] = new blockType(field))
  }

  render() {
    const fields = this.props.fields.map(
      ({ name }) => `<div data-id="${this.children[name].id}"></div>`
    )
    return this.compile(tmpl, { ...this.props, fields });
  }
}
