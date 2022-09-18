import Block, { TBlockProps } from '../../components/common/block';
import Router from '../../router/Router';

import Button from '../../components/button';
import ListChats from './components/list-chats';
import Chat from './components/chat';

import tmpl from './tmpl.hbs';

import ControllerChats from '../../controllers/ControllerChats';

export default class PageMessenger extends Block<TBlockProps> {
  constructor(props: TBlockProps = {}) {
    super(props);
  }

  init() {
    ControllerChats.getChats({});

    this.children.button = new Button({
      label: 'Профиль',
      modifiers: 'profile',
      events: {
        click: () => Router.go('/settings'),
      },
    });
    this.children.chats = new ListChats({});
    this.children.chat = new Chat({
      events: {
        mousedown: this.hidePopover.bind(this),
      },
    });
  }

  hidePopover() {
    this.children.chat.hidePopovers();
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
