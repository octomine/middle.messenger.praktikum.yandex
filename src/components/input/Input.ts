import Block from "../base";

import "../label";
import tmpl from "./tmpl.hbs";

export default class Input extends Block {
  static ERRORS = {
    EMPTY: "Обязательное поле"
  }

  componentDidMount() {
    this.input.addEventListener('focus', () => this.label.classList.toggle('hide', false));
    this.input.addEventListener('blur',
      () => this.label.classList.toggle('hide', !(!!this.input.value)) // TODO: подумать, а то как-то диковато выглядит
    );
  }

  get input() {
    return this._element.querySelector('.input');
  }

  get label() {
    return this._element.querySelector('.input__label');
  }

  get error() {
    return this._element.querySelector('.label-error');
  }

  get value(): Record<string, string> {
    const { name } = this.props;
    const { value } = this.input;
    if (!value) { // TODO: ну и вообще валидация
      return { name, error: Input.ERRORS.EMPTY }
    }

    return { name, value };
  }

  componentDidUpdate(oldProps, newProps) {
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
