import Block, { TBlockProps } from '../../components/common/block';
import Router from '../../router/Router';

import Button from '../../components/button';
import ListChats from './components/list-chats';
import ChatHOC, { Chat } from './components/chat';

import tmpl from './tmpl.hbs';

import ControllerChats from '../../controllers/ControllerChats';
import ControllerMessenger from '../../controllers/ControllerMessenger';

export default class PageMessenger extends Block<TBlockProps> {
  constructor(props: TBlockProps = {}) {
    super(props);
  }

  init() {
    ControllerChats.getChats({});

    this.children.profile = new Button({
      label: 'Профиль',
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
    super.hide();
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
