import { SocketIO, SocketEvents } from '../services/socket-io';
import Store, { Indexed } from '../store';

export type TMessage = {
  type: string;
  user_id: string;
  content: Indexed;
  time: string;
};

class ControllerMessenger {
  private socket?: SocketIO;

  openChat(token: string) {
    this.socket = new SocketIO(`/${Store.getUserId()}/${Store.getChatId()}/${token}`);
    this.socket.on(SocketEvents.Recive, this.recieveMessage.bind(this));
  }

  close() {
    this.socket?.off(SocketEvents.Recive, this.recieveMessage);
    this.socket?.close();
  }

  sendMessage(msg: string) {
    this.socket?.send(msg, 'message');
  }

  recieveMessage(msg: TMessage | TMessage[]) {
    if (Array.isArray(msg)) {
      const messages = msg.map(({ user_id, content, time }: TMessage) => {
        const modifiers = user_id === Store.getUserId() ? 'my' : '';
        return { content, time, modifiers };
      }).reverse();
      Store.set('currentChat.messages', messages);
    } else {
      const { type } = msg;
      switch (type) {
        case 'message':
          this.socket?.getMessages();
          break;
        case 'user connected':
        case 'pong':
          break;
        default:
      }
    }
  }
}

export default new ControllerMessenger();
