import Block from "./Block";
import "../common/styles";

import { TButtonProps } from "../button/types";
import tmpl from '../button/tmpl.hbs';

export default class ButtonTest extends Block {
  props: TButtonProps

  constructor(props: TButtonProps) {
    super('div', props); // TODO: подумать, как сделать более по-другому
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
