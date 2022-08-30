import Block from "../base";

import "../label";
import tmpl from "./tmpl.hbs";

interface InputProps {
  name: string,
  title: string,
  value?: string,
  isEqual?: string,
  isPassword?: boolean,
}

export default class Input extends Block<InputProps> {
  static ERRORS = {
    REQUIRED: "Обязательное поле",
    NOT_EQUAL: "Пароли не совпадают",
  }

  constructor(props: InputProps) {
    super(props);
  }

  componentDidMount() {
    // TODO: убрать отсюда, приюумать как сделать нормально!!1
    this.input.addEventListener('focus', () => this.label.classList.toggle('hide', false));
    this.input.addEventListener('blur',
      () => this.label.classList.toggle('hide', !(!!this.input.value)) // TODO: подумать, а то как-то диковато выглядит
    );
  }

  get input() {
    return this.element.querySelector('.input');
  }

  get label() {
    return this.element.querySelector('.input__label');
  }

  get error() {
    return this.element.querySelector('.label-error');
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string {
    const { value } = this.input;
    return value;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
