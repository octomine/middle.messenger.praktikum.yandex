import Block from "../../../../../../components/common/block";
import Input from "../../../../../../components/input";

import tmpl from "./tmpl.hbs";

interface LineInputProps {
  name: string,
  key: string,
  value: string,
}

export default class LineInput extends Block<LineInputProps> {
  constructor(props: LineInputProps) {
    super(props);
  }

  init() {
    const { value, title: placeholder, isPassword } = this.props;
    this.children.input = new Input({
      block: "line",
      modifiers: "profile",
      value,
      placeholder,
      isPassword,
    });
  }

  get input() {
    return this.element.querySelector('.line__input');
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string {
    return this.input.value;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
