import Block, { TBlockProps } from '../../../../../../components/common/block';
import { Indexed } from '../../../../../../store';

import '../../../../../../components/label';

import tmpl from './tmpl.hbs';

export interface LineProps extends TBlockProps {
  name: string,
  title: string,
  value: string,
}

export default class Line extends Block<LineProps> {
  constructor(props: LineProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  update(newValue: Indexed) {
    this.setProps(newValue);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
