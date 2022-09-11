import Block, { TBlockProps } from '../../../../components/common/block';

import '../../../../components/label';
import '../../../../components/common/styles';

import tmpl from './tmpl.hbs';
import Button from '../../../../components/button';

interface StatusProps extends TBlockProps {
  title: string,
  subtitle: string,
}

export default class Status extends Block<StatusProps> {
  constructor(props: StatusProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: 'Назад к чатам',
      modifiers: 'link',
      events: {
        click: () => console.log('back to chats clicked!!1'),
      },
    });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
