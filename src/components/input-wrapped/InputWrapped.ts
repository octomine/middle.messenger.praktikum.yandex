import Block, { TBlockProps } from '../common/block';
import Input from '../input';

export interface InputWrappedProps extends TBlockProps {
  name: string,
  title: string,
  value?: string,
  placeholder?: string,
  isRequired?: boolean,
  isPassword?: boolean,
  isEqual?: string,
  validated?: boolean,
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

  get isRequired(): boolean {
    return this.props.isRequired;
  }

  get isEqual(): string {
    return this.props.isEqual;
  }

  protected onFocus() {

  }

  protected onBlur() {
    const { value } = this.children.input as Input;
    this.setProps({ value });

    const { validated } = this.props;
    if (value && validated) {
      console.log('VALIDATE IT!!1');
    }
  }
}
