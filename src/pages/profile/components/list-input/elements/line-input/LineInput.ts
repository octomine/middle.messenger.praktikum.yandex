import InputWrapped, { InputWrappedProps } from '../../../../../../components/input-wrapped';
import Input from '../../../../../../components/input';

import tmpl from './tmpl.hbs';
import { Indexed } from '../../../../../../store';

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

  get input() {
    return this.element?.querySelector('.line__input') as HTMLInputElement;
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
    this.children.input.setProps({ value });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
