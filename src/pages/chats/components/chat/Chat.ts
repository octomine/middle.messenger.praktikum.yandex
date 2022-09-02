import Block from "../../../../components/common/block";

import ChatInput from "./elements/chat-input/ChatInput";
import ChatHeader from "./elements/chat-header/ChatHeader";

import tmpl from './tmpl.hbs';
import ListMessages from "./elements/list-messages/ListMessages";

interface ChatProps {

}

export default class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  init() {
    this.children.header = new ChatHeader({});
    this.children.messages = new ListMessages({
      fields: [
        {
          message: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.Хассельблад в итоге адаптировал SWC для космоса, но что- то пошло не так и на ракету они так никогда и не попали.Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро."
        },
        { message: "Прикольно ))", modifiers: "my" }
      ]
    });
    this.children.input = new ChatInput({});
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
