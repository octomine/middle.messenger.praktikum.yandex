import Block from "../../../../../../components/base";

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
