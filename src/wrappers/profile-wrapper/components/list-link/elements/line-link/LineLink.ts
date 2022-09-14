import Block, { TBlockProps } from '../../../../../../components/common/block';

import Button from '../../../../../../components/button';

import tmpl from './tmpl.hbs';

export interface LineLinkProps extends TBlockProps {
  label: string,
  modifiers: string,
}

export default class LineLink extends Block<LineLinkProps> {
  constructor(props: LineLinkProps) {
    super(props);
  }

  init() {
    const { modifiers: mods, click } = this.props;
    const modifiers = mods ? `${mods},link` : 'link';
    this.children.button = new Button({ ...this.props, modifiers, events: { click } });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
