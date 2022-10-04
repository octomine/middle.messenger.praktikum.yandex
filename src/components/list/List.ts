import Block, { TBlockProps } from '../common/block';
import { Indexed } from '../../store/Store';

import tmpl from './tmpl.hbs';
import { isEqual } from '../../utils/is-equal';

export interface LineBase {
  name: string;
}

export interface ListProps extends TBlockProps {
  fields: Record<string, any>[],
}

export default class List extends Block<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }

  init() {
    const { fields } = this.props;
    this.children.fields = fields?.map((field: Record<string, any>) => this.line(field));
  }

  line(field: Indexed): Block<any> {
    return new Block(field);
  }

  getField(fieldName: string): Block<any> | undefined {
    const { fields } = this.children;
    // @ts-ignore
    return fields?.filter(({ name }) => name === fieldName)[0]; // name у всех уникальный
  }

  getFieldProps(fieldName: string): Record<string, any> | undefined {
    const { fields } = this.props;
    return fields?.filter(({ name }) => name === fieldName)[0]; // name у всех уникальный
  }

  componentDidUpdate({ fields: oldFields }: Indexed, { fields }: Indexed): boolean {
    if (isEqual(oldFields as Indexed, fields as Indexed)) {
      return false;
    }
    const l = Math.max(fields.length, this.children.fields!.length);

    for (let i: number = 0; i < l; i++) {
      const field = this.children.fields![i];
      if (field) {
        if (fields[i]) {
          field.setProps(fields[i]);
        } else {
          field.hide();
        }
      } else {
        this.children?.fields?.push(this.line(fields[i]));
      }
    }
    return true;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
