import Block from "../../components/base/Block";
import Button from "../../components/button";
import Input from "../../components/input";

import tmpl from "./tmpl.hbs";

export default class FormWrapper extends Block {
  constructor(props) {
    super(props);
  }

  init() {
    const { fields, button, link, submit, click } = this.props;

    fields.map((field: object) => this.children[`field_${field.name}`] = new Input(field));

    this.children.button = new Button({
      label: button,
      events: {
        click: () => submit()
      }
    });
    this.children.link = new Button({
      label: link,
      modifiers: "link",
      events: {
        click: () => click()
      }
    });
  }

  collect() {
    const { fields } = this.props;
    fields.map(({ name }) => {
      console.log(this.children[`field_${name}`].value);
    })
  }

  render() {
    const { title: txt, block } = this.props;
    const fields = this.props.fields.map(
      ({ name }) => `<div data-id="${this.children[`field_${name}`]._id}"></div>`
    );

    return this.compile(tmpl, { title: { txt }, block, fields });
  }
}
