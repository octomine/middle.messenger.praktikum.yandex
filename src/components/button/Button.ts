import Block, { TBlockProps } from '../common/block';

import '../common/styles';

import tmpl from './tmpl.hbs';

interface ButtonProps extends TBlockProps {
  label?: string;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
