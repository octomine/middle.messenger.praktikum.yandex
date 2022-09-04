import Block, { TBlockProps } from '../common/block';

import '../common/styles';

import tmpl from './tmpl.hbs';

export default class Avatar extends Block<TBlockProps> {
  constructor(props: TBlockProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
