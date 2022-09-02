import Block from "../../../../components/common/block";

import ChatInput from "./elements/chat-input/ChatInput";
import ChatHeader from "./elements/chat-header/ChatHeader";

import tmpl from './tmpl.hbs';
import ListMessages from "./elements/list-messages/ListMessages";
import Popover from "./elements/popover/Popover";

interface ChatProps {

}

export default class Chat extends Block<ChatProps> {
  needToHidePopover: boolean = false;

  constructor(props: ChatProps) {
    super(props);
  }

  init() {
    const popoverEents = {
      mouseover: () => this.needToHidePopover = false,
      mouseout: () => this.needToHidePopover = true,
    }

    this.children.popoverOptions = new Popover({
      modifiers: "options",
      styles: "hide",
      fields: [
        { type: 'add', label: 'Добавить пользователя', events: { click: () => console.log('it works!!1') } },
        { type: 'remove', label: 'Удалить пользователя' },
      ],
      events: popoverEents
    });
    this.children.popoverAttach = new Popover({
      modifiers: "attach",
      styles: "hide",
      fields: [
        { type: 'media', label: 'Фото или Видео' },
        { type: 'file', label: 'Файл' },
        { type: 'location', label: 'Удалить пользователя' },
      ],
      events: popoverEents
    });

    this.children.header = new ChatHeader({
      optionsClick: () => this.showPopover('Options')
    });
    this.children.messages = new ListMessages({
      fields: [
        {
          message: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.Хассельблад в итоге адаптировал SWC для космоса, но что- то пошло не так и на ракету они так никогда и не попали.Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро."
        },
        { message: "Прикольно ))", modifiers: "my" }
      ]
    });
    this.children.input = new ChatInput({
      attachClick: () => this.showPopover('Attach')
    });
  }

  showPopover(name: string): void {
    const popover = this.children[`popover${name}`];
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
          value.show(false);
        }
      });
    }
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
