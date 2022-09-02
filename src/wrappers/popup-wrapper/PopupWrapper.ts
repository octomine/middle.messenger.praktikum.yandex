import Block from "../../components/common/block";
import Button from "../../components/button";
import "../../components/label"

import tmpl from "./tmpl.hbs";

interface PopupProps {
  button: string,
}

export default class PopupWrapper extends Block<PopupProps> {
  constructor(props: PopupProps) {
    super(props);
  }

  init() {
    const { button: label } = this.props;
    this.children.button = new Button({ label });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
