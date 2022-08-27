import Block from "../../components/base/Block";

import tmpl from "./tmpl.hbs";

export default class FormWrapper extends Block {
  render() {
    return this.compile(tmpl, this.props);
  }
}
