import Block, { TBlockProps } from '@components/common/block';
import Button from '@components/button';
import ControllerChats from '@controllers/ControllerChats';
import ControllerMessenger from '@controllers/ControllerMessenger';
import Router from '../../router/Router';

import ListChats from './components/list-chats';
import ChatHOC, { Chat } from './components/chat';

import tmpl from './tmpl.hbs';

export default class PageMessenger extends Block<TBlockProps> {
  constructor(props: TBlockProps = {}) {
    super(props);
  }

  init() {
    ControllerChats.getChats({});

    this.children.profile = new Button({
      title: 'Профиль',
      modifiers: 'profile',
      events: {
        click: () => Router.go('/settings'),
      },
    });
    this.children.chats = new ListChats({});
    this.children.chat = new ChatHOC({
      events: {
        mousedown: this.hidePopover.bind(this),
      },
    });
  }

  get chat(): Chat {
    return this.children.chat as Chat;
  }

  hidePopover() {
    this.chat.hidePopovers();
  }

  hide() {
    ControllerMessenger.close();
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
