import Block from "../../components/base/Block";
import Button from "../../components/button";
import Input from "../../components/input";

import tmpl from "./tmpl.hbs";

export default class FormWrapper extends Block {
  constructor(props) {
    super(props);
  }

  init() {
    const { fields, button, link, submit } = this.props;

    fields.map((field: object) => this.children[field.name] = new Input(field));

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
    const { fields } = this.props;
    const errors = fields.map(({ name }) => {
      this.children[name].setProps({ error: null, value: this.children[name].value.value });
      return this.children[name].value
    }).filter(({ error }) => error);
    if (errors.length > 0) {
      errors.map(({ name, error }) => this.children[name].setProps({ error }));
      return {};
    }
    return fields.reduce((res: object, { name }) => {
      const { name: propName, value } = this.children[name].value
      return { ...res, [propName]: value };
    }, {});
  }

  render() {
    const { title: txt, block } = this.props;
    const fields = this.props.fields.map(
      ({ name }) => `<div data-id="${this.children[name]._id}"></div>`
    );

    return this.compile(tmpl, { title: { txt }, block, fields });
  }
}
