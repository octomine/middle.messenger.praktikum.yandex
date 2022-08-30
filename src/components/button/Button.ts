import Block from "../base/Block";
import "../common/styles";

import tmpl from "./tmpl.hbs";

interface ButtonProps {
  label: string;
}

export default class Button extends Block<ButtonProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
