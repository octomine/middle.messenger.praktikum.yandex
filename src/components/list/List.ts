import Block, { TBlockProps } from '../common/block';
import { Indexed } from '../../store/Store';
import '../common/styles';

import tmpl from './tmpl.hbs';

export interface ListProps extends TBlockProps {
  fields: Record<string, string | boolean>[],
}

export default class List extends Block<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  init() {
    const { fields } = this.props;
    this.children.fields = fields.map((field: unknown) => this.line(field));
  }

  line(field: unknown): Block<unknown> | null {
    return null;
  }

  getField(fieldName: string): Block<unknown> {
    const { fields } = this.children;
    return fields.filter(({ name }) => name === fieldName)[0]; // name у всех уникальный
  }

  update(fields: Indexed) {
    Object.keys(fields).forEach((name) => {
      const field = this.getField(name);
      if (field) {
        field.setProps(fields[name] as Indexed);
      }
    });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
