import Block from "./Block";
import { TBlockProps } from "./types";

import "../common/styles";
import tmpl from '../button/tmpl.hbs';

export default class ButtonTest extends Block {
  props: TBlockProps & {
    label: string,
    modifiers: string,
  }

  constructor(props: object) {
    super('div', props); // TODO: подумать, как сделать более по-другому
  }

  render() {
    return tmpl(this.props);
  }
}
