import Block from "../base";
import "../common/styles";

import tmpl from "./tmpl.hbs";

interface ButtonArrowProps {

}

export default class ButtonArrow extends Block<ButtonArrowProps> {
  constructor(props: ButtonArrowProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
