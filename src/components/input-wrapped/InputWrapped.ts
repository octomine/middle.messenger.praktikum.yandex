import Block, { TBlockProps } from '../common/block';
import Input from '../input';
import ControllerInput from '../../controllers/ControllerInput';

export interface InputWrappedProps extends TBlockProps {
  name: string;
  title: string;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  isPassword?: boolean;
  isEqual?: string;
  validated?: boolean;
  errorSpace?: string;
}

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
