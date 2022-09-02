import Block from "../../../../../../components/common/block"

import tmpl from './tmpl.hbs';

interface LinePopoverProps {

}

export default class LinePopover extends Block<LinePopoverProps> {
  constructor(props: LinePopoverProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
