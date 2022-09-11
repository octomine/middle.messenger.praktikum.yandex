import Block, { TBlockProps } from '../common/block';
import { ValidType as ValidationType } from '../../utils/validators';
import Input from '../input/Input';

export interface InputWrappedProps extends TBlockProps {
  name: string,
  title: string,
  value?: string,
  placeholder?: string,
  isRequired?: boolean,
  isPassword?: boolean,
  isEqual?: string,
  validator?: (value: string) => ValidationType,
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
    // TODO: хорошо бы тут скрывать ошибку, но что-то идёт не так
  }

  protected onBlur() {
    const { value } = this.children.input as Input;

    if (value) {
      this.validate(value);
    }
  }

  validate(value: string): boolean {
    const { validator } = this.props;
    if (validator) {
      const { error } = validator(value);
      this.setProps({ error });
      if (error) {
        return false;
      }
    }
    return true;
  }
}
