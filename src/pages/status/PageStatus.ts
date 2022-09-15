import Block, { TBlockProps } from '../../components/common/block';
import Button from '../../components/button';
import Router from '../../router/Router';

import '../../components/label';
import '../../components/common/styles';

import tmpl from './tmpl.hbs';

interface StatusProps extends TBlockProps {
  title: string,
  subtitle: string,
}

export default class PageStatus extends Block<StatusProps> {
  constructor(props: StatusProps = { title: '404', subtitle: 'Не туда попали' }) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: 'Назад к чатам',
      modifiers: 'link',
      events: {
        click: () => Router.go('/messenger'),
      },
    });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
