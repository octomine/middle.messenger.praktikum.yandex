import Block from "../../components/base/Block";
import Button from "../../components/button";
import Input from "../../components/input";

import tmpl from "./tmpl.hbs";

interface FormProps {
  title: string,
  block: string,
  fields: object[],
  button: string,
  link: string,
  submit: () => void,
}

export default class FormWrapper extends Block<FormProps> {
  constructor(props: FormProps) {
    super(props);
  }

  init() {
    const { fields, button, link, submit } = this.props;
    this.children.fields = fields.map((field) => new Input(field));

    this.children.button = new Button({
      label: button,
      events: {
        click: () => submit()
      }
    });
    this.children.link = new Button({
      label: link,
      modifiers: "link",
    });
  }

  collect(): Record<string, string> {
    // TODO: сделать как-то более лучше 
    this.children.fields.forEach(({ name, value }) => console.log(`${name}: ${value}`));
  }

  render() {
    const { title: txt, block } = this.props;

    return this.compile(tmpl, { title: { txt }, block });
  }
}
