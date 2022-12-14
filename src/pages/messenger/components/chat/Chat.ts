import Block, { TBlockProps } from '../../../../components/common/block';

import { connect, Indexed } from '../../../../store';
import { isEqual } from '../../../../utils/is-equal';
import ControllerPopup from '../../../../controllers/ControllerPopup';

import ChatInput from './elements/chat-input';
import ChatHeader from './elements/chat-header';
import ListMessages from './elements/list-messages';
import Popover from './elements/popover/Popover';

import tmpl from './tmpl.hbs';
import ControllerChats from '../../../../controllers/ControllerChats';

export class Chat extends Block<TBlockProps> {
  private needToHidePopover: boolean = true;

  constructor(props: TBlockProps) {
    super(props);
    this.hidePopovers();
  }

  init() {
    const popoverEents = {
      mouseover: () => { this.needToHidePopover = false; },
      mouseout: () => { this.needToHidePopover = true; },
    };

    this.children.popoverOptions = new Popover({
      modifiers: 'options',
      fields: [
        {
          type: 'add_user',
          label: 'Добавить пользователя',
          events: {
            click: () => {
              this.performPopoverClcik();
              ControllerPopup.addUser();
            },
          },
        },
        {
          type: 'remove_user',
          label: 'Удалить пользователя',
          events: {
            click: () => {
              this.performPopoverClcik();
              ControllerPopup.removeUser();
            },
          },
        },
        {
          type: 'remove_chat',
          label: 'Удалить чат',
          events: {
            click: () => {
              this.performPopoverClcik();
              ControllerChats.deleteChat()
                .then(() => ControllerChats.getChats({}));
            },
          },
        },
      ],
      events: popoverEents,
    });
    this.children.popoverAttach = new Popover({
      modifiers: 'attach',
      fields: [
        { type: 'media', label: 'Фото или Видео' },
        { type: 'file', label: 'Файл' },
        { type: 'location', label: 'Локация' },
      ],
      events: popoverEents,
    });
    this.children.header = new ChatHeader({
      optionsClick: () => this.showPopover('Options'),
    });
    this.children.messages = new ListMessages({});
    this.children.input = new ChatInput({
      attachClick: () => this.showPopover('Attach'),
    });
  }

  get header(): ChatHeader {
    return this.children.header as ChatHeader;
  }

  showPopover(name: string): void {
    const popover = this.children[`popover${name}`] as Popover;
    if (popover) {
      popover.show();
      this.needToHidePopover = true;
    }
  }

  hidePopovers(): void {
    if (this.needToHidePopover) {
      this.needToHidePopover = false;
      Object.entries(this.children).forEach(([key, value]) => {
        if (key.includes('popover')) {
          (value as Popover).hide();
        }
      });
    }
  }

  performPopoverClcik() {
    this.needToHidePopover = true;
    this.hidePopovers();
  }

  componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.header.setProps(newProps);
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

const withChat = connect((state: Indexed) => {
  const { currentChat: { id, img, title } } = state;
  return { id, img, title };
});

export default withChat(Chat as typeof Block);
