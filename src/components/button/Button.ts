import Block from "../common/block";
import "../common/styles";

import tmpl from "./tmpl.hbs";

interface ButtonProps {
  label: string;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
