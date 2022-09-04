import Block, { TBlockProps } from '../common/block';
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

  render() {
    return this.compile(tmpl, this.props);
  }
}
