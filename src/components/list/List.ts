import Block, { TBlockProps } from '../common/block';
import { Indexed } from '../../store/Store';
import '../common/styles';

import tmpl from './tmpl.hbs';
import { isEqual } from '../../utils/isEqual';

export interface ListProps extends TBlockProps {
  fields?: Record<string, string | boolean>[],
}

export default class List extends Block<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  init() {
    const { fields } = this.props;
    this.children.fields = fields.map((field: unknown) => this.line(field));
  }

  line(field: Indexed): Block<unknown> | null {
    return null;
  }

  getField(fieldName: string): Block<unknown> {
    const { fields } = this.children;
    return fields.filter(({ name }) => name === fieldName)[0]; // name у всех уникальный
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    const { fields: oldFields } = oldProps;
    const { fields: newFields } = newProps;

    if (!isEqual(oldFields as Indexed, newFields as Indexed)) {
      newFields.forEach<Indexed>((newField: Indexed) => {
        const { name } = newField;
        const field = this.getField(name);
        if (field) {
          field.setProps(newField);
        }
      });
    }
    return true;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
