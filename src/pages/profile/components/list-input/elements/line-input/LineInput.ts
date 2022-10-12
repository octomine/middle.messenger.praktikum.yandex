import InputWrapped, { InputWrappedProps } from '@components/input-wrapped';
import Input from '@components/input';

import { Indexed } from '@store';
import tmpl from './tmpl.hbs';

export default class LineInput extends InputWrapped {
  constructor(props: InputWrappedProps) {
    super(props);
  }

  init() {
    const { value, title: placeholder, isPassword } = this.props;
    this.children.input = new Input({
      block: 'line',
      modifiers: 'profile',
      value,
      placeholder,
      isPassword,
    });
  }

  get input(): Input {
    return this.children.input as Input;
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string {
    return this.input?.value;
  }

  update(newLine: Indexed) {
    this.setProps(newLine);
    const { value } = newLine;
    this.input.setProps({ value });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
