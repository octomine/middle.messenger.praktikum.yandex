import Block from "../base";

import "../label";
import tmpl from "./tmpl.hbs";

export default class Input extends Block {
  componentDidMount() {
    this.element.addEventListener('change', (evt: InputEvent) => this.setProps({ value: evt.target.value }));

    this.input.addEventListener('focus', () => this.label.classList.toggle('hide', false));
    this.input.addEventListener('blur',
      () => this.label.classList.toggle('hide', this.noValue)
    );
  }

  get noValue(): boolean {
    return !this.props.value || this.props.value === '';
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

  get value(): Record<string, string> {
    const { name, value } = this.props;

    return { [name]: value };
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
