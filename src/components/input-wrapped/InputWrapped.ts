import Block from '../common/block';
import Input from '../input';
import ControllerInput from '../../controllers/ControllerInput';
import { InputWrappedProps } from './types';

export default class InputWrapped extends Block<InputWrappedProps> {
  constructor(props: InputWrappedProps) {
    super(props);
  }

  init() {
    const { value, placeholder, isPassword } = this.props;
    this.children.input = new Input({
      value,
      placeholder,
      isPassword,
      events: {
        onFocus: () => this.onFocus(),
        blur: () => this.onBlur(),
      },
    });
  }

  componentDidMount() {
    this.onBlur();
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string {
    return (this.children.input as Input).value;
  }

  protected onFocus() {

  }

  protected onBlur() {
    const { value } = this.children.input as Input;
    this.setProps({ value });

    const { validated } = this.props;
    if (validated) {
      ControllerInput.validate({ ...this.props });
    } else {
      ControllerInput.resetError({ ...this.props });
    }
  }
}
