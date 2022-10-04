import Block, { TBlockProps } from '../common/block';

import tmpl from './tmpl.hbs';

interface ButtonProps extends TBlockProps {
  title?: string;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
