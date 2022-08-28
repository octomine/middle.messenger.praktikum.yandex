import Block from '../base';
import { TBlockProps } from '../base/types';

import tmpl from "./tmpl.hbs";

export default class Form extends Block {
  _getChildrenAndProps(childrenAndProps: TBlockProps) {
    const { props, children } = super._getChildrenAndProps(childrenAndProps);
    props.fields.map((item: Block, index: Number) => children[index.toString()] = item);

    return { props, children };
  }

  collect(): Record<string, string> {
    return this.props.fields.map(({ value }) => value);
  }

  showErrors(errors) {
    this.props.fields.map((field: Block) => {
      field.setProps({ error: errors[field.props.name] });
    });
  }

  compile(tmpl, props) {
    const fields = props.fields.map((field: Block) => `<div data-id="${field._id}"></div>`);

    return super.compile(tmpl, { ...props, fields });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
