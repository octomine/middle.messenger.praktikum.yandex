import Block, { TBlockProps } from '../../../../components/common/block';

import ChatInput from './elements/chat-input/ChatInput';

import ChatHeader from './elements/chat-header/ChatHeader';

import tmpl from './tmpl.hbs';
import ListMessages from './elements/list-messages/ListMessages';
import Popover from './elements/popover/Popover';
import { connect, Indexed } from '../../../../store';
import { isEqual } from '../../../../utils/isEqual';
import ControllerChats from '../../../../controllers/ControllerChats';

class Chat extends Block<TBlockProps> {
  needToHidePopover: boolean = false;

  constructor(props: TBlockProps) {
    super(props);
  }

  init() {
    const popoverEents = {
      mouseover: () => { this.needToHidePopover = false; },
      mouseout: () => { this.needToHidePopover = true; },
    };

    this.children.popoverOptions = new Popover({
      modifiers: 'options',
      styles: 'hide',
      fields: [
        { type: 'add', label: 'Добавить пользователя' },
        { type: 'remove', label: 'Удалить пользователя' },
      ],
      events: popoverEents,
    });
    this.children.popoverAttach = new Popover({
      modifiers: 'attach',
      styles: 'hide',
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
          (value as Popover).show(false);
        }
      });
    }
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.header.setProps(newProps);
    }
    return true;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}

const withChat = connect((state: Indexed) => {
  const { currentChat: { avatar, title } } = state;
  return { avatar, title };
});

export default withChat(Chat);
