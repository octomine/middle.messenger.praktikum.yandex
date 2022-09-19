import Block, { TBlockProps } from '../../../../../../components/common/block';

import tmpl from './tmpl.hbs';

export default class LineMessage extends Block<TBlockProps> {
  constructor(props: TBlockProps) {
    super(props);
  }

  render() {
    console.log({ ...this.props });
    return this.compile(tmpl, this.props);
  }
}
