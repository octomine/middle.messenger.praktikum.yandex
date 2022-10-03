import InputWrapped, { InputWrappedProps } from '../../../../../../components/input-wrapped';
import Input from '../../../../../../components/input';

// import '../../../../../../components/label';

import tmpl from './tmpl.hbs';
import ErrorHolder from '../error-holder';

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

  get title(): HTMLElement | null | undefined {
    return this.element?.querySelector('.input__label');
  }

  get input(): Input {
    return this.children.input as Input;
  }

  get error(): ErrorHolder {
    return this.children.error as ErrorHolder;
  }

  onFocus() {
    this.title?.classList.toggle('disguise', false);
  }

  onBlur() {
    const { value } = this.children.input as Input;
    this.title?.classList.toggle('disguise', !(value && value.length > 0));

    super.onBlur();
  }

  componentDidUpdate(oldProps: InputWrappedProps, newProps: InputWrappedProps): boolean {
    const { error: oldError } = oldProps;
    const { error, title, placeholder } = newProps;
    if (error !== oldError) {
      this.error.setProps({ error });
    }
    this.input.setProps({ title, placeholder });

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
