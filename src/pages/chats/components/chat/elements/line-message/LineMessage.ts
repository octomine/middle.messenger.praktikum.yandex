import Block from "../../../../../../components/common/block";

import tmpl from './tmpl.hbs';

interface LineMessageProps {

}

export default class LineMessage extends Block<LineMessageProps> {
  constructor(props: LineMessageProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}