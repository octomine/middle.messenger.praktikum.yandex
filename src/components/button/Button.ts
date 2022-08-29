import Block from "../base/Block";
import "../common/styles";

import tmpl from "./tmpl.hbs";

export default class Button extends Block {
  constructor(props) {
    super(props);
  }
  
  render() {
    return this.compile(tmpl, this.props);
  }
}
