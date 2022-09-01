import Block from "../../../../../../components/base";
import Input from "../../../../../../components/input/Input";
import '../../../../../../components/label'
import '../../../../../../components/common/styles'

import tmpl from './tmpl.hbs';

interface LineFormProps {
  name: string,
  title: string,
  value?: string,
  placeholder?: string,
  isPassword?: boolean,
}

export default class LineForm extends Block<LineFormProps> {
  constructor(props: LineFormProps) {
    super(props)
  }

  init() {
    const { value, placeholder, isPassword } = this.props;
    this.children.input = new Input({
      value, placeholder, isPassword,
      block: "form",
      events: {
        focus: () => this.onFocus(),
        blur: () => this.onBlur()
      }
    });
  }

  componentDidMount() {
    this.onBlur();
  }

  get title(): HTMLElement {
    return this._element.querySelector('.input__label');
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string {
    return this.children.input.value;
  }

  onFocus() {
    this.title.classList.toggle('hide', false);
  }

  onBlur() {
    const { value } = this.children.input;
    this.title.classList.toggle('hide', !(value && value.length > 0));
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}