import Block, { TBlockProps } from "../../../../../../components/common/block"

import tmpl from './tmpl.hbs';

export default class LinePopover extends Block<TBlockProps> {
  constructor(props: TBlockProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
