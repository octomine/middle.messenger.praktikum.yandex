import InputWrapped, { InputWrappedProps } from '../../../../../../components/input-wrapped';
import Input from '../../../../../../components/input/Input';

import '../../../../../../components/label';
import '../../../../../../components/common/styles';

import tmpl from './tmpl.hbs';

export default class LineForm extends InputWrapped {
  constructor(props: InputWrappedProps) {
    super(props);
  }

  init() {
    const { value, placeholder, isPassword } = this.props;
    this.children.input = new Input({
      value,
      placeholder,
      isPassword,
      block: 'form',
      events: {
        focus: () => this.onFocus(),
        blur: () => this.onBlur(),
      },
    });
  }

  get title(): HTMLElement {
    return this._element.querySelector('.input__label');
  }

  onFocus() {
    this.title.classList.toggle('disguise', false);
  }

  onBlur() {
    const { value } = this.children.input as Input;
    this.title.classList.toggle('disguise', !(value && value.length > 0));

    super.onBlur();
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
