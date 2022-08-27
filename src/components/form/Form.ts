import Block from '../base';
import { TBlockProps } from '../base/types';

import tmpl from "./tmpl.hbs";

export default class Form extends Block {
  collect(): Record<string, string> {
    return this.props.fields.reduce((res, field) => ({ ...res, ...field.value }), {});
  }

  _getChildrenAndProps(childrenAndProps: TBlockProps) {
    const { props, children } = super._getChildrenAndProps(childrenAndProps);
    props.fields.map((item, index) => children[index] = item);

    return { props, children };
  }

  compile(tmpl, props) {
    const fields = props.fields.map((field: Block) => `<div data-id="${field._id}"></div>`);

    return super.compile(tmpl, { ...props, fields });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
