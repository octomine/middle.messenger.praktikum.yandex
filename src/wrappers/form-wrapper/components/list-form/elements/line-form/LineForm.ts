import { Indexed } from '../../../../../../store';
import InputWrapped, { InputWrappedProps } from '../../../../../../components/input-wrapped';
import Input from '../../../../../../components/input/Input';

import tmpl from './tmpl.hbs';
import ErrorHolder from '../error-holder/ErrorHolder';

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
    this.children.error = new ErrorHolder({});
  }

  get title(): HTMLElement {
    return this._element.querySelector('.input__label');
  }

  onFocus() {
    this.title.classList.toggle('disguise', false);
    const { resetError } = this.props;
    if (resetError) {
      resetError(this.name);
    }
  }

  onBlur() {
    const { value } = this.children.input as Input;
    this.title.classList.toggle('disguise', !(value && value.length > 0));

    super.onBlur();
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    const { error: oldError } = oldProps;
    const { error, title, placeholder } = newProps;
    if (error !== oldError) {
      this.children.error.setProps({ error });
    }
    this.children.input.setProps({ title, placeholder });

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
