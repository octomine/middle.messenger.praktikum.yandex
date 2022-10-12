import Block, { TBlockProps } from '@components/common/block';

import tmpl from './tmpl.hbs';

export interface AvatarProps extends TBlockProps {
  img?: unknown;
}

export default class Avatar extends Block<TBlockProps> {
  constructor(props: AvatarProps) {
    super({ ...props, modifiers: 'l' });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
