import Block from "../common/block";
import '../common/styles'

import tmpl from "./tmpl.hbs";

interface InputProps {
  value?: string,
  placeholder?: string,
  isPassword?: boolean,
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  get value(): string {
    return this._element.value;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
