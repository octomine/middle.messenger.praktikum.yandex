import Block from "../../components/common/block";
import Button from "../../components/button";
import '../../components/label';

import ListForm from './components/list-form';

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
    const { fields, block, button, link, submit } = this.props;

    this.children.list = new ListForm({ fields, block });
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

  collect() {
    this.children.list.collect();
  }

  render() {
    const { title: txt, block } = this.props;

    return this.compile(tmpl, { title: { txt }, block });
  }
}
