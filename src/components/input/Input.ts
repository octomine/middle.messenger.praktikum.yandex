import Block, { TBlockProps } from '../common/block';
import '../common/styles'

import tmpl from './tmpl.hbs';

interface InputProps extends TBlockProps {
  value?: string,
  placeholder?: string,
  isPassword?: boolean,
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  get value(): string {
    return (this._element as HTMLInputElement).value;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
