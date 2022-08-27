import Block from './index';
import { TBlockProps } from './types';
import tmpl from './tmpl.hbs'

export default class Box extends Block {
  constructor(props: TBlockProps) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
