import Block, { TBlockProps } from '../../../../../../components/common/block';

import '../../../../../../components/label';

import tmpl from './tmpl.hbs';

export interface LineProps extends TBlockProps {
  name: string,
  key: string,
  value: string,
}

export default class Line extends Block<LineProps> {
  constructor(props: LineProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
